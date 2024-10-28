import { CandidateService } from "@/services/candidateService";
import { ElectionService } from "@/services/election-service";

const electionService = new ElectionService();
const candidateService = new CandidateService();

export const itemsModule = {
    state: () => ({
        items: [],
        entityServices: {
            'CANDIDATE': candidateService,
            'ELECTION': electionService
        }
    }),
    mutations: {
        SET_ITEMS(state, items) {
            state.items = items;
        },
    },
    getters: {
        items: (state) => state.items,
        entityServices: (state) => state.entityServices,
    },
    actions: {
        loadItems({ commit }, paramEntity) {
            
            function handleSuccess(commit, success) {
                commit('SET_ITEMS', success.data);
            }

            this.getters.entityServices[paramEntity.toUpperCase()].load()
            .then((success) => handleSuccess(commit, success))
            .catch((error) => console.error(error));

        },
        determineFormMutation({ commit, dispatch }, paramObject) {
    
            const entityService = this.getters.entityServices[paramObject.entity.toUpperCase()];

            const actions = {
                "CREATE": (paramObject) => entityService.create(paramObject.data),
                "UPDATE": (paramObject) => entityService.update(paramObject.data)
            };

            console.log(paramObject.crudFunction);
            
            return actions[paramObject.crudFunction](paramObject)
                .then(response => {
                    dispatch('loadItems', paramObject.entity);
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