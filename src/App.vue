<script setup>
import { useGameStore } from './stores/gameStore'
import TrackPlayer from './components/TrackPlayer.vue'
import GameResults from './components/GameResults.vue'
import Preloader from './components/Preloader.vue'
import PlayerControls from './components/PlayerControls.vue'

const gameStore = useGameStore()
</script>

<template>

    <h1 class="app__title">KiTTY-QUIZZ</h1>
    
    <div v-if="!gameStore.gameStarted && !gameStore.showResults" class="app__start">
      <button class="button button--primary" @click="gameStore.startNewGame">
        Начать игру
      </button>
    </div>

    <div v-else-if="gameStore.gameStarted" class="app__game">
      <Preloader v-if="gameStore.isLoading" />
      
      <template v-else>
        <div v-if="gameStore.showAnswer" class="app__track-info">
          <TrackPlayer />
        </div>

        <div class="app__player-controls">
          <PlayerControls 
            :is-playing="gameStore.isPlaying" 
            @toggle-play="gameStore.togglePlay" 
          />
        </div>

        <div class="app__controls">
          <button 
            v-if="!gameStore.showAnswer" 
            class="button button--secondary"
            @click="gameStore.handleShowAnswer"
          >
            Показать ответ
          </button>

          <div v-if="gameStore.showAnswer" class="app__answer-controls">
            <button class="button button--success" @click="gameStore.handleGuessed">
              Угадал
            </button>
            <button class="button button--danger" @click="gameStore.handleNotGuessed">
              Не угадал
            </button>
          </div>

          <button 
            v-if="!gameStore.shouldFinishGame" 
            class="button button--primary" 
            @click="gameStore.finishGame"
          >
            Завершить игру
          </button>
        </div>
      </template>
    </div>

    <GameResults v-if="gameStore.showResults" />

</template>

<style lang="scss">
@import './styles/variables.scss';
@import './styles/global.scss';

.app {
  margin: 0 auto;
  padding: $spacing-xl;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__title {
    text-align: center;
    color: $color-primary;
    margin-bottom: $spacing-xl;
    font-size: $font-size-h1;
    text-shadow: 0 0 10px rgba($color-primary, 0.3);
  }

  &__start {
    display: flex;
    justify-content: center;
    margin-top: $spacing-xl;
  }

  &__game {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    max-width: 768px;
  }

  &__track-info {
    background-color: rgba($color-secondary, 0.1);
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    margin-top: $spacing-xl;
    animation: fadeIn 0.3s ease;
  }

  &__player-controls {
    display: flex;
    justify-content: center;
    margin: $spacing-xl 0;
  }

  &__controls {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    align-items: center;
  }

  &__answer-controls {
    display: flex;
    gap: $spacing-md;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
