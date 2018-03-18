import axios from '../../node_modules/axios/dist/axios'

const instance = {
  data() {
    return {
      resources: []
    }
  },
  created: function () {
    if (this.$data.resources.length == 0) {
      axios.get('http://localhost:3001/api/').then((result) => {
        this.$data.resources = result.data;
        console.log(this.$data);
      });
    }
  },
}

export default instance;