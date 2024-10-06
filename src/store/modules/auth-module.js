import { LoginService } from "@/services/login-service";

const loginServiceInstance = new LoginService();

export const authModule = {
    state : () => ({
        user : { username: null, isLoggedIn : false, role : null },
    }),
    mutations : {
        setUser(state, userData) {
            state.user = userData;
        }
    },
    getters: {
        
    },
    actions: {
        login({ commit }, paramUser) {
            return loginServiceInstance.login(paramUser)
                .then(success => {
                    console.log(success.data);
                    commit('setUser', success.data);  // Use mutations to update state
                })
                .catch(err => {
                    if (err.status === 401) {
                        throw new Error('Incorrect credentials. Please try again.');
                    } else {
                        throw new Error('Network Error: Could not reach the server.');
                    }
                });
        },
        logout({ commit }) {
            commit('logout');
        }
    },
}