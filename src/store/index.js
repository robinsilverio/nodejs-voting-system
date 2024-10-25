import { createStore } from "vuex";
import { authModule } from "./modules/auth-module.js"
import { voterRegisterModule } from "./modules/voterRegister-module.js";
import { itemsModule } from "./modules/items-module.js";

export const store = createStore({
    modules : {
        authModule,
        voterRegisterModule,
        itemsModule
    }
});