<template>
    <header>
        <a @click="this.logout()">Log out</a>
    </header>
</template>
<script>
    import { store } from '@/store';

    export default {
        name: 'DashboardHeaderComponent',
        methods: {
            logout() {
                store.dispatch('logout');
            }
        }
    }
</script>