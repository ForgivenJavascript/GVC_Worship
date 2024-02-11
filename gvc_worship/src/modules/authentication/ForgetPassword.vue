<template>
    <div class="login-page">
        <div class="blue-top-background"/>
        <div class="login-title">GVC Worship</div>
        <div class="login-sub-title">글로벌 비전교회</div>
        <br/>
        <div class="login-form" v-if="!emailSent">
            <div class="register-form-title">비밀번호 되찾기 Forgot Password</div>
            <div class="login-input">
                <div class="form-description">가입한 이메일 주소를 입력해주세요.</div>
                <div class="login-input-title">
                    이메일 Email
                </div>
                <InputText class="login-input-field" type="text" v-model="email"/>
            </div>
            <div class="login-buttons">
                <Button class="orange-button" :disabled="loader" label="Submit" @click="submit"/>
                <Button class="blue-button" :disabled="loader" label="Back to Log in" @click="goLogin" />
            </div>
        </div>
        <div class="login-form" v-else>
            <div class="register-form-title">비밀번호 되찾기 Forgot Password</div>
            <div class="login-input">
                <div class="form-description">입력한 이메일로 비밀번호 재설정 메일을 보냈습니다. 이메일을 확인해 주세요.</div>
                <br/>
                <div class="form-description-sub">*몇분이 지나도 이메일을 받지 못했다면 재전송을 위해 Resend 버튼을 눌러주세요. (이메일이 스팸함에 있을수도 있습니다.)</div>
            </div>
            <div class="login-buttons">
                <Button class="orange-button" :disabled="loader" label="Resend" @click="submit"/>
                <Button class="blue-button" :disabled="loader" label="Back to Log in" @click="goLogin" />
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
    name: 'forgetPassword',
    components: {
        InputText,
        Button,
        Password
    },
    data() {
        return {
            email: "",
            loader: false,
            emailSent: false
        }
    },
    methods: {
        submit() {
            this.loader = true;
            AuthService.forgetPassword(this.email.trim().toLowerCase()).then(() => {
                this.emailSent = true;
                this.loader = false;
            }).catch((err) => {
                switch (err.code) {
                    case 'auth/invalid-email':
                        alert('Email is invalid.');
                        break;
                    case 'auth/user-not-found':
                        alert('User with given Email doesn\'t exist');
                        break;
                    default:
                        if(this.email.length > 0)
                            alert('There was an error.')
                        else
                            alert('Please put your email.')
                }
                this.loader = false;
            });
        },
        goLogin() {
            this.$router.push('/login');
        },
    }

}
</script>