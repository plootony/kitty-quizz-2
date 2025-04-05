<template>
  <div class="preloader">
    <div class="preloader__spinner"></div>
    <p class="preloader__text">Загрузка трека...</p>
  </div>
</template>

<style lang="scss">
@import '../styles/variables.scss';

.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
  
  &__spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba($color-primary, 0.3);
    border-radius: 50%;
    border-top-color: $color-primary;
    animation: spin 1s linear infinite;
    margin-bottom: $spacing-md;
  }
  
  &__text {
    color: $color-text;
    font-size: $font-size-base;
    text-align: center;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 