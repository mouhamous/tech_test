<template>
  <div>
    <div>Home</div>
    

    <div>
      <input v-model="query" type="text">
      <button @click="search">search</button>
    </div>
    <div v-for="item in getItems" :key="item.id">
      <p>
        - <a :href="item.html_url">  {{ item.full_name }}</a> : <span v-if="lines(item.id)">lines {{lines(item.id).lines > 0 ? lines(item.id).lines : 0}} </span> 
        <!-- lines {{ getLang(item.languages_url) }} -->
      </p>
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
      getLines: 'repos/getLines'
    }),
  },
    

  methods:{
    getLang(language_url){
       repos.getLanguage(language_url)
    },
  
    search(query){
      this.$router.push({name: 'search', query: {q: this.query}});
    },
    lines(item_id){
      let data = this.getLines.find( ({ id }) => id === item_id )
      return data
    }
  },

  mounted(){
      this.$store.dispatch("repos/loadBackendData")
  },
 

  
}
</script>
