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
  button, .button {
      background-color: #ffffff; /* White background for contrast */
      color: #007bff; /* Blue text to match the overall theme */
      padding: 10px 20px; /* Padding for a balanced size */
      border: 2px solid #007bff; /* Blue border to keep the theme consistent */
      border-radius: 5px; /* Slightly rounded corners for a modern look */
      font-weight: bold; /* Bold text for emphasis */
      cursor: pointer; /* Pointer cursor on hover */
      transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition for hover effects */
  }
  button:hover, .button:hover {
      background-color: #007bff; /* Switch background color to blue on hover */
      color: #ffffff; /* Switch text color to white for better contrast */
  }

</style>
