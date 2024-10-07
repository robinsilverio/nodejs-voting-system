<template>
    <div class="dashboard-container">
        <div class="buttons" v-for="button of this.dashboardButtons" :key="button.id">
            {{ button.value }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'DashboardComponent',
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
<style>
   .dashboard-container {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
    } 
</style>