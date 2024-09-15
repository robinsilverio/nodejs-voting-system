<template>
    <div class="form-control voter">
        <label for="token">Invoeren stem token:</label>
        <input type="text" name="token" id="token" v-on:focus="clearErrorMessages()">
    </div>
    <div class="form-actions">
        <button type="button" @click="register()">Registreer</button>
    </div> 
    <div class="error-messages-container">
        <span v-for="(errorMessage, key) of this.onFormInvalid" :key="key" >{{ errorMessage }}</span>
    </div>
</template>
<script>
import { validateForm } from '@/utils/validator';

    export default {
        name: 'VotersRegisterForm',
        data(){
            return {
                errorMessages: [],
                form: {
                    inputFields: [
                            {
                                fieldName: 'token',
                                label: 'Token',
                                value: null
                            }
                    ]
                }
            }
        },
        computed: {
            onFormInvalid() {
                return this.errorMessages;
            }
        },
        methods: {
            register() {

                this.clearErrorMessages();

                const errors = validateForm(this.form);
                if (errors !== null) {
                    errors.forEach(error => {
                        this.errorMessages.push(error);
                    });
                    return;
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