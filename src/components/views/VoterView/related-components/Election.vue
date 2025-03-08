<template>
    <div class="selected-election">
        <h3>Vote for a Candidate in {{ this.getSelectedElection.election_name }} </h3>
        <div class="candidates-container">
            <button v-for="candidate in getCandidates" :key="candidate.id" 
                    @click="selectCandidate(candidate.id)"
                    :class="{ selected: selectedCandidate === candidate.id }">
            {{ candidate.candidate_name }}
            </button>
        </div>
        <button @click="submitVote" :disabled="!selectedCandidate">Submit Vote</button>
    </div>
</template>
<script>
import { store } from '@/store';

    export default {
        name: 'ElectionView',
        data: () => ({
            selectedCandidate: null
        }),
        computed: {
            getSelectedElection() {
                return this.selectedElection;
            },
            getCandidates() {
                return store.getters.getParticipatingCandidatesPerElection;
            }
        },
        props: {
            id: Number,
            selectedElection: Object
        },
        methods: {
            selectCandidate(candidateId) {
                this.selectedCandidate = candidateId;
            },
            submitVote() {
                // Submit vote to server
            }
        },
        created() {
            // Fetch candidates from server
            store.dispatch('loadCandidatesByParticipatingElection', this.id);
        }
    }
</script>
<style scoped>
    .selected-election {
        background-color: #007bff;
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        width: 50%;
        margin: auto;
    }

    .candidates-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 15px;
    }

    button:hover {
        background-color: #0056b3;
        color: white;
    }

    .selected {
        background-color: #0056b3;
        color: white;
    }

    button:disabled {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
    }


</style>