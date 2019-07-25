<template>
  <div class="recent__browsing__body">
    <div class="recent__browsing__first">
      <div class="first__return" @click="recent__browsingReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__recent__browsing">
        最近浏览
      </div>
    </div>
      <div class="recent__browsing__second">
          <div v-for="(item,index) in recentBrowsingData" :key="index" class="browsing__second__item">
              <img :src="item.image" alt="" class="browsing__second__img">
              <div>
                  <div class="second__item__name">
                      {{item.name}}
                  </div>
                  <div class="second__item__price">
                      ￥{{item.present_price}}
                  </div>
              </div>
              <div class="second__item__delete" @click="deleteRecent__browsing(item,index)">
                  ×
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "RecentBrowsing",
  components: {},
  props: {},
  data() {
    return {
        recentBrowsingData: []
    };
  },
  methods: {
    recent__browsingReturn() {
      this.$router.push({ name: "membership" });
    },
      deleteRecent__browsing(item,index) {
       this.recentBrowsingData.splice(index,1)
          localStorage.setItem("recentBrowsingData",JSON.stringify(this.recentBrowsingData))
      }
  },
  mounted() {
      if (localStorage.getItem("recentBrowsingData")) {
          this.recentBrowsingData = JSON.parse(localStorage.getItem("recentBrowsingData"))
          console.log(this.recentBrowsingData);
      }
  },
  created() {},
  filters: {},
  computed: {
      // recentBrowsingData() {
      //     return this.$store.state.recentBrowsingData
      // }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.recent__browsing__body {
  width: 100vw;
}
.recent__browsing__first {
  width: 100vw;
  line-height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
}
.first__return {
  width: 5vw;
  text-align: center;
  display: flex;
  align-items: center;
}
.first__recent__browsing {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.recent__browsing__second {
    width: 100vw;
}
.browsing__second__item {
   display: flex;
    position: relative;
}
    .browsing__second__img {
        height: 200px;
    }
    .second__item__name {
        font-size: 30px;
        margin-top: 10px;
    }
    .second__item__price {
        font-size: 30px;
        color: #e0322b;
        margin-top: 50px;
    }
    .second__item__delete {
        width: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 30px;
        border: 1px solid dimgrey;
        border-radius: 50%;
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
</style>
