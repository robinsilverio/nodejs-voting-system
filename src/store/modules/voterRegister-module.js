import { VoterRegisterService } from "@/services/voterRegister-service";
import { router } from "../../../router.js";

const voterRegisterService = new VoterRegisterService();

export const voterRegisterModule = {
    state: () => ({
        voter: !!sessionStorage.getItem('authToken')
    }),
    mutations: {
        setVoter(state, payload){
            sessionStorage.setItem('authToken', payload);
        }
    },
    getters: {

    },
    actions: {
        registerVoter({ commit }, payload) {
            return voterRegisterService.registerVoter(payload)
            .then((success) => {
                commit('setVoter', success.data);
                router.push('/voter-view');
            }).catch((error) => {
                throw new Error(error.response.data);
            });
        }
    }
}