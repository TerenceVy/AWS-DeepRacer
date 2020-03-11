import BaseService from '../../services/base';
import SubbaseService from '../../services/sub/base';

const GameService = new BaseService('games');
const RunService = new SubbaseService('games', 'runs');

export default {
    state: {
        games: [],
        runs: {},
        ranking: {}
    },
    
    mutations: {
        "SET_GAMES"(state, result) {
            state.games = result.entities;
        },
        "SET_RUNS"(state, result) {
            this._vm.$set(state.runs, result.id, result.entities);
        },
        "SET_RANKING"(state, result) {
            this._vm.$set(state.ranking, result.modelId, result.entities);
        }
    },
    
    actions: {
        getGames({ commit }) {
            return new Promise((resolve, reject) => {
                GameService.getAll((error, response) => {
                    if (error) return reject(error.data);
                    
                    commit('SET_GAMES', response.result);
                    resolve();
                });
            });
        },
        getRuns({ commit }, id) {
            return new Promise((resolve, reject) => {
                RunService.getAll(id, (error, response) => {
                    if (error) return reject(error.data);
                    
                    response.result.id = id;
                    commit('SET_RUNS', response.result);
                    resolve();
                });
            });
        },
        addRun({ commit }, data) {
            return new Promise((resolve, reject) => {
                RunService.create(data.id, { name: data.name }, (error, response) => {
                    if (error) return reject(error.data);
                
                    resolve(response.result);
                });
            });
        },
        getRanking({ commit }, data) {
            return new Promise((resolve, reject) => {
                RunService.getRanking(data.id, data.modelId, (error, response) => {
                    if (error) return reject(error.data);
        
                    response.result.id = data.id;
                    response.result.modelId = data.modelId;
                    response.result.entities.sort((a, b) => a.time < b.time ? -1 : 1);
                    commit('SET_RANKING', response.result);
                    resolve();
                });
            });
        },
        addRanking({ commit }, data) {
            return new Promise((resolve, reject) => {
                RunService.addRanking(data.id, data.modelId, [{ name: data.name, time: data.time }], (error, response) => {
                    if (error) return reject(error.data);
                
                    resolve(response.result);
                });
            });
        },
    },
    
    getters: {
        games: state => {
            return state.games;
        },
        runs: state => {
            return state.runs;
        },
        ranking: state => {
            return state.ranking
        }
    }
}
