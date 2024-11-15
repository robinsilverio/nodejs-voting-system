<template>
    <HeaderComponent></HeaderComponent>
    <div class="dashboard-container">
        <div class="dashboard-buttons" v-if="this.buttonStatus == null">
            <div class="button" @click="this.openCRUDContainer(button)" v-for="button of this.dashboardButtons" :key="button.id">
                <img :src="button.iconSrc" alt="" height="150" width="150">
                {{ button.value }}
            </div>
        </div>
        <CRUDArea v-if="this.buttonStatus !== null" :buttonStatus="this.buttonStatus" @onCloseCrudContainer="onCloseCrudContainer"></CRUDArea>
    </div>
</template>
<script>

import HeaderComponent from '../../header/Header.vue';
import CRUDArea from './related-components/CRUDArea.vue';

export default {
    name: 'DashboardComponent',
    components: {
        HeaderComponent,
        CRUDArea
    },
    data() {
        return {
            itemName: null,
            dashboardButtons: [
                { id: 1, name: { singular: 'candidate', plural: 'candidates' }, value: 'Manage candidates', iconSrc: require('../../../assets/icons/Transparent_Manage_candidates.png') },
                { id: 2, name: { singular: 'election', plural: 'elections' }, value: 'Manage elections', iconSrc: require('../../../assets/icons/Transparent_Manage_election_types.png') },
                { id: 3, name: 'manage-ballots', value: 'Manage ballots', iconSrc: require('../../../assets/icons/Transparent_Manage_ballots.png') },
                { id: 4, name: 'view-results', value: 'View results per election', iconSrc: require('../../../assets/icons/Transparent_View_results_per_election.png') }
            ],
            buttonStatus: null
        }
    },
    methods: {
        openCRUDContainer(paramButton) {
            this.buttonStatus = {
                title: paramButton.value,
                entity: paramButton.name.singular,
                itemName: `${paramButton.name.singular}_name`
            }
        },
        onCloseCrudContainer() {
            this.buttonStatus = null;
        },
        created() {
            alert(this.getItems);
        }   
    }
};
</script>
<style>
    header, 
    .dashboard-container, 
    .dashboard-buttons, 
    .button, 
    .dashboard-container .CRUD-area ul li, 
    .dashboard-container .CRUD-area ul li .action-buttons {
        display: flex;
    }

    .dashboard-container h1 {
        margin: 10px 0px;
    }

    header, .dashboard-container, .dashboard-buttons {
        flex-wrap: wrap;
    }

    header, .dashboard-container {
        width: 80%;
        margin: auto;
    }

    .dashboard-container {
        flex-direction: column;
    }

    header {
        justify-content: flex-end;
    }

    .dashboard-buttons {
        justify-content: space-around;
        padding: 20px 0px;
    }

    .button {
        flex-direction: column;
        text-align: center;
    }

    .action-buttons .button {
        justify-content: center;
    }

    .button img {
        margin: auto;
    }

    .dashboard-container .CRUD-area {
        padding: 20px;
    }

    .dashboard-container .CRUD-area ul {
        list-style: none;
        padding: 0;
    }

    .dashboard-container .CRUD-area ul li {
        justify-content: space-between;
    }

    .dashboard-container .CRUD-area ul li p {
        cursor: pointer;
    }
    .dashboard-container .CRUD-area .CRUD-area-header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 15px;
    }
    .dashboard-container .CRUD-area .CRUD-area-header .back-button-wrapper, 
    .dashboard-container .CRUD-area .CRUD-area-header div:last-of-type {
        display: flex;
    }
    .dashboard-container .CRUD-area .CRUD-area-header .back-button-wrapper {
        justify-content: flex-end;
    }
    .dashboard-container .CRUD-area .CRUD-area-header  div:last-of-type {
        justify-content: space-between;
    }
</style>