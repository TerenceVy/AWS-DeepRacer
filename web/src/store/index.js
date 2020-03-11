import Vue from 'vue'
import Vuex from 'vuex'

// modules
import GameModule from './modules/game';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        GameModule
    }
});
