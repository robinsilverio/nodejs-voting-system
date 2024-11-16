import { ElectionService } from "@/services/election-service";

export const elections = {
    state: () => ({
        elections: [],
        electionService: new ElectionService()
    }),
    getters: {
        getElections: state => state.elections,
        getElectionOptions(state) {
            return state.elections.map(election => {
                return {
                    id: election.id,
                    label: election.election_name,
                }
            });
        }
    },
    mutations: {
        SET_ELECTIONS(state, paramElections) {
            state.elections = paramElections;
        }
    },
    actions: {
        loadElections({ commit, state }) {
            state.electionService.load()
            .then((success) => {
                commit('SET_ELECTIONS', success.data);
            }).catch((error) => console.log(error));
        },
        determineElectionMutation({ commit, dispatch, state }, paramObj) {
            const actions = {
                'CREATE': (paramData) => state.electionService.create(paramData),
                'UPDATE': (paramData) => state.electionService.update(paramData)
            };
            
            return actions[paramObj.crudFunction](paramObj.data)
                .then(response => {
                    dispatch('loadElections');
                    return response;
                })
                .catch(error => {
                    console.error('Action failed:', error);
                    throw error;
                });
        },
        deleteElection({ dispatch, state }, paramObject) {
            state.electionService.delete(paramObject.id)
            .then(() => dispatch('loadElections'))
            .catch(error => console.error('Action failed:', error));
        }
    }
}