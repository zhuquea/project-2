<template>
  <div class="Footer__body">
    <van-row type="flex" justify="space-around" class="footer__obj">
      <van-col span="4" align="center">
        <div
          class="footer__item"
          :class="{ footer__item2: tabnum === 0 }"
          @click="switchclass0"
        >
          <van-icon :name="footerdata[0].name" size="25px" />
          <div>{{ footerdata[0].content }}</div>
        </div>
      </van-col>
      <van-col span="4" align="center">
        <div
          class="footer__item"
          :class="{ footer__item2: tabnum === 1 }"
          @click="switchclass1"
        >
          <van-icon :name="footerdata[1].name" size="25px" />
          <div>{{ footerdata[1].content }}</div>
        </div>
      </van-col>
      <van-col span="4" align="center">
        <div
          class="footer__item"
          :class="{ footer__item2: tabnum === 2 }"
          @click="switchclass2"
        >
          <van-icon :name="footerdata[2].name" size="25px" />
          <div>{{ footerdata[2].content }}</div>
        </div>
      </van-col>
      <van-col span="4" align="center">
        <div
          class="footer__item"
          :class="{ footer__item2: tabnum === 3 }"
          @click="switchclass3"
        >
          <van-icon :name="footerdata[3].name" size="25px" />
          <div>{{ footerdata[3].content }}</div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  props: {
    tabnum: {
      type: Number
    },
  },
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
      ]
    };
  },
  methods: {
    switchclass0() {
      this.$emit('update:tabnum', 0)
      this.$router.push({ name: "home" });
    },
    switchclass1() {
      this.$emit('update:tabnum', 1)
      this.$router.push({
        name: "classification",
        query: { categroy: this.$store.state.category }
      });
      this.$store.state.fromFooter = true
    },
    switchclass2() {
      this.$emit('update:tabnum', 2)
      this.$router.push({name: "shoppingCart"})
    },
    switchclass3() {
      this.$emit('update:tabnum', 3)
      this.$router.push({ name: "membership" });
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
  bottom: 0px;
  z-index: 10000;
  width: 100%;
  background-color: white;
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
