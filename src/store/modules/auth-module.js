import { AuthService } from "@/services/auth-service";

const authServiceInstance = new AuthService();

export const authModule = {
    state : () => ({
        user : { username: null, isLoggedIn : false, role : null }    
    }),
    mutations : {
        logIn(state, paramUser) {
            authServiceInstance.logIn(paramUser)
            .then(success => {
                state.user = success.data;
            }).catch(err => console.log(err));
        },
        logOut(state) {
            state.user = null;
        }
    },
    actions: {
        logIn({ commit }, paramUser) {
            console.log('Performing login');
            commit('logIn', paramUser);
        },
        logOut({ commit }) {
            commit('logOut');
        }
    },
}