import { ParticipatingCandidateService } from "@/services/participating-candidate-service";

export const participatingCandidates = {
    state: () => ({
        electionsPerParticipatingCandidate: [],
        participatingCandidateService: new ParticipatingCandidateService()
    }),
    mutations: {
        SET_ELECTIONS_PER_PARTICIPATING_CANDIDATE(state, paramElections) {
            state.electionsPerParticipatingCandidate = paramElections;
        }
    },
    getters: {
        getElectionsPerParticipatingCandidate: (state) => {
            return state.electionsPerParticipatingCandidate.map(election => ({
                id: election.id,
                label: election.election_name
            }));
        }
    },
    actions: {
        loadParticipatingElectionsPerCandidate({ state, commit }, paramObj) {
            state.participatingCandidateService.load(paramObj.candidate.id)
            .then((success) => {
                commit('SET_ELECTIONS_PER_PARTICIPATING_CANDIDATE', success.data);
            })
            .catch((error) => console.error(error));
        }
    }
};