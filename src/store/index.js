import { createStore } from "vuex";
import { authModule } from "./modules/auth-module.js"
import { voterRegisterModule } from "./modules/voterRegister-module.js";
import { elections } from "./modules/elections.js";
import { candidates } from "./modules/candidates.js";
import { participatingCandidates } from "./modules/participating_candidates.js";

export const store = createStore({
    modules : {
        authModule,
        voterRegisterModule,
        elections,
        candidates,
        participatingCandidates
    }
});