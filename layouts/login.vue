<template>
  <transition name="fade" mode="out-in">
    <div class="login-layout">
      <nuxt />

    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style>
.login-layout {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: url(~/assets/wallpaper.jpg);
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
}
</style>
