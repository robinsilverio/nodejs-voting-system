<template>
    <div class="cover"></div>
    <div class="form-wrapper">
        <div class="form-header">
            <h2 class="form-title">{{ this.getText }}</h2>
            <a @click="this.closeForm">Close form</a>
        </div>
        <form>
            <div class="form-control" v-for="(field, index) in getInputFields" :key="index">
                <label>{{ field.label }}:</label>
                <input v-if="field.type === 'text'" :type="field.type" :name="field.name" v-model="field.value" v-on:focus="this.clearErrorMessages()" />
                <textarea v-if="field.type === 'textarea'" :name="field.name" v-model="field.value" v-on:focus="this.clearErrorMessages()" ></textarea>
                <select v-if="field.type === 'dropDown'" :name="field.name" v-model="field.value" v-on:focus="this.clearErrorMessages()" >
                    <option value="">Select an option</option>
                    <option v-for="(option, index) in field.options" :key="index" :value="option">{{ option }}</option>
                </select>
                <div class="formGroup" v-if="field.type == 'formGroup'">
                    <p v-if="field.list.length < 1">Please select an election that a candidate has to participate.</p>
                    <ul>
                        <li v-for="(item, index) in field.list" :key="index">
                            <p>{{ item }}</p>
                            <button class="button delete" @click.prevent="field.deleteItem(field.list, item)" >Delete</button>
                        </li>
                    </ul>
                    <div class="input-row">
                        <select :name="field.name" v-model="field.value" v-on:focus="this.clearErrorMessages()">
                            <option value="">Select an election</option>
                            <option v-for="(item, index) in this.getElectionsToBeSelected" :key="index" :value="item.label">{{ item.label }}</option>
                        </select>
                        <button class="button success" @click.prevent="field.addItem(field.list, field.value)">Voeg verkiezing toe aan kandidaat</button>
                    </div>
                </div>
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
                            {
                                name: 'participates_in', 
                                label: 'participates in',
                                type: 'formGroup', 
                                list: [], 
                                addItem: (paramList, paramValue) => {
                                    this.clearErrorMessages();
                                    if (paramValue == null, paramValue == undefined, paramValue == '') {
                                        this.errorMessages.push('Please select a valid election');
                                        return;
                                    }
                                    paramList.push(paramValue); 
                                }, 
                                deleteItem: (paramList, paramValue) => { paramList.splice(paramList.indexOf(paramValue), 1) }, 
                                value: ''
                            },
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
            createEntityObject(paramForm, paramId) {
                const entityObject = paramForm.inputFields.reduce((acc, field) => {
                    if (field.type === 'formGroup') {
                        acc[field.name] = field.list;
                    } else {
                        acc[field.name] = field.value;
                    }
                    return acc;
                }, {});
                if (paramId) {
                    entityObject.id = paramId;
                }
                return entityObject;
            },
            submitForm() {

                this.clearErrorMessages();

                let currentForm = `${this.entity}Form`;
                let errors = validateInputs({ [currentForm] : this.form[currentForm]});

                if (errors.length > 0) {
                    errors.forEach(error => this.errorMessages.push(error));
                    return;
                }

                store.dispatch('determineFormMutation', { entity: this.entity, data: this.createEntityObject(this.form[currentForm], this.item ? this.item.id : null), crudFunction: this.crudFunction})
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
    .form-wrapper .form-header, 
    .form-wrapper form, .form-wrapper form div, 
    .form-wrapper form .form-control .formGroup ul li {
        display: flex;
    }
    .form-wrapper .form-header, 
    .form-wrapper form .form-control .formGroup ul li,
    .form-wrapper form .form-control .formGroup .input-row {
        justify-content: space-between;
    }
    .form-wrapper form, .form-wrapper form .form-control, .form-wrapper form .form-control .formGroup {
        flex-direction: column;
    }
    .form-wrapper form {
        height: 100%;
        justify-content: space-evenly;
        gap: 25px;
    }
    .form-wrapper form .form-control {
        justify-content: space-around;
    }
    .form-wrapper form .form-control textarea {
        height: 150px;
    }
    .form-wrapper form .form-control .formGroup ul {
        list-style: none;
    }
    .form-wrapper form .form-control .formGroup ul li {
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .form-wrapper form .form-control .formGroup button {
        margin-top: 0 !important;
        display: inline-flex;
        justify-content: center;
    }
    .form-wrapper form button {
        margin-top: 20px;
    }
    .error-messages-container{
        margin-top: 20px;
    }
</style>