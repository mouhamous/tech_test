const url = 'https://api.github.com/'

import axios from 'axios'
const repos = {
    getList: () => {
        return axios.get(`${url}repositories`).then((response) => {
            //console.log(response)
            return response.data
        })
    },

    search: (term) => {

    },

    //get language of repositories
    getLanguage(language_url) {

        return axios.get(`${language_url}`).then((response) => {
            return response.data
        })
    }

}

export default repos