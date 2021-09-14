// Api
import repos from '../api/index';

const getDefaultState = () => {
    return {
        items: [],
        lines: []
    }
}

const state = () => ({
    items: [],
    lines: []
});

const getters = {
    getItems: (state, getters, rootState) => {
        return state.items
    },
    getLines: (state, getters, rootState) => {
        return state.lines
    },


};

const actions = {
    async loadBackendData({ commit, state }) {
        try {
            const result = await repos.getList()

            if (result) {
                commit('setData', result);
                for (const item in result) {

                    const lines = await repos.countLines(result[item].full_name)
                        //result[item]['lines'] = lines
                        //console.log(lines)
                        //let payload = { 'item': item, 'lines': lines }
                    let payload = { 'id': result[item].id, 'lines': lines }
                        //console.log(result[item])
                    commit('setLines', payload)
                }
                return result;
            } else {
                throw result;
            }
        } catch (error) {
            console.log(error)
        }
    },




};

const mutations = {
    setData(state, data) {
        state.items = data;
    },
    setLines(state, payload) {
        //state.items[payload.item]['lines'] = payload.lines
        //let d = {}
        //d[payload.id] = payload.lines
        state.lines.push(payload)
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