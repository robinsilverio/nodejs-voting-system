<template>
    <div class="cover"></div>
    <div class="form-wrapper">
        <div class="form-header">
            <h2 class="form-title">{{ this.getText }}</h2>
            <a @click="this.closeForm">Close form</a>
        </div>
        <form>
            <div v-for="(field, index) in getInputFields" :key="index">
                <label>{{ field.label }}</label>
                <input v-if="field.type === 'text'" :type="field.type" :name="field.name" v-model="field.value" />
                <textarea v-if="field.type === 'textarea'" :name="field.name" v-model="field.value"></textarea>
                <select v-if="field.type === 'dropDown'" :name="field.name" v-model="field.value">
                    <option value="">Select an option</option>
                    <option v-for="(option, index) in field.options" :key="index" :value="option">{{ option }}</option>
                </select>
                <input v-if="field.type === 'date'" :type="field.type" :name="field.name" v-model="field.value" />
            </div>
            <button type="button" @click="this.submitForm" class="button success">{{ this.getText }}</button>
        </form>
    </div>
</template>
<script>
    import { store } from '@/store';

    export default {
        name: 'CRUDFormComponent',
        props: {
            entity: {
                type: String,
                default: ''
            },
            crudFunction: {
                type: String,
                default: 'CREATE'
            },
            item: Object
        },
        data() {
            return {
                form: {
                    CANDIDATE: {
                        inputFields: [
                            {name: 'candidate_name', label: 'Candidate name', type: 'text', value: this.item ? this.item.candidate_name : ''},
                            {name: 'party_filiation', label: 'Party filiation', type: 'text', value: this.item ? this.item.party_filiation : ''},
                            {name: 'election_id', label: 'election_id', type: 'text', value: this.item ? this.item.election_id : ''},
                            {name: 'runs_for', label: 'Runs for', type: 'text', value: this.item ? this.item.runs_for : ''},
                        ]
                    },
                    ELECTION: {
                        inputFields: [
                            {name: 'election_name', type: 'text', label: 'Election name',  value: this.item ? this.item.election_name : ''},
                            {name: 'election_description', type: 'textarea', label: 'Election description',  value: this.item ? this.item.election_description : ''},
                            {name: 'election_type', type: 'dropDown', options: ['National', 'Regional', 'Internal'], label: 'Election type',  value: this.item ? this.item.election_type : ''},
                            {name: 'election_startdate', type: 'date', label: 'Start date', value: this.item ? this.formatDateToInputValue(this.item.election_startdate) : undefined},
                            {name: 'election_enddate', type: 'date', label: 'End date', value: this.item ? this.formatDateToInputValue(this.item.election_enddate) : undefined},
                        ]
                    }
                }
            }
        },
        methods: {
            determineEntity(paramData) {
                return {
                    'CANDIDATE': {
                        id: this.item ? this.item.id : null, 
                        candidate_name: paramData.candidate_name,  
                        party_filiation: paramData.party_filiation,
                        election_id: this.item ? this.item.election_id : null,
                        runs_for: paramData.runs_for
                    },
                    'ELECTION': {
                        id: this.item ? this.item.id : null,
                        election_name: paramData.election_name,
                        election_description: paramData.election_description,
                        election_type: paramData.election_type,
                        election_startdate: paramData.election_startdate,
                        election_enddate: paramData.election_enddate
                    }
                }
            },
            submitForm() {
                const entityData = this.determineEntity(this.form[this.entity.toUpperCase()].inputFields.reduce((paramDataToBeCreated,  field) => {
                    paramDataToBeCreated[field.name] = field.value;
                    return paramDataToBeCreated;
                }, {}))[this.entity.toUpperCase()];

                store.dispatch('determineFormMutation', { entity: this.entity, data: entityData, crudFunction: this.crudFunction})
                .then((success) => this.$emit('closeForm', false))
                .catch((error) => console.error(error));
            },
            closeForm() {
                this.$emit('closeForm', false);
            },
            formatDateToInputValue(date) {
                const d = new Date(date);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
        },
        computed: {
            getText() {
                return this.crudFunction === 'CREATE' ? `Create ${this.entity}` : `Update ${this.entity}`;
            },
            getInputFields() {
                return this.form[this.entity.toUpperCase()].inputFields;
            }
        }
    }
</script>
<style scoped>
    .cover {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .form-wrapper {
        background-color: #FFF;
        position: absolute;
        width: 50%;
        left: calc(50% - (50%/2));
        border-radius: 10px;
        padding: var(--regular-padding);
        z-index: 1;
        margin-top: 5rem;
    }
    .form-wrapper .form-header {
        display: flex;
        justify-content: space-between;
    }
    .form-wrapper form {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
        gap: 25px;
    }
    .form-wrapper form div {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    }
    .form-wrapper form button {
        margin-top: 20px;
    }
</style>