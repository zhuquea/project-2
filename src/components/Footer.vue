<template>
  <div class="Footer__body">
    <van-row type="flex" justify="space-around" class="footer__obj">
      <van-col
        span="4"
        align="center"
        v-for="(item, index) in footerdata"
        :key="index"
      >
        <div
          class="footer__item"
          :class="{ footer__item2: tabnum === index }"
          @click="switchclass(item, index)"
        >
          <van-icon :name="item.name" size="25px" />
          <div>{{ item.content }}</div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  props: {},
  data() {
    return {
      footerdata: [
        {
          name: "wap-home",
          content: "商城"
        },
        {
          name: "wap-nav",
          content: "分类"
        },
        {
          name: "shopping-cart",
          content: "购物车"
        },
        {
          name: "user-o",
          content: "我的"
        }
      ],
      tabnum: 0
    };
  },
  methods: {
    switchclass(item, index) {
      this.tabnum = index;
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Footer__body {
  position: fixed;
  bottom: 20px;
  z-index: 10000;
  width: 100%;
}
.footer__obj {
  font-size: 30px;
}
.footer__item {
  text-align: center;
}
.footer__item2 {
  color: orange;
}
</style>
