<template>
    <div class="login-page">
        <div class="blue-top-background"/>
        <div class="login-title">GVC Worship</div>
        <div class="login-sub-title">글로벌 비전교회</div>
        <br/>
        <div class="register-form">
            <div class="register-form-title">가입하기 Register</div>
            <div class="register-input">
                <div class="login-input-title">
                    이름 Name
                </div>
                <InputText class="login-input-field" type="text" v-model="name"/>
                <div class="login-input-title">
                    이메일 Email
                </div>
                <InputText class="login-input-field" type="text" v-model="email"/>
                <div class="login-input-title">
                    비밀번호 Password
                </div>
                <Password class="login-input-field" inputClass="login-input-field" v-model="password" :feedback="false" toggleMask/>
                <div class="login-input-title">
                    비밀번호 재입력 Password Confirmation
                </div>
                <Password class="login-input-field" inputClass="login-input-field" v-model="passwordConfirmation" :feedback="false" toggleMask/>
            </div>
            <div class="register-buttons">
                <Button class="orange-button" :disabled="loader" label="Register" @click="register"/>
                <Button class="blue-button" :disabled="loader" label="Back" @click="goLogin"/>
            </div>
            <br/>
            <img src="@/assets/logo-LGVC.png" class="register-logo"/>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { AuthService, UserService} from '../../apis';

export default {
    name: 'Register',
    components: {
        InputText,
        Button,
        Password
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            loader: false
        }
    },
    methods: {
        async register() {
            this.loader = true;
            if(this.password===this.passwordConfirmation) {
                await AuthService.register(this.email, this.password).then(async user => {
                    await UserService.addNewUser(user.user.uid, this.email, this.name);
                    alert("New user created, moving back to Login");
                    this.$router.push('/');
                }, err => {
                    console.log(err.code);
                    switch (err.code) {
                        case 'auth/invalid-email':
                            alert("email is invalid");
                            break;
                        case 'auth/email-already-in-use':
                            alert("email is already in use");
                            break;
                        default:
                            alert("there was error in creating account");
                            break;
                    }
                });
            } else {
                alert("password and confirmation doesn't match");
            }
            this.loader = false;
        },
        goLogin() {
            this.$router.push('/Login');
        }
    }

}
</script>