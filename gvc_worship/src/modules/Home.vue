<template>
    <div class="home-page">
        <Navigation/>
        <router-view/>
    </div>
</template>

<script>
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import {AuthService } from '../apis';
import Navigation from './components/Navigation.vue';

export default {
    name: 'Home',
    components: {
    Button,
    Menubar,
    Navigation
},
    data() {
        return {
        }
    },
    methods: {
        async logout() {
            try{
                await AuthService.logout();
                this.$router.push('/login');
            } catch (err) {
                console.log(err.code);
            }
        }
    }
}
</script>