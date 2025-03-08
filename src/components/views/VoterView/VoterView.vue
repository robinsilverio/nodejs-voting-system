<template>
    <HeaderComponent></HeaderComponent>
    <div class="voterview-container">
        <RouterView :selectedElection="this.selectedElection" @onElectionSelect="onElectionSelect"></RouterView>
    </div>
</template>
<script>
    import HeaderComponent from '@/components/header/Header.vue';
    export default {
        name: 'VoterViewComponent',
        data: () => ({
            selectedElection: null
        }),
        methods: {
            onElectionSelect(paramElection) {
                this.selectedElection = paramElection;
            }
        },
        components: {
            HeaderComponent
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
    .candidates-container {
        margin: 10px 0;
        display: flex;
        gap: 10px;
    }

</style>