<template>
    <div v-if="selectedElection" class="selected-election">
        <h3>Vote for a Candidate in {{ selectedElection.name }}</h3>
        <div class="candidates-container">
            <button v-for="candidate in candidates" :key="candidate.id" 
                    @click="selectCandidate(candidate.id)"
                    :class="{ selected: selectedCandidate === candidate.id }">
            {{ candidate.name }}
            </button>
        </div>
        <button @click="submitVote" :disabled="!selectedCandidate">Submit Vote</button>
    </div>
</template>
<script>
    export default {
        name: 'ElectionView',
        data: () => ({
            candidates: []
        }),
        props: {
            selectedElection: null
        },
        methods: {
            submitVote() {
                // Submit vote to server
            }
        }
    }
</script>