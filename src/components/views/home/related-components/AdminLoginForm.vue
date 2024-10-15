<template>
    <div class="form-control admin" v-for="(inputField, key) of this.forms.adminLoginForm.inputFields" :key="key">
        <label :for="inputField.fieldName">{{inputField.label}}: </label>
        <input :type="inputField.type" :name="inputField.fieldName"
                           v-model="inputField.value"
                           :id="inputField.fieldName"
                           v-on:focus="clearErrorMessages()"
                           >
    </div>
    <div class="form-actions">
        <button type="button" @click="this.login()">Inloggen</button>
    </div>
    <div class="error-messages-container">
        <span v-for="(errorMessage, key) of this.onFormInvalid" :key="key">{{ errorMessage }}</span>
    </div>
</template>
<script>
    import { store } from '@/store';
    import { validateInputs } from '@/utils/validators/validators';


    
    
    
    export default {
        name: 'AdminLoginForm',
        data () {
            return {
                errorMessages : [],
                forms : {
                    adminLoginForm: {
                        inputFields: [
                            {
                                type: 'text',
                                fieldName : 'username',
                                label: 'Username',
                                value : null,
                            },
                            {
                                type: 'password',
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
            },
        },
        methods: {
            async login() {

                this.clearErrorMessages();

                let errors = validateInputs(this.forms); 
                if(errors.length != 0) {
                    errors.forEach(error => {
                        this.errorMessages.push(error);
                    });
                    return;
                }

                const username = this.forms.adminLoginForm.inputFields[0].value;
                const password = this.forms.adminLoginForm.inputFields[1].value;

                let loginInput = {
                    username: username,
                    password: password ?? ''
                }

                try {
                    await store.dispatch('login', loginInput);
                } catch (error) {
                    this.errorMessages.push(error);
                }

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