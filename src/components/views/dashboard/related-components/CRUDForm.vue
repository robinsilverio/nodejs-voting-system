<template>
    <div class="cover"></div>
    <div class="form-wrapper">
        <div class="form-header">
            <h2 class="form-title">{{ this.getText }}</h2>
            <a @click="this.closeForm">Close form</a>
        </div>
        <form>
            <div v-for="(field, index) in getInputFields" :key="index">
                <label>{{ field.label }}:</label>
                <input v-if="field.type === 'text'" :type="field.type" :name="field.name" v-model="field.value" v-on:focus="this.clearErrorMessages()" />
                <textarea v-if="field.type === 'textarea'" :name="field.name" v-model="field.value" v-on:focus="this.clearErrorMessages()" ></textarea>
                <select v-if="field.type === 'dropDown'" :name="field.name" v-model="field.value" v-on:focus="this.clearErrorMessages()" >
                    <option value="">Select an option</option>
                    <option v-for="(option, index) in field.options" :key="index" :value="option">{{ option }}</option>
                </select>
                <input v-if="field.type === 'date'" :type="field.type" :name="field.name" v-model="field.value" v-on:focus="this.clearErrorMessages()" />
            </div>
            <button type="button" @click="this.submitForm" class="button success">{{ this.getText }}</button>
        </form>
        <div class="error-messages-container">
            <p v-for="(errorMessage, key) of this.onFormInvalid" :key="key" >{{ errorMessage }}</p>
        </div>
    </div>
</template>
<script>
import { store } from '@/store';
import { validateInputs } from '@/utils/validators/validators';
import { formatDateToInputValue } from '../../../../utils/dateUtils';

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
                errorMessages: [],
                form: {
                    candidateForm: {
                        inputFields: [
                            {name: 'candidate_name', label: 'Candidate name', type: 'text', value: this.item ? this.item.candidate_name : ''},
                            {name: 'party_filiation', label: 'Party filiation', type: 'text', value: this.item ? this.item.party_filiation : ''},
                            {name: 'runs_for', label: 'Runs for', type: 'text', value: this.item ? this.item.runs_for : ''},
                            {name: 'participates_in', label: 'participates in', type: 'dropDown', options: [], value: this.item ? this.item.participates_in : ''},
                        ]
                    },
                    electionForm: {
                        inputFields: [
                            {name: 'election_name', type: 'text', label: 'Election name',  value: this.item ? this.item.election_name : ''},
                            {name: 'election_description', type: 'textarea', label: 'Election description',  value: this.item ? this.item.election_description : ''},
                            {name: 'election_type', type: 'dropDown', options: ['National', 'Regional', 'Internal'], label: 'Election type',  value: this.item ? this.item.election_type : ''},
                            {name: 'election_startdate', type: 'date', label: 'Start date', value: this.item ? formatDateToInputValue(this.item.election_startdate) : undefined},
                            {name: 'election_enddate', type: 'date', label: 'End date', value: this.item ? formatDateToInputValue(this.item.election_enddate) : undefined},
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
                        runs_for: paramData.runs_for,
                        participates_in: this.item ? this.item.participates_in : null,
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

                this.clearErrorMessages();

                let currentForm = `${this.entity}Form`;
                let errors = validateInputs({ [currentForm] : this.form[currentForm]});

                if (errors.length > 0) {
                    errors.forEach(error => this.errorMessages.push(error));
                    return;
                }

                const entityData = this.determineEntity(this.form[currentForm].inputFields.reduce((paramDataToBeCreated,  field) => {
                    paramDataToBeCreated[field.name] = field.value;
                    return paramDataToBeCreated;
                }, {}))[this.entity.toUpperCase()];

                store.dispatch('determineFormMutation', { entity: this.entity, data: entityData, crudFunction: this.crudFunction})
                .then(() => this.$emit('closeForm', false))
                .catch((error) => this.errorMessages.push(error.response.data));
            },
            closeForm() {
                this.$emit('closeForm', false);
            },
            clearErrorMessages() {
                this.errorMessages = [];
            }
        },
        computed: {
            getText() {
                return this.crudFunction === 'CREATE' ? `Create ${this.entity}` : `Update ${this.entity}`;
            },
            getInputFields() {
                let currentForm = `${this.entity}Form`;
                return this.form[currentForm].inputFields;
            },
            onFormInvalid() {
                return this.errorMessages;
            },
            getElectionsToBeSelected() {
                return store.getters.getElections;
            }
        },
        created() {
            if (this.entity === 'candidate') {
                store.dispatch('loadItems', { functionToBeCalled: 'SET_RELATED_ITEMS', entity: 'election' });
                setTimeout(() => {
                    this.form.candidateForm.inputFields[3].options = this.getElectionsToBeSelected.map(election => election.label);
                }, 500);
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
    .form-wrapper form div textarea {
        height: 150px;
    }
    .form-wrapper form button {
        margin-top: 20px;
    }
    .error-messages-container{
        margin-top: 20px;
    }
</style>