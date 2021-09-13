<template>
  <div>
    <div>Home</div>
    <div>{{items}}</div>
  </div>
</template>

<script>

//import repos from '../api/index';

import { mapGetters } from 'vuex'


export default {

  computed:{
    ...mapGetters({
      getItems:'repos/getItems'
    }),
    items(){
      return this.getItems
    }
  },

  methods:{
   

  },

  mounted(){
      this.$store.dispatch("repos/loadBackendData")

  }

}
</script>
