<template>
    <div class="CRUD-area">
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
                <p>{{ item[this.buttonStatus.itemName] }}</p>
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
                item: null
            }
        },
        props: {
            buttonStatus: Object,
        },
        computed: {
            getItems() {
                return store.getters.items;
            }
        },
        methods: {
            deleteItem(paramId, paramEntity) {
                store.dispatch('deleteItem', { id: paramId, entity: paramEntity } );
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
            const objToBeSend = {
                functionToBeCalled: 'SET_ITEMS',
                entity: this.buttonStatus.entity,
            }
            store.dispatch('loadItems', objToBeSend);            
        }
    }
</script>