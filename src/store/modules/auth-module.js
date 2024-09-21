import { LoginService } from "@/services/login-service";

const loginServiceInstance = new LoginService();

export const authModule = {
    state : () => ({
        user : { username: null, isLoggedIn : false, role : null },
        invalidLogin: false   
    }),
    mutations : {
        login(state, paramUser) {
            loginServiceInstance.login(paramUser)
            .then(success => {
                console.log(success.data);
                state.user = success.data;
            }).catch(err => {
                console.log(err);
                state.invalidLogin = true;
            });
        },
        logout(state) {
            state.user = null;
        }
    },
    getters: {
        isLoginInvalid(state) {
            return state.invalidLogin;
        }
    },
    actions: {
        login({ commit }, paramUser) {
            commit('login', paramUser);
        },
        logout({ commit }) {
            commit('logout');
        }
    },
}