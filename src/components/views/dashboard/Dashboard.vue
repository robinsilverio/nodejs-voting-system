<template>
    <DashboardHeaderComponent></DashboardHeaderComponent>
    <div class="dashboard-container">
        <div class="buttons" v-for="button of this.dashboardButtons" :key="button.id">
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
                { id: 1, name: 'manage-candidates', value: 'Manage candidates' },
                { id: 2, name: 'manage-election-types', value: 'Manage election types' },
                { id: 3, name: 'manage-ballots', value: 'Manage ballots' },
                { id: 4, name: 'view-results', value: 'View results per election' }
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
</style>