<template>
  <RouterView></RouterView>  
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  :root {
    --login-width: 33%;
    --form-width: 50%;
    --main-width: 80%;
    --full-width: 100%;
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
  button, .button {
      background-color: #ffffff;
      color: #007bff;
      padding: 10px 20px;
      border: 2px solid #007bff;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
  }
  button:hover, .button:hover {
      background-color: #007bff;
      color: #ffffff;
  }
  .button.success, button.modify, .button.delete {
    color: #FFF;
  }
  .button.modify {
    background-color: #928b8b;
  }
  .button.success {
    background-color: #49cc49;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button.delete {
    background-color: red;
  }
  a {
      text-decoration: none;
      cursor: pointer;
  }

</style>
