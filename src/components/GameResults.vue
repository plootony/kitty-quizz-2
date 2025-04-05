<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
</script>

<template>
  <div class="game-results">
    <h2 class="game-results__title">Результаты игры</h2>
    
    <div class="game-results__stats">
      <div class="game-results__stat">
        <span class="game-results__label">Всего треков:</span>
        <span class="game-results__value">{{ gameStore.totalTracks }}</span>
      </div>
      <div class="game-results__stat">
        <span class="game-results__label">Правильных ответов:</span>
        <span class="game-results__value">{{ gameStore.correctAnswers }}</span>
      </div>
      <div class="game-results__stat">
        <span class="game-results__label">Процент правильных:</span>
        <span class="game-results__value">{{ gameStore.percentage }}%</span>
      </div>
    </div>

    <div class="game-results__tracks">
      <div class="game-results__section">
        <h3 class="game-results__section-title">Угаданные треки</h3>
        <ul class="game-results__list">
          <li 
            v-for="track in gameStore.guessedTracks" 
            :key="track.title" 
            class="game-results__item"
          >
            {{ track.artist }} - {{ track.title }}
          </li>
        </ul>
      </div>

      <div class="game-results__section">
        <h3 class="game-results__section-title">Неугаданные треки</h3>
        <ul class="game-results__list">
          <li 
            v-for="track in gameStore.unguessedTracks" 
            :key="track.title" 
            class="game-results__item"
          >
            {{ track.artist }} - {{ track.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../styles/variables.scss';

.game-results {
  background-color: rgba($color-secondary, 0.5);
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: 0 0 20px rgba($color-primary, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba($color-primary, 0.1);

  &__title {
    color: $color-primary;
    text-align: center;
    margin-bottom: $spacing-xl;
    font-size: $font-size-h2;
    text-shadow: 0 0 10px rgba($color-primary, 0.2);
  }

  &__stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: $spacing-xl;
    padding: $spacing-lg;
    background-color: rgba($color-secondary, 0.3);
    border-radius: $border-radius-md;
    border: 1px solid rgba($color-primary, 0.2);
  }

  &__stat {
    text-align: center;
  }

  &__label {
    display: block;
    color: $color-text;
    font-size: $font-size-sm;
    margin-bottom: $spacing-xs;
  }

  &__value {
    color: $color-primary;
    font-size: $font-size-h3;
    font-weight: bold;
    text-shadow: 0 0 10px rgba($color-primary, 0.2);
  }

  &__tracks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-lg;
  }

  &__section {
    background-color: rgba($color-secondary, 0.3);
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    border: 1px solid rgba($color-primary, 0.2);
  }

  &__section-title {
    color: $color-primary;
    margin-bottom: $spacing-md;
    font-size: $font-size-h3;
    text-align: center;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    color: $color-text;
    padding: $spacing-sm;
    border-bottom: 1px solid rgba($color-primary, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
}
</style> 