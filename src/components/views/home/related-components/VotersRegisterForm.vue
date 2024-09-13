<template>
    <div class="form-control voter">
        <label for="token">Invoeren stem token:</label>
        <input type="text" name="token" id="token">
    </div>
    <div class="form-actions">
        <button type="submit">Registreer</button>
    </div>
</template>
<script>
    export default {
        name: 'VotersRegisterForm',
    }
</script>
<style scoped>
    .form-control {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>