<template>
    <DashboardHeaderComponent></DashboardHeaderComponent>
    <div class="dashboard-container">
        <div class="buttons" v-for="button of this.dashboardButtons" :key="button.id">
            <img :src="button.iconSrc" alt="" height="150" width="150">
            {{ button.value }}
        </div>
    </div>
</template>
<script>

import DashboardHeaderComponent from './related-components/DashboardHeader.vue';

export default {
    name: 'DashboardComponent',
    components: {
        DashboardHeaderComponent,
    },
    data() {
        return {
            dashboardButtons: [
                { id: 1, name: 'manage-candidates', value: 'Manage candidates', iconSrc: require('../../../assets/icons/Transparent_Manage_candidates.png') },
                { id: 2, name: 'manage-election-types', value: 'Manage election types', iconSrc: require('../../../assets/icons/Transparent_Manage_election_types.png') },
                { id: 3, name: 'manage-ballots', value: 'Manage ballots', iconSrc: require('../../../assets/icons/Transparent_Manage_ballots.png') },
                { id: 4, name: 'view-results', value: 'View results per election', iconSrc: require('../../../assets/icons/Transparent_View_results_per_election.png') }
            ]
        }
    }
};
</script>
<style scoped>
    header {
        justify-content: flex-end;
    }
    header, .dashboard-container {
        width: 80%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
    }
    .dashboard-container {
        justify-content: space-around;
        padding: 20px 0px;
    }
    .buttons {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .buttons img { margin: auto; }
</style>