<template>
    <main>
        <!-- 主體  -->
        <router-view  class="routerview"  :style="{width:this.$store.state.mywidth+'px',height:this.$store.state.myheight+'px'}"></router-view>
    </main>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
        return {
        }
   },
   methods: {
        displayWindowSize() {
            var self =this;
           // this.myheight =  window.innerHeight;
          //  this.mywidth  = (16/9) * this.myheight  ;
            self.$store.state.myheight  =  window.innerHeight;
            self.$store.state.mywidth   = (16/9) * window.innerHeight  ;
          }
  },
   mounted() {
    this.displayWindowSize();
  }
}
</script>

<style>
body{
    background: rgb(156, 156, 156);
}
#app {
    align-items: center;
    width: 100%;
    height: 42rem;
}
.routerview{
    margin: auto;
      box-shadow:  2px 2px 6px rgba(0, 0, 0, 0.5);
}
</style>
