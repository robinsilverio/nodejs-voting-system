<template>
    <h1>Available Elections</h1>
        <div v-if="getElections.length === 0">No elections available.</div>
        <ul v-else>
            <li v-for="election in getElections" :key="election.id">
                <div>
                    <h3>{{ election.election_name }}</h3>
                    <p>{{ election.election_description }}</p>
                    <button @click="enterElection(election)">Enter Election</button>
                </div>
            </li>
        </ul>
</template>
<script>
import { store } from '@/store';

    export default {
        data: () => ({
            selectedElection: false
        }),
        computed: {
            getElections() {
                return store.getters.getElections;
            }
        },
        methods: {
            enterElection(paramElection) {
                this.$emit('onElectionSelect', paramElection)
                this.$router.push(`/voter-view/election/${paramElection.id}`);
            }
        },
        created() {
            store.dispatch('loadElections');
        }
    }
</script>
<style scoped>
    ul { list-style: none; padding: 0; }
</style>