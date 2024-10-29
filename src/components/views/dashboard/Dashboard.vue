<template>
    <HeaderComponent></HeaderComponent>
    <div class="dashboard-container">
        <div class="dashboard-buttons" v-if="this.buttonStatus == null">
            <div class="button" @click="this.openCRUDContainer(button)" v-for="button of this.dashboardButtons" :key="button.id">
                <img :src="button.iconSrc" alt="" height="150" width="150">
                {{ button.value }}
            </div>
        </div>
        <div class="CRUD-area" v-if="this.buttonStatus !== null">
            <div class="CRUD-area-header">
                <div class="back-button-wrapper">
                    <a @click="this.closeCRUDContainer()">Return to dashboard.</a>
                </div>
                <div>
                    <h1>{{ this.buttonStatus.title }}</h1>
                    <button class="button success" @click="this.openForm('CREATE', null)">Create {{ this.buttonStatus.entity }}</button>
                </div>
            </div>
            <ul>
                <li v-if="getItems.length == 0">No {{ this.buttonStatus.entity }} available.</li>
                <li v-else v-for="item in getItems" :key="item.id">
                    <p>{{ item[this.itemName] }}</p>
                    <div class="action-buttons">
                        <button type="button" class="button modify" @click="this.openForm('UPDATE', item)">
                            modify
                        </button>
                        <button type="button" class="button delete" @click="this.deleteItem(item.id, this.buttonStatus.entity)">
                            remove
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <CRUDFormComponent v-if="this.isFormOpen" :entity="this.buttonStatus.entity" :crudFunction="this.crudFunction" :item="this.item" @closeForm="closeForm" ></CRUDFormComponent>
    </div>
</template>
<script>

import { store } from '@/store';
import HeaderComponent from '../../header/Header.vue';
import CRUDFormComponent from './related-components/CRUDForm.vue';

export default {
    name: 'DashboardComponent',
    components: {
        HeaderComponent,
        CRUDFormComponent
    },
    computed: {
        getItems() {
            return store.getters.items;
        }
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
            buttonStatus: null,
            isFormOpen: false,
            crudFunction: null,
            item: null
        }
    },
    methods: {
        openCRUDContainer(paramButton) {
            this.buttonStatus = {
                title: paramButton.value,
                entity: paramButton.name.singular,
            }
            this.itemName = `${paramButton.name.singular}_name`;
            const objToBeSend = {
                functionToBeCalled: 'SET_ITEMS',
                entity: paramButton.name.singular,
            }
            store.dispatch('loadItems', objToBeSend);
        },
        closeCRUDContainer() {
            this.buttonStatus = null;
        },
        deleteItem(paramId, paramEntity) {
            store.dispatch('deleteItem', { id: paramId, entity: paramEntity } );
        },
        openForm(paramFunction, paramObj) {
            this.item = paramObj;
            this.crudFunction = paramFunction
            this.isFormOpen = true;
        },
        closeForm(paramValue) {
            this.isFormOpen = false;
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