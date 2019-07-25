<template>
  <div id="app">
    <router-view />
    <Footer v-if="$route.meta.showFooter" :tabnum.sync="tabnum"></Footer>
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
      tabnum: 0
    };
  },
  mounted() {
    if (!localStorage.getItem("recentBrowsingData")) {
      let arr = [];
      localStorage.setItem("recentBrowsingData", JSON.stringify(arr));
    }
    if (!localStorage.getItem("searchHistory")) {
      let arr1 = [];
      localStorage.setItem("searchHistory", JSON.stringify(arr1));
    }
  },
  watch: {
    $route(to) {
      if (to.path === "/classification") {
        this.tabnum = 1;
      } else if (to.path === "/membership") {
        this.tabnum = 3;
      } else if (to.path === "/") {
        this.tabnum = 0;
      } else if (to.path === "/shoppingCart") {
        this.tabnum = 2;
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
.search-text {
  color: red;
}
@import "./style/common";
</style>
