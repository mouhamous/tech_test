// Api
import repos from '../api/index';

const getDefaultState = () => {
    return {
        items: [],
    }
}

const state = () => ({
    items: []
});

const getters = {
    getItems: (state, getters, rootState) => {
        return state.items
    },


};

const actions = {
    async loadBackendData({ commit, state }) {
        try {
            const result = await repos.getList();

            if (result) {
                commit('setBackend', result);
                return result;
            } else {
                throw result;
            }
        } catch (error) {

        }
    },




};

const mutations = {
    setBackend(state, data) {
        state.items = data;
    },


    resetState(state) {
        Object.assign(state, getDefaultState())
    },

    clearItems(state) {
        state.items = [];
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};