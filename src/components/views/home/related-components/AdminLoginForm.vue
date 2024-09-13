<template>
    <div class="form-control admin">
        <label for="input-username">Username: </label>
        <input type="text" name="input-username" id="input-username">
    </div>
    <div class="form-control admin">
        <label for="input-password">password: </label>
        <input type="password" name="input-password" id="input-password">
    </div>
    <div class="form-actions">
        <button type="submit">Inloggen</button>
    </div>
</template>
<script>
    export default {
        name: 'AdminLoginForm',
    }
</script>
<style scoped>
    .form-control {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    input#input-password {
        margin-left: 5px;
    }
</style>