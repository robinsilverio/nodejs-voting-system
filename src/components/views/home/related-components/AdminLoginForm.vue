<template>
    <div class="form-control admin" v-for="(inputField, key) of this.form.admin.inputFields" :key="key">
        <label :for="inputField.fieldName">{{inputField.label}}: </label>
        <input type="text" :name="inputField.fieldName"
                           v-model="inputField.value"
                           :id="inputField.fieldName"
                           v-on:focus="clearErrorMessages()"
                           >
    </div>
    <div class="form-actions">
        <button type="button" @click="this.logIn()">Inloggen</button>
    </div>
    <div class="error-messages-container">
        <span v-for="(errorMessage, key) of this.onFormInvalid" :key="key">{{ errorMessage }}</span>
    </div>
</template>
<script>
import { store } from '@/store';
import { validateForm } from '@/utils/validator';

    
    export default {
        name: 'AdminLoginForm',
        data () {
            return {
                errorMessages : [],
                form : {
                    admin: {
                        inputFields: [
                            {
                                fieldName : 'username',
                                label: 'Username',
                                value : null,
                            },
                            {
                                fieldName : 'password',
                                label: 'Password',
                                value : null
                            }
                        ]
                    }
                }
            }
        },
        computed : {
            onFormInvalid() {
                return this.errorMessages;
            }
        },
        methods: {
            logIn() {

                this.clearErrorMessages();

                let errors = validateForm(this.form.admin); 
                if(errors !== null) {
                    errors.forEach(error => {
                        this.errorMessages.push(error);
                    });
                    return;
                }

                store.dispatch('login');

            },
            clearErrorMessages() {
                this.errorMessages = [];
            }
        },
    }
</script>
<style scoped>
    
    .form-control.admin {
        justify-content: center;
    }
    .form-control label:first-of-type {
        margin-right: 5px;
    }
    input#password {
        margin-left: 2px;
    }
</style>