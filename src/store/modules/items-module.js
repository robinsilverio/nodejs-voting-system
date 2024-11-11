import { CandidateService } from "@/services/candidateService";
import { ElectionService } from "@/services/election-service";
import { ParticipatingCandidateService } from "@/services/participating-candidate-service";

const electionService = new ElectionService();
const candidateService = new CandidateService();
const participatingCandidateService = new ParticipatingCandidateService();

export const itemsModule = {
    state: () => ({
        items: [],
        elections: [],
        electionsPerParticipatingCandidate: [],
        entityServices: {
            'CANDIDATE': candidateService,
            'ELECTION': electionService,
            'PARTICIPATING_ELECTIONS_PER_CANDIDATE': participatingCandidateService
        }
    }),
    mutations: {
        SET_ITEMS(state, items) {
            state.items = items;
        },
        SET_ELECTIONS(state, paramElections) {
            state.elections = paramElections;
        },
        SET_ELECTIONS_PER_PARTICIPATING_CANDIDATE(state, paramElections) {
            state.electionsPerParticipatingCandidate = paramElections;
        }
    },
    getters: {
        items: (state) => state.items,
        entityServices: (state) => state.entityServices,
        getParticipatingCandidateService: (state) => {
            return state.entityServices['PARTICIPATING_ELECTIONS_PER_CANDIDATE'];
        },
        getElections: (state) => {
            return state.elections.map(election => ({
                id: election.id,
                label: election.election_name
            }));
        },
        getElectionsPerParticipatingCandidate: (state) => {
            return state.electionsPerParticipatingCandidate.map(election => ({
                id: election.id,
                label: election.election_name
            }));
        }
    },
    actions: {
        loadItems({ commit }, paramObj) {
            
            function handleSuccess(commit, paramFunctionToBeCalled, success) {
                commit(paramFunctionToBeCalled, success.data);
            }

            this.getters.entityServices[paramObj.entity.toUpperCase()].load()
            .then((success) => {
                handleSuccess(commit, paramObj.functionToBeCalled, success)
            })
            .catch((error) => console.error(error));

        },
        loadParticipatingElectionsPerCandidate({ commit }, paramObj) {
            this.getters.getParticipatingCandidateService.load(paramObj.candidate.id)
            .then((success) => {
                commit('SET_ELECTIONS_PER_PARTICIPATING_CANDIDATE', success.data);
            })
            .catch((error) => console.error(error));
        },
        determineFormMutation({ commit, dispatch }, paramObject) {

            const entityService = this.getters.entityServices[paramObject.entity.toUpperCase()];

            const actions = {
                "CREATE": (paramObject) => entityService.create(paramObject.data),
                "UPDATE": (paramObject) => entityService.update(paramObject.data)
            };

            return actions[paramObject.crudFunction](paramObject)
                .then(response => {
                    dispatch('loadItems', { functionToBeCalled: 'SET_ITEMS', entity: paramObject.entity });
                    return response;
                })
                .catch(error => {
                    console.error('Action failed:', error);
                    throw error;
                });
        },
        deleteItem({ commit, dispatch }, paramObject) {
            const entityService = this.getters.entityServices[paramObject.entity.toUpperCase()];
            entityService.delete(paramObject.id)
            .then(() => dispatch('loadItems', { functionToBeCalled: 'SET_ITEMS', entity: paramObject.entity }))
            .catch(error => console.error('Action failed:', error));
        }
    }
};