// Api
import repos from '../api/index';

const getDefaultState = () => {
    return {
        items: [],
        lines: [],
        languages: []
    }
}

const state = () => ({
    items: [],
    lines: [],
    languages: []

});

const getters = {
    getItems: (state, getters, rootState) => {
        return state.items
    },
    getLines: (state, getters, rootState) => {
        return state.lines
    },
    getLanguages: (state, getters, rootState) => {
        return state.languages
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
                    let payload_lines = { 'id': result[item].id, 'lines': lines }
                    commit('setLines', payload_lines)

                    const languages = await repos.getLanguage(result[item].languages_url)
                    let payload_languages = { 'id': result[item].id, 'languages': languages }
                        //console.log(languages)
                    commit('setLanguages', payload_languages)

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
        sessionStorage.setItem('repos', JSON.stringify(data));

    },
    setLines(state, payload) {
        //state.items[payload.item]['lines'] = payload.lines
        //let d = {}
        //d[payload.id] = payload.lines
        state.lines.push(payload)
    },

    setLanguages(state, payload) {
        state.languages.push(payload)
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