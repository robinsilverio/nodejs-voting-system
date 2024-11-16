<template>
    <div class="CRUD-area">
        <div class="CRUD-area-header">
            <div class="back-button-wrapper">
                <a @click="this.closeCRUDContainer()">Return to dashboard.</a>
            </div>
            <div>
                <h1>{{ this.buttonStatus.title }}</h1>
                <button class="button success" @click="this.openForm('CREATE', null)">Create {{ this.buttonStatus.entity.toLowerCase() }}</button>
            </div>
        </div>
        <ul>
            <li v-if="getItems.length == 0">No {{ this.buttonStatus.entity }} available.</li>
            <li v-else v-for="item in getItems" :key="item.id">
                <p>{{ item[this.buttonStatus.itemName] }}</p>
                <div class="action-buttons">
                    <button type="button" class="button modify" @click="this.openForm('UPDATE', item)">
                        modify
                    </button>
                    <button type="button" class="button delete" @click="this.deleteItem(item.id)">
                        remove
                    </button>
                </div>
            </li>
        </ul>
    </div>
    <CRUDFormComponent v-if="this.isFormOpen" :entity="this.buttonStatus.entity" :crudFunction="this.crudFunction" :item="this.item" @closeForm="closeForm" ></CRUDFormComponent>
</template>
<script>
    import { store } from '@/store';
import CRUDFormComponent from './CRUDForm.vue';
    export default {
        components: {
            CRUDFormComponent,
        },
        emits: ['onCloseCrudContainer'],
        data() {
            return {
                isFormOpen: false,
                crudFunction: null,
                item: null,
                handleLoadItemsByEntity: {
                    'ELECTION' : () => store.dispatch('loadElections'),
                    'CANDIDATE' : () => store.dispatch('loadCandidates'),
                },
                handleItemsRetrievalByEntityAfterLoading: {
                    'ELECTION' : () => store.getters.getElections,
                    'CANDIDATE' : () => store.getters.getCandidates,
                },
                handleItemsDeletionByEntity: {
                    'ELECTION': (paramId) => store.dispatch('deleteElection', { id: paramId }),
                    'CANDIDATE': (paramId) => store.dispatch('deleteCandidate', { id: paramId }),
                }
            }
        },
        props: {
            buttonStatus: Object,
        },
        computed: {
            getItems() {
                return this.handleItemsRetrievalByEntityAfterLoading[this.buttonStatus.entity]();
            }
        },
        methods: {
            deleteItem(paramId) {
                this.handleItemsDeletionByEntity[this.buttonStatus.entity](paramId);
            },
            openForm(paramFunction, paramObj) {
                this.item = paramObj;
                this.crudFunction = paramFunction
                this.isFormOpen = true;
            },
            closeCRUDContainer() {
                this.$emit('onCloseCrudContainer');
            },
            closeForm(paramValue) {
                this.isFormOpen = false;
            }
        },
        created() {
            this.handleLoadItemsByEntity[this.buttonStatus.entity]();
        }
    }
</script>