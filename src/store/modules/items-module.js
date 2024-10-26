import { CandidateService } from "@/services/candidateService";
import { ElectionService } from "@/services/election-service";

const electionService = new ElectionService();
const candidateService = new CandidateService();

export const itemsModule = {
    state: () => ({
        items: [],
    }),
    mutations: {
        SET_ITEMS(state, items) {
            state.items = items;
        },
    },
    getters: {
        items: (state) => state.items
    },
    actions: {
        loadItems({ commit }, paramEntity) {
            
            function handleSuccess(commit, success) {
                commit('SET_ITEMS', success.data);
            }

            switch (paramEntity) {
                case 'candidates':
                    candidateService.loadCandidates()
                    .then((success) => handleSuccess(commit, success))
                    .catch((error) => console.error(error));
                    break;
                case 'elections':
                    electionService.loadElections()
                    .then((success) => handleSuccess(commit, success))
                    .catch((error) => console.error(error));
                    break;
                default:
                    commit('SET_ITEMS', []);
                    break;
            }
        },
        deleteItem({ commit }, paramObject) {
            switch (paramObject.entity) {
                case 'candidates':
                    console.log('Delete candidate.');
                    candidateService.deleteCandidate(paramObject.id)
                    .then((success) => this.dispatch('loadItems', paramObject.entity))
                    .catch((error) => console.error(error));
                    break;
                case 'elections':
                    console.log('Delete election.');
                    electionService.deleteElection(paramObject.id)
                    .then((success) => this.dispatch('loadItems', paramObject.entity))
                    .catch((error) => console.error(error));
                    break;
                default:
                    break;
            }
        }
    }
};