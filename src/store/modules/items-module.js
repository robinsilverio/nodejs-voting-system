import { CandidateService } from "@/services/candidateService";
import { ElectionService } from "@/services/election-service";

const electionService = new ElectionService();
const candidateService = new CandidateService();

export const itemsModule = {
    state: () => ({
        items: [],
        relatedItems: [],
        entityServices: {
            'CANDIDATE': candidateService,
            'ELECTION': electionService
        }
    }),
    mutations: {
        SET_ITEMS(state, items) {
            state.items = items;
        },
        SET_RELATED_ITEMS(state, relatedItems) {
            state.relatedItems = relatedItems;
        }
    },
    getters: {
        items: (state) => state.items,
        entityServices: (state) => state.entityServices,
        getElections: (state) => {
            return state.relatedItems.map(election => ({
                value: election.id,
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
            .then(() => dispatch('loadItems', paramObject.entity))
            .catch(error => console.error('Action failed:', error));
        }
    }
};