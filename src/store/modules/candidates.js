import { CandidateService } from "@/services/candidateService";

export const candidates = {
    state: () => ({
        candidates: [],
        candidateService: new CandidateService()
    }),
    mutations: {
        SET_CANDIDATES(state, paramCandidates) {
            state.candidates = paramCandidates;
        }
    },
    getters: {
        getCandidates: (state) => state.candidates
    },
    actions: {
        loadCandidates({ commit, state }) {
            state.candidateService.load()
            .then((success) => {
                commit('SET_CANDIDATES', success.data);
            })
            .catch((error) => console.error(error));
        },
        determineCandidateMutation({ state, dispatch }, paramObj) {

            const actions = {
                "CREATE": (paramData) => state.candidateService.create(paramData),
                "UPDATE": (paramData) => state.candidateService.update(paramData)
            };

            return actions[paramObj.crudFunction](paramObj.data)
                .then(response => {
                    dispatch('loadCandidates')
                    return response;
                })
                .catch(error => {
                    console.error('Action failed:', error);
                    throw error;
                });
        },
        deleteCandidate({ state, dispatch }, paramObject) {
            state.candidateService.delete(paramObject.id)
            .then(() => dispatch('loadCandidates'))
            .catch(error => console.error('Action failed:', error));
        }
    }
};