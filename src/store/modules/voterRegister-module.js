import { VoterRegisterService } from "@/services/voterRegister-service";
import axios from "axios";

const voterRegisterService = new VoterRegisterService();

export const voterRegisterModule = {
    state: () => ({
        voter: { id: null, token: null }
    }),
    mutations: {
        setVoter(state, payload){
            state.voter.id = payload.id;
            state.voter.token = payload.token;
            sessionStorage.setItem('voter',  JSON.stringify(state.voter));
        }
    },
    getters: {

    },
    actions: {
        registerVoter({ commit }, payload) {
            return voterRegisterService.registerVoter(payload)
            .then((success) => {
                commit('setVoter', success.data);
            }).catch((error) => {
                throw new Error(error.response.data);
            });
        }
    }
}