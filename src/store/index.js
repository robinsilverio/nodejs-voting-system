import { createStore } from "vuex";
import { authModule } from "./modules/auth-module.js"

export const store = createStore({
    modules : {
        authModule
    }
});