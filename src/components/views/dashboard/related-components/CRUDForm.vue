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
                <input v-if="field.type === 'text'" :type="field.type" :name="field.name" :value="field.value" />
                <textarea v-if="field.type === 'textarea'" :name="field.name" :value="field.value"></textarea>
                <select v-if="field.type === 'dropDown'" :name="field.name">
                    <option value="">Select an option</option>
                    <!-- Add options dynamically -->
                </select>
                <input v-if="field.type === 'date'" :type="field.type" :name="field.name" :value="field.value" />
            </div>
            <button type="button" @click="this.submitForm" class="button success">{{ this.getText }}</button>
        </form>
    </div>
</template>
<script>
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
                            {name: 'party_filiation', label: 'Party filiation', type: 'text', value: this.item ? this.item.party_affiliation : ''},
                            {name: 'runs_for', label: 'Runs for', type: 'text', value: this.item ? this.item.runs_for : ''},
                        ]
                    },
                    ELECTION: {
                        inputFields: [
                            {name: 'election_name', type: 'text', label: 'Election name',  value: this.item ? this.item.election_name : ''},
                            {name: 'election_description', type: 'textarea', label: 'Election description',  value: this.item ? this.item.election_description : ''},
                            {name: 'election_type', type: 'dropDown', availableValues: ['National', 'Regional', 'Internal'], label: 'Election type',  value: this.item ? this.item.election_type : ''},
                            {name: 'election_startdate', type: 'date', label: 'Start date', value: this.item ? this.item.election_startdate : undefined},
                            {name: 'election_enddate', type: 'date', label: 'End date', value: this.item ? this.item.election_enddate : undefined},
                        ]
                    }
                }
            }
        },
        methods: {
            submitForm() {

            },
            closeForm() {
                this.$emit('closeForm', false);
            }
        },
        computed: {
            getText() {
                return this.crudFunction === 'CREATE' ? `Create ${this.entity}` : `Update ${this.entity}`;
            },
            getInputFields() {
                return this.form[this.entity.toUpperCase()].inputFields;
            }
        },
        created() {
            console.log(this.item);
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
    .form-wrapper a {
        text-decoration: none;
        cursor: pointer;
    }
    .form-wrapper form button {
        margin-top: 20px;
    }
</style>