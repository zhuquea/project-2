<template>
  <div id="app">
    <router-view />
    <Footer v-if="$route.meta.showFooter"></Footer>
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
    return {};
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
