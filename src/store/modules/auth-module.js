import { LoginService } from "@/services/login-service";
import { router } from "../../../router.js";

const loginServiceInstance = new LoginService();

export const authModule = {
    state : () => ({
        isAuthenticated: !!sessionStorage.getItem('authToken'), // Rehydrate from sessionStorage
        user: { username: null, role: sessionStorage.getItem('userRole') || null }, // Get role from sessionStorage
        token: sessionStorage.getItem('authToken') || null,
        invalidLogin: false
    }),
    mutations : {
        setAuthstate(state, payload) {
            state.isAuthenticated = payload.isAuthenticated;
            state.user.username = payload.user.username
            state.user.role = payload.user.role;
            state.token = payload.token;

            sessionStorage.setItem('authToken', payload.token);
            sessionStorage.setItem('userRole', state.user.role);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = { username: null, role : null };
            state.token = null;
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userRole');
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        userRole(state) {
            return state.user.role; // Get user role for access control
        }
    },
    actions: {
        login({ commit }, paramUser) {
            return loginServiceInstance.login(paramUser)
                .then(success => {
                    commit(
                        'setAuthstate', {
                            isAuthenticated: true,
                            token: success.data.loginDetails.token,
                            user: {username: success.data.loginDetails.user.username, role: 'ADMIN'}
                        }
                    );
                    router.push('/dashboard');
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