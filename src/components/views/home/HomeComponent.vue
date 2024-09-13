<template>
    <div class="loginform-wrapper">
        <form class="login-form">
            <template v-if="!this.loginAsAdmin">
                <VotersRegisterForm></VotersRegisterForm>
            </template>
            <template v-else>
                <AdminLoginForm></AdminLoginForm>
            </template>
        </form>
        <a @click="changeForm()">{{ this.toggleButtonText }}</a>
    </div>
</template>
<script>
import AdminLoginForm from './related-components/AdminLoginForm.vue';
import VotersRegisterForm from './related-components/VotersRegisterForm.vue';

export default {
    name: 'HomeComponent',
    components: {
        AdminLoginForm, VotersRegisterForm
    },
    computed: {
        toggleButtonText() {
            return !this.loginAsAdmin ? 'Inloggen als administrator' : 'Registreer als stemmer';
        }
    }
    ,
    data() {
        return{
            loginAsAdmin : false
        }
    },
    methods: {
        changeForm() {
            this.loginAsAdmin = !this.loginAsAdmin;
        }
    }
}
</script>
<style scoped>
    .loginform-wrapper {
        width: var(--login-width);
        margin: auto;
        padding: var(--regular-padding);
        text-align: center;
        background-color: var(--secondary-background-color);
        display: flex;
        flex-direction: column;
        gap: 15px;
        border-radius: 5px;
    }

    .loginform-wrapper .login-form {
        display: flex;
        flex-direction: column;
        gap: var(--regular-padding);
    }

</style>