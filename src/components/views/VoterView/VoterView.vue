<template>
    <HeaderComponent></HeaderComponent>
    <div class="voterview-container">
        <h1>Available Elections</h1>
        <div v-if="listOfElections.length === 0">No elections available.</div>
        <ul v-else>
            <li v-for="election in listOfElections" :key="election.id">
                <div>
                    <h3>{{ election.name }}</h3>
                    <p>{{ election.description }}</p>
                    <button @click="enterElection(election.id)">Enter Election</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import HeaderComponent from '@/components/header/Header.vue';



    export default {
        name: 'VoterViewComponent',
        components: {
            HeaderComponent
        },
        data() {
            return {
                listOfElections: [
                    {
                        id: 1,
                        name: 'Instemmen bestuur',
                        description: 'Bij de laatste ALV moeten de toekomstige bestuursleden ingestemd zijn.'
                    }
                ]
            }
        },
        methods: {
            enterElection(paramElectionId) {

            }
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