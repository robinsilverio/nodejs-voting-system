<template>
    <HeaderComponent></HeaderComponent>
    <div class="cover"></div>
    <div class="voterview-container">
        <RouterView></RouterView>
    </div>
</template>
<script>
    import HeaderComponent from '@/components/header/Header.vue';
    export default {
        name: 'VoterViewComponent',
        components: {
            HeaderComponent,
        },
    }
</script>
<style scoped>
    .voterview-container {
        width: 80%;
        margin: auto;
        padding: 15px;
    }
    h1 {
        padding-left: 40px;
    }
    .voterview-container ul { list-style: none; }
    .candidates-container {
        margin: 10px 0;
        display: flex;
        gap: 10px;
    }

</style>