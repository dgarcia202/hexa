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
      });
    }
  },
  methods:{
    getSchemaById: id => {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/api/').then((result) => {
          let filtered = result.data.filter(x => x.id == id);
          resolve(filtered.length > 0 ? filtered[0] : null);
        });        
      });
    }
  }
}

export default instance;