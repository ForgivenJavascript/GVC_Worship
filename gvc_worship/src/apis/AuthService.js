import store from "@/shared/store";
import { auth, firebaseApp } from "../firebase/init";
import { BaseService, UserService } from './';

class AuthService extends BaseService {
    constructor() {
        super("users");
    }

    async login(email, password) {
        const user = await auth.signInWithEmailAndPassword(email, password);
        store.commit('setCurrentUser', user.user);
        const serverUserInfo = await UserService.getById(user.user.uid);
        store.commit('setServerUserInfo', serverUserInfo);
        await UserService.update(user.user.uid, {last_logged_in: new Date()});
    }

    async logout() {
        await auth.signOut();
        store.commit('setCurrentUser', null);
    }

    async register(email, password) {
        return await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
    }

    getCurrentUser() {
        return store.getters.getCurrentUser;
    }

    async forgetPassword(email) {

    }
}
export default new AuthService();