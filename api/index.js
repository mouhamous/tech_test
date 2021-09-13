const url = 'https://api.github.com/'
import axios from 'axios'
const repos = {
    getList: () => {
        return axios.get(`${url}repositories`).then((response) => {
            console.log(response.data)
            return response.data
        })
    },

    search: (term) => {

    }

}

export default repos