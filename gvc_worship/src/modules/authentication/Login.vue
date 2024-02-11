<template>
    <Loader :loading="loading"/>
    <div class="login-page">
        <div class="blue-top-background"/>
        <div class="login-title">GVC Worship</div>
        <div class="login-sub-title">글로벌 비전교회</div>
        <br/>
        <div class="login-form">
            <div class="login-input">
                <div class="login-input-title">
                    이메일 Email
                </div>
                <InputText class="login-input-field" type="text" v-model="email"/>
                <div class="login-input-title">
                    비밀번호 Password
                </div>
                <Password class="login-input-field" inputClass="login-input-field" v-model="password" :feedback="false" toggleMask/>
                <div class="login-forgot-password-button" @click="goResetPassword">비밀번호 되찾기 Forgot Password</div>
            </div>
            <div class="login-buttons">
                <Button class="orange-button" label="Log in" @click="login"/>
                <Button class="blue-button" label="Register" @click="goRegister" />
            </div>
        </div>
        <br/>
        <img src="@/assets/logo-LGVC.png" class="login-logo"/>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { AuthService } from '../../apis';

export default {
    name: 'Login',
    components: {
        InputText,
        Button,
        Password
    },
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        goRegister() {
            this.$router.push('/register');
        },
        async login() {
            try {
                await AuthService.login(this.email, this.password);
                this.$router.push('/journals');
            } catch (err) {
                console.log(err.code);
                switch (err.code) {
                    case 'auth/invalid-email':
                        alert("email is invalid");
                        break;
                    case 'auth/wrong-password':
                        alert("password is wrong");
                        break;
                    case 'auth/user-not-found':
                        alert("User is not found");
                        break;
                    default:
                        alert("There was error in logging in");
                        break;
                }
            }
        }
    }

}
</script>