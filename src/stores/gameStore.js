import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { searchTracks } from '../services/deezerApi'

const MAX_TRACKS = 20

export const useGameStore = defineStore('game', () => {
  const currentTrack = ref(null)
  const showAnswer = ref(false)
  const showResults = ref(false)
  const gameStarted = ref(false)
  const guessedTracks = ref([])
  const unguessedTracks = ref([])
  const isLoading = ref(false)
  const isPlaying = ref(false)
  const audio = ref(null)
  let timer = null

  const totalTracks = computed(() => guessedTracks.value.length + unguessedTracks.value.length)
  const correctAnswers = computed(() => guessedTracks.value.length)
  const percentage = computed(() => {
    if (totalTracks.value === 0) return 0
    return Math.round((correctAnswers.value / totalTracks.value) * 100)
  })

  const shouldFinishGame = computed(() => totalTracks.value >= MAX_TRACKS)

  const cleanupAudio = () => {
    if (audio.value) {
      audio.value.pause()
      audio.value.src = ''
      audio.value = null
    }
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isPlaying.value = false
  }

  const startNewGame = async () => {
    cleanupAudio()
    gameStarted.value = true
    showAnswer.value = false
    showResults.value = false
    guessedTracks.value = []
    unguessedTracks.value = []
    await loadNewTrack()
  }

  const loadNewTrack = async () => {
    try {
      isLoading.value = true
      currentTrack.value = null
      cleanupAudio()
      
      const track = await searchTracks()
      currentTrack.value = track
      showAnswer.value = false
      
      audio.value = new Audio(track.preview)
      audio.value.play().catch(console.error)
      isPlaying.value = true
      startTimer()
    } catch (error) {
      console.error('Ошибка при загрузке трека:', error)
    } finally {
      isLoading.value = false
    }
  }

  const togglePlay = () => {
    if (!audio.value) return

    if (isPlaying.value) {
      audio.value.pause()
      if (timer) clearTimeout(timer)
    } else {
      audio.value.play().catch(console.error)
      startTimer()
    }
    isPlaying.value = !isPlaying.value
  }

  const startTimer = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (audio.value) {
        audio.value.pause()
      }
      isPlaying.value = false
      handleShowAnswer()
    }, 15000)
  }

  const handleShowAnswer = () => {
    showAnswer.value = true
  }

  const handleGuessed = async () => {
    if (currentTrack.value) {
      guessedTracks.value.push(currentTrack.value)
    }
    showAnswer.value = false
    
    if (shouldFinishGame.value) {
      finishGame()
    } else {
      await loadNewTrack()
    }
  }

  const handleNotGuessed = async () => {
    if (currentTrack.value) {
      unguessedTracks.value.push(currentTrack.value)
    }
    showAnswer.value = false
    
    if (shouldFinishGame.value) {
      finishGame()
    } else {
      await loadNewTrack()
    }
  }

  const finishGame = () => {
    cleanupAudio()
    gameStarted.value = false
    showResults.value = true
  }

  return {
    currentTrack,
    showAnswer,
    showResults,
    gameStarted,
    guessedTracks,
    unguessedTracks,
    isLoading,
    isPlaying,
    totalTracks,
    correctAnswers,
    percentage,
    shouldFinishGame,
    startNewGame,
    loadNewTrack,
    handleShowAnswer,
    handleGuessed,
    handleNotGuessed,
    finishGame,
    togglePlay
  }
}) 