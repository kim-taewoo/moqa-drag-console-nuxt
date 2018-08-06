<template>
  <div class="error-page mt-4">
    <img src="@/assets/mascot.png" alt="">
    <h1>무언가 문제가 발생했네요!</h1>
    <p><a href="/">홈으로 돌아가기</a></p>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
