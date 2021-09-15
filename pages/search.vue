<template>
    <div>
      <div>Results</div>
      <div class="pt">
        <NuxtLink :to="{name: 'index'}">
          <button >Go back</button>
        </NuxtLink>
      </div>
      
      <div class="pt">
        <div v-for="item in results" :key="item.id">
            <div >
              - <a :href="item.html_url">  {{ item.full_name }}</a> :<span v-if="lines(item.id)">lines {{lines(item.id).lines > 0 ? lines(item.id).lines : 0}} </span> 
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
      //getItems:'repos/getItems',
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
    this.search()
  }
}
</script>

<style scoped>
.pt{
  padding-top: 1em;
}
</style>