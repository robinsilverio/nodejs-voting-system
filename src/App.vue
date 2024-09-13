<template>
  <h1 id="app-title">Voting System</h1>
  <RouterView></RouterView>  
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  :root {
    --login-width: 35%;
    --main-background-color: #2c3e50;
    --secondary-background-color: #199ef9;
    --regular-padding: 15px;
    --main-site-font: Avenir, Helvetica, Arial, sans-serif;
  }
  #app {
    font-family: var(--main-site-font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--main-background-color);
    margin-top: 60px;
    height: 100vh;
  }
  #app #app-title { text-align: center; }
</style>
