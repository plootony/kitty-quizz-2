<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
</script>

<template>
  <div class="track-player">
    <div class="track-player__info">
      <img 
        v-if="gameStore.currentTrack?.cover" 
        :src="gameStore.currentTrack.cover" 
        :alt="gameStore.currentTrack.title" 
        class="track-player__cover"
      >
      <div class="track-player__details">
        <h3 class="track-player__title">{{ gameStore.currentTrack?.title }}</h3>
        <p class="track-player__artist">{{ gameStore.currentTrack?.artist }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../styles/variables.scss';

// Медиа-запросы
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;

.track-player {
  background-color: rgba($color-secondary, 0.5);
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: 0 0 20px rgba($color-primary, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba($color-primary, 0.1);

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-md;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: $spacing-lg;

    @media (max-width: $breakpoint-sm) {
      flex-direction: column;
      text-align: center;
      gap: $spacing-md;
    }
  }

  &__cover {
    width: 100px;
    height: 100px;
    border-radius: $border-radius-md;
    box-shadow: 0 0 10px rgba($color-primary, 0.2);

    @media (max-width: $breakpoint-lg) {
      width: 90px;
      height: 90px;
    }

    @media (max-width: $breakpoint-md) {
      width: 80px;
      height: 80px;
    }

    @media (max-width: $breakpoint-sm) {
      width: 120px;
      height: 120px;
    }
  }

  &__details {
    flex: 1;

    @media (max-width: $breakpoint-sm) {
      width: 100%;
    }
  }

  &__title {
    color: $color-primary;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: $spacing-xs;
    text-shadow: 0 0 10px rgba($color-primary, 0.3);
    letter-spacing: -0.5px;
    line-height: 1.2;

    @media (max-width: $breakpoint-lg) {
      font-size: 1.75rem;
    }

    @media (max-width: $breakpoint-md) {
      font-size: 1.5rem;
    }

    @media (max-width: $breakpoint-sm) {
      font-size: 1.35rem;
      margin-bottom: calc($spacing-xs / 2);
      word-break: break-word;
    }
  }

  &__artist {
    color: white;
    font-size: 1.25rem;
    font-weight: 500;
    opacity: 0.9;
    letter-spacing: -0.3px;

    @media (max-width: $breakpoint-lg) {
      font-size: 1.15rem;
    }

    @media (max-width: $breakpoint-md) {
      font-size: 1.1rem;
    }

    @media (max-width: $breakpoint-sm) {
      font-size: 1rem;
      word-break: break-word;
    }
  }
}
</style> 