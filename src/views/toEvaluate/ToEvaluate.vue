<template>
  <div class="to__evaluate__body">
    <div class="to__evaluate__first">
      <div class="first__return" @click="to__evaluateReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__to__evaluate">
        评价商品
      </div>
    </div>
    <div class="to__evaluate__second">
      <img :src="commodity.image_path" alt="" class="commodity__img" />
      <div class="commodity__div">
        商品评分
      </div>
      <van-rate
        v-model="valueCommodity"
        :size="sizeObj"
        color="#f44"
        void-icon="star"
        void-color="#eee"
        class="commodity__rate"
      ></van-rate>
    </div>
    <div class="to__evaluate__third">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="third__textarea"
        v-model="textareaStr"
        placeholder="说说你的购买感受吧~~"
      ></textarea>
    </div>
    <div class="to__evaluate__fourth">
      <van-switch v-model="checked" @change="is_Anonymous" />
      匿名评价
    </div>
    <div class="to__evaluate__last">
      <van-button type="primary" size="large" @click="submission"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "ToEvaluate",
  components: {},
  props: {},
  data() {
    return {
      commodity: {},
      valueCommodity: 0,
      sizeObj: 25,
      textareaStr: "",
      checked: false
    };
  },
  methods: {
    to__evaluateReturn() {
      this.$router.push({ name: "evaluation" });
    },
    submission() {
      axios
        .post("api/goodsOne/comment", {
          anonymous: this.checked,
          content: this.textareaStr,
          id: this.commodity.cid,
          image: [],
          order_id:this.commodity.order_id,
          rate: this.valueCommodity,
          _id: this.commodity._id
        })
        .then(response => {
          if (response) {
            Toast({
              message: "评价成功",
              type: "success",
              duration: 2000
            });
            this.$router.back()
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    is_Anonymous() {
      this.$store.state.isAnonymous = !this.$store.state.isAnonymous;
    }
  },
  mounted() {
    this.commodity = this.$route.query.commodity;
    console.log(this.commodity);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.to__evaluate__body {
  width: 100vw;
}
.to__evaluate__first {
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
.first__to__evaluate {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.to__evaluate__second {
  width: 100vw;
  display: flex;
  position: relative;
}
.commodity__img {
  height: 200px;
}
.commodity__div {
  font-size: 30px;
  margin-top: 20px;
}
.commodity__rate {
  position: absolute;
  left: 200px;
  bottom: 30px;
}
.to__evaluate__third {
  width: 100vw;
  text-align: center;
  font-size: 30px;
}
.third__textarea {
  width: 95vw;
}
.to__evaluate__last {
  width: 100vw;
  text-align: center;
}
.van-button--large {
  width: 94vw;
  height: 80px !important;
}
.van-button {
  font-size: 30px !important;
}
.to__evaluate__fourth {
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-left: 20px;
}
</style>
