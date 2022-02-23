<template>
  <div id="app">
    <v-header/>
    <v-body/>
    <v-footer/>
  </div>
</template>

<script>
import VBody from './components/v-body.vue'
import VFooter from './components/v-footer.vue'
import VHeader from './components/v-header.vue'

export default {
  name: 'App', 

  data(){
        return{
        }
  },

  props:{},
  components: {
    VBody,
    VFooter,
    VHeader
  },
  methods:{},
  
}
</script>

