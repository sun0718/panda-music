<template>
  <div id="app">
    <music-header/>
    <tab/>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MusicHeader from "@/components/music-header/MusicHeader"
import Tab from "@/components/tabs/tab"
import Player from '@/components/player/Player'
export default {
  name:'',
  components:{
    MusicHeader,Tab,Player
  }
}
</script>


<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
