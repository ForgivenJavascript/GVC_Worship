<template>
    <Menubar :model="navItems" class="navBar-background">
        <template #start>
            <img src="../../assets/logo-LGVC.png" @click="goHome">
        </template>
        <template #item="{item}">
            <Button @click="goTo(item.to)" class="navBar-button" :style="currentRoute == item.to ? {color: '#F04E23'}:{color: white}">{{item.label}}</Button>
        </template>
        <template #end>
            <div class="secondTitle">{{currentUser?.name}} {{getName()}}</div>
            <Button label="Log out" @click="logout" class="navBar-button-logout p-button-outlined" />
        </template>
    </Menubar>
</template>

<script>
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import { AuthService } from '../../apis';
import { getNavContent } from '@/shared/utils/nav-utils';
import { RoleName } from '@/shared/enums';

export default {
    name: 'Navigation',
    components: {
        Button,
        Menubar
    },
    data() {
        return {
            navItems: [],
            currentUser: "",
            currentRoute: this.$router.currentRoute.value.fullPath
        }
    },
    async mounted() {
        this.currentUser = this.$store.getters.getServerUserInfo;
        this.navItems = getNavContent(this.currentUser);
    },
    methods: {
        async logout() {
            try{
                await AuthService.logout();
                this.$router.push('/login');
            } catch (err) {
                console.log(err.code);
            }
        },
        async goHome() {
            this.$router.push('/');
        },
        goTo(to) {
            this.$router.push(to);
        },
        getName() {
            return RoleName[this.currentUser.role];
        }
    }
}
</script>