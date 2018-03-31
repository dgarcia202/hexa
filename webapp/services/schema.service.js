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
  methods:{
    getSchemaById: id => {
      let filtered = this.resources.filtered(x => x.id == id);
      return filtered.length > 0 ? filtered[0] : null;
    }
  }
}

export default instance;