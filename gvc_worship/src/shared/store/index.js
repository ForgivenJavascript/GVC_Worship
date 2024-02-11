import { createStore } from 'vuex';

export default createStore({
    state: {
        currentUser: null,
        serverUserInfo: null
    },
    getters: {
        getCurrentUser: state => {
            return state.currentUser;
        },
        getServerUserInfo: state => {
            return state.serverUserInfo;
        }
    },
    mutations: {
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser;
        },
        setServerUserInfo(state, userInfo) {
            state.serverUserInfo = userInfo;
        }
    }
});