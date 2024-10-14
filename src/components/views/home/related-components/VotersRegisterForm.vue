<template>
    <div class="form-control voter">
        <label for="token">Invoeren stem token:</label>
        <input type="text" name="token" id="token" v-model="this.forms.votersRegisterForm.inputFields[0].value" v-on:focus="clearErrorMessages()">
    </div>
    <div class="form-actions">
        <button type="button" @click="register()">Registreer</button>
    </div> 
    <div class="error-messages-container">
        <span v-for="(errorMessage, key) of this.onFormInvalid" :key="key" >{{ errorMessage }}</span>
    </div>
</template>
<script>
import { store } from '@/store';
import { validateInputs } from '@/utils/validators/validators';

    export default {
        name: 'VotersRegisterForm',
        data(){
            return {
                errorMessages: [],
                forms: {
                    votersRegisterForm : {
                        inputFields: [
                            {
                                fieldName: 'token',
                                label: 'Token',
                                value: null
                            }
                        ]
                    }
                }
            }
        },
        computed: {
            onFormInvalid() {
                return this.errorMessages;
            }
        },
        methods: {
            async  register() {


                this.clearErrorMessages();

                const errors = validateInputs(this.forms); // apply changes here.
                if (errors.length != 0) {
                    errors.forEach(error => {
                        this.errorMessages.push(error);
                    });
                    return;
                }

                const voterObject = {
                    token: this.forms.votersRegisterForm.inputFields[0].value
                }

                try {
                    await store.dispatch('registerVoter', voterObject);
                } catch(error) {
                    this.errorMessages.push(error);
                }

            },
            clearErrorMessages() {
                this.errorMessages = [];
            }
        }
    }
</script>
<style scoped>
    .form-control.voter {
        justify-content: space-between;
    }
</style>