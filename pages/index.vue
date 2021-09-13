<template>
  <div>
    <div>Home</div>

    <div>
      <input v-model="query" type="text">
      <button @click="search">search</button>
    </div>
    <div v-for="item in items" :key="item.id">
      <p>
        - <a :href="item.html_url">  {{ item.full_name }}</a> :
        lines {{ getLang(item.languages_url) }}
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
      getItems:'repos/getItems'
    }),
    items(){
      return this.getItems
    },

    
    
  },

  methods:{
    getLang(language_url){
      repos.getLanguage(language_url)
    },

    search(query){
      this.$router.push({name: 'search', query: {q: this.query}});
    }


  },

  mounted(){
      this.$store.dispatch("repos/loadBackendData")

  }

}
</script>
