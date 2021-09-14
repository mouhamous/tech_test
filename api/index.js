const url = 'https://api.github.com/'

const config = {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` }
};
import axios from 'axios'
const repos = {

    /* 
        function that allow to get 100 repositories from github API
    */
    getList: () => {
        return axios.get(`${url}repositories`, config).then((response) => {
            return response.data
        })
    },

    search: (term) => {

    },

    /* 
        function that get languages used in project
        take 1 parameter (language_url)
        language_url allow to get back from api all languages
    */
    getLanguage(language_url) {

        return axios.get(`${language_url}`, config).then((response) => {
            return response.data
        })
    },

    /* 
        function that count repositories lines
        take 1 parameter (full_name of project)
    */
    countLines(full_name) {
        return axios.get(`${url}repos/${full_name}/stats/code_frequency`, config)
            .then((response) => {
                let lines = response.data.reduce((total, changes) => total + changes[1] + changes[2], 0)
                return lines
            })

    }

}

export default repos