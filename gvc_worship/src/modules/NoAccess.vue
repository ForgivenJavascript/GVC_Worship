<template>
    <div>
    권한이 없습니다.
    <Button label="Log out" @click="logout" />
    </div>
</template>

<script>
import Button from 'primevue/button';
import { AuthService } from '@/apis';

export default {
    name: 'NoAccess',
    components: {
        Button
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
    }
}
</script>