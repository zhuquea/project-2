<template>
  <div id="app">
    <router-view />
    <div>
      <Footer></Footer>
    </div>
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
</style>
