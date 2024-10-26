<template>
    <HeaderComponent></HeaderComponent>
    <div class="voterview-container">
        <h1>Available Elections</h1>
        <div v-if="getElections.length === 0">No elections available.</div>
        <ul v-else>
            <li v-for="election in getElections" :key="election.id">
                <div>
                    <h3>{{ election.election_name }}</h3>
                    <p>{{ election.election_description }}</p>
                    <button @click="enterElection(election.id)">Enter Election</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import HeaderComponent from '@/components/header/Header.vue';
    import { store } from '@/store';
    export default {
        name: 'VoterViewComponent',
        components: {
            HeaderComponent
        },
        computed: {
            getElections() {
                return store.getters.items;
            }
        },
        methods: {
            enterElection(paramElectionId) {
                // Work in progress...
            }
        },
        created() {
            store.dispatch('loadItems',  'elections');
        }
    }
</script>
<style scoped>
    .voterview-container {
        width: 80%;
        margin: auto;
        padding: 15px 0px;
    }
    h1 {
        padding-left: 40px;
    }
    .voterview-container ul { list-style: none; }

</style>