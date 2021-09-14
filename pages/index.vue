<template>
  <div>
    <div>Home</div>
    

    <div>
      <input v-model="query" type="text">
      <button @click="search">search</button>
    </div>
    <div v-for="item in getItems" :key="item.id">
      <!-- lines number section -->

      <div>
        - <a :href="item.html_url">  {{ item.full_name }}</a> : <span v-if="lines(item.id)">lines {{lines(item.id).lines > 0 ? lines(item.id).lines : 0}} </span> 
      </div>
      
      <!-- Languages section -->
      <div>
        <p>
          Languages: <span v-if="languages(item.id)">
            <em v-for="(value, key) in languages(item.id).languages" :key="key" >{{ key }},</em>
          </span>
        </p> 
      </div>
    </div>
  </div>
</template>

<script>

import repos from '../api/index';

import { mapGetters } from 'vuex'


export default {

  data:()=>({
    query:"",
  }),

  computed:{
    ...mapGetters({
      getItems:'repos/getItems',
      getLines: 'repos/getLines',
      getLanguage: 'repos/getLanguages'
    }),
  },
    

  methods:{
    search(query){
      this.$router.push({name: 'search', query: {q: this.query}});
    },
    lines(item_id){
      let data = this.getLines.find( ({ id }) => id === item_id )
      return data
    },

    languages(item_id){
      let data = this.getLanguage.find( ({ id }) => id === item_id )
      return data
    }
  },

  mounted(){
      this.$store.dispatch("repos/loadBackendData")
  },
 

  
}
</script>
