<template>
  <v-layout row wrap align-content-start>
    <v-flex xs6>
        <v-text-field mb-3 solo append-icon="search" v-model="searchText" @change="updateResults"></v-text-field>
    </v-flex>
    <v-flex xs12>
        <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            class="elevation-1"
        >
            <template v-for="item in items">
                <td :key="item.id" >{{ item.name }}</td>
                <td :key="item.id" class="text-xs-right">{{ item.description }}</td>
                <td :key="item.id" class="text-xs-right">{{ item.dateAdded }}</td>
            </template>
        </v-data-table>

    </v-flex>    
  </v-layout>
</template>





<script>
import SchemaService from '../services/schema.service'

export default {
  mixins: [SchemaService],
  props: ['id'],
  data() {
    return {        
        searchText: null,
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Description', value: 'description' },
            { text: 'Date added', value: 'dateAdded' }
        ],
        items: []
    }
  },
  methods: {
      updateResults() {
        this.items.push({
            name: 'diego',
            description: 'lalala',
            dateAdded: '2018-02-01 12:35:26.843'
        });
      }
  }
}
</script>