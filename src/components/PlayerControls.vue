<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

defineProps({
  isPlaying: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle-play'])

const handleTogglePlay = () => {
  emit('toggle-play')
}
</script>

<template>
  <div class="player-controls">
    <button class="player-button player-button--play" @click="handleTogglePlay">
      <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </button>
  </div>
</template>

<style lang="scss">
@import '../styles/variables.scss';

.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

.player-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background-color: $color-primary;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: darken($color-primary, 10%);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 576px) {
    width: 70px;
    height: 70px;

    svg {
      width: 36px;
      height: 36px;
    }
  }
}
</style> 