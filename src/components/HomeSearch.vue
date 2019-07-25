<template>
  <div>
    <div class="hidden__search">
      <div v-if="historyData" class="search__history">
        搜索历史：
        <span class="search__history" v-if="historyData.length === 0">
          暂无搜索历史
        </span>
        <span v-for="(item,index) in historyData" :key="index" class="search__history" v-else @click="getHistory(item)">
          {{item}}
        </span>
      </div>
      <div
        v-for="(item, index) in searchData"
        :key="index"
        class="hidden__search__item"
        @click="jump__detailsObj(item)"
      >
        <div v-html="item.name"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  components: {},
  props: {
    searchData: {
      type: Array
    }
  },
  data() {
    return {
      historyData: [],
      valObj: ""
    };
  },
  methods: {
    jump__detailsObj(item) {
      this.$router.push({
        name: "details",
        query:{id: item.id}
      })
    },
    getHistory(item) {
      this.valObj = item
      this.$emit("getHistory", this.valObj)
    }
  },
  mounted() {
    this.historyData = JSON.parse(localStorage.getItem("searchHistory"))
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.hidden__search__item {
  text-indent: 2em;
  line-height: 70px;
  font-size: 30px;
}

  .search__history {
    font-size: 30px;
  }
</style>
