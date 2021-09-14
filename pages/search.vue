<template>
    <div>
      <div>Results</div>

      <div>
          <div v-for="item in results" :key="item.id">
            - <a :href="item.html_url">  {{ item.full_name }}</a> : <span >lines  </span> 
          </div>
      </div>
    </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import repos from '../api'


export default {

  data:() =>({
    results: [],
  }),

  computed:{
    ...mapGetters({
      getItems:'repos/getItems',
      getLines: 'repos/getLines',
      getLanguage: 'repos/getLanguages'
    }),
  },

  methods:{
    search(){
      let word = this.$route.query.q
      var getItems = sessionStorage.getItem("repos");

      let items =JSON.parse(getItems)
      //console.log(items)
      let result = items.filter(repos => repos.full_name.includes(word))
      //console.log(result)
      this.results = result
    }

  },

  mounted(){
    this.search()
  }
}
</script>
