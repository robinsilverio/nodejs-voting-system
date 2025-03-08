import { ParticipatingCandidateService } from "@/services/participating-candidate-service";

export const participatingCandidates = {
    state: () => ({
        participatingCandidatesPerElection: [],
        electionsPerParticipatingCandidate: [],
        participatingCandidateService: new ParticipatingCandidateService()
    }),
    mutations: {
        SET_PARTICIPATING_CANDIDATES_PER_ELECTION(state, paramCandidates) {
            state.participatingCandidatesPerElection = paramCandidates;
        },
        SET_ELECTIONS_PER_PARTICIPATING_CANDIDATE(state, paramElections) {
            state.electionsPerParticipatingCandidate = paramElections;
        }
    },
    getters: {
        getParticipatingCandidatesPerElection: (state) => {
            return state.participatingCandidatesPerElection;
        },
        getElectionsPerParticipatingCandidate: (state) => {
            return state.electionsPerParticipatingCandidate.map(election => ({
                id: election.id,
                label: election.election_name
            }));
        }
    },
    actions: {
        loadCandidatesByParticipatingElection({ commit, state }, paramElectionId) {
            state.participatingCandidateService.loadCandidatesByParticpatingElection(paramElectionId)
            .then((success) => {
                commit('SET_PARTICIPATING_CANDIDATES_PER_ELECTION', success.data);
            }).catch((error) => console.error(error));
        },
        loadParticipatingElectionsPerCandidate({ state, commit }, paramObj) {
            state.participatingCandidateService.load(paramObj.candidate.id)
            .then((success) => {
                commit('SET_ELECTIONS_PER_PARTICIPATING_CANDIDATE', success.data);
            })
            .catch((error) => console.error(error));
        }
    }
};