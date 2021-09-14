const url = 'https://api.github.com/'

const config = {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` }
};
import axios from 'axios'
const repos = {
    getList: () => {
        return axios.get(`${url}repositories`, config).then((response) => {
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
    },

    countLines(full_name) {
        return axios.get(`${url}repos/${full_name}/stats/code_frequency`, config)
            .then((response) => {
                //console.log(response.data.reduce((total, changes) => total + changes[1] + changes[2], 0))
                let lines = response.data.reduce((total, changes) => total + changes[1] + changes[2], 0)
                return lines
            })

    }

}

export default repos