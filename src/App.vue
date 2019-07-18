<template>
  <div id="app">
    <router-view />
    <Footer v-if="$route.meta.showFooter" :tabnum1="tabnum1"></Footer>
  </div>
</template>
<script>
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Footer
  },
  data() {
    return {
      tabnum1: 0
    };
  },
  watch: {
    $route (to) {
      console.log(to)
      if (to.path === "/classification") {
        this.tabnum1 = Math.random()
      }
    }
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
@import "./style/common";
</style>
