import artistsData from '../data/artists.json'

const API_URL = 'https://api.deezer.com'

const jsonp = (url) => {
  return new Promise((resolve, reject) => {
    const callbackName = 'jsonp_' + Math.round(Math.random() * 1000000)
    window[callbackName] = (data) => {
      delete window[callbackName]
      document.head.removeChild(script)
      resolve(data)
    }

    const script = document.createElement('script')
    script.src = `${url}&output=jsonp&callback=${callbackName}`
    script.onerror = (error) => {
      delete window[callbackName]
      document.head.removeChild(script)
      reject(new Error('JSONP request failed'))
    }
    document.head.appendChild(script)
  })
}

async function searchArtist(query) {
  try {
    const data = await jsonp(`${API_URL}/search/artist?q=${encodeURIComponent(query)}`)
    return data.data?.[0] || null
  } catch (error) {
    console.error('Error searching artist:', error)
    return null
  }
}

async function getArtistTopTracks(artistId) {
  try {
    const data = await jsonp(`${API_URL}/artist/${artistId}/top?limit=50`)
    return data.data || []
  } catch (error) {
    console.error('Error getting artist top tracks:', error)
    return []
  }
}

async function getRandomTrack(artistName) {
  try {
    const artist = await searchArtist(artistName)
    if (!artist) {
      console.error('Artist not found:', artistName)
      return null
    }

    const tracks = await getArtistTopTracks(artist.id)
    if (!tracks.length) {
      console.error('No tracks found for artist:', artistName)
      return null
    }

    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
    
    return {
      title: randomTrack.title,
      artist: artist.name,
      preview: randomTrack.preview,
      cover: randomTrack.album.cover_medium || randomTrack.album.cover
    }
  } catch (error) {
    console.error('Error getting random track:', error)
    return null
  }
}

let usedArtists = new Set()

function getRandomArtist(artists) {
  if (usedArtists.size === artists.length) {
    usedArtists.clear() // Сбрасываем список использованных артистов, если все уже были использованы
  }

  let randomArtist
  do {
    randomArtist = artists[Math.floor(Math.random() * artists.length)]
  } while (usedArtists.has(randomArtist))

  usedArtists.add(randomArtist)
  return randomArtist
}

export async function searchTracks() {
  try {
    const { artists } = artistsData
    let attempts = 0
    const maxAttempts = 5

    while (attempts < maxAttempts) {
      const randomArtist = getRandomArtist(artists)
      console.log('Trying artist:', randomArtist)
      
      const track = await getRandomTrack(randomArtist)
      if (track) {
        return track
      }

      attempts++
    }

    throw new Error('Failed to get track after multiple attempts')
  } catch (error) {
    console.error('Error in searchTracks:', error)
    throw error
  }
} 