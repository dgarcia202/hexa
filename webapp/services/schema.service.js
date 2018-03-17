import axios from '../../node_modules/axios/dist/axios'

export default {
  methods: {
    getAllDefinitions: () => {
      return axios.get('http://localhost:3001/api/'); 
    }
  }
}