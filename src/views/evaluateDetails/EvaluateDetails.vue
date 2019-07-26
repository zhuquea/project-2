<template>
  <div class="evaluate__details__body">
    <div class="evaluate__details__first">
      <div class="first__return" @click="evaluate__detailsReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__evaluate__details">
        评价详情
      </div>
    </div>
    <div class="evaluate__details__second">
      <div class="second__left">
        <img :src="authorData.avatar" alt="" class="second__author__img" />
        <div>
          <div class="user__Data__Evaluate">
            {{ userDataEvaluate }}
          </div>
          <van-rate
            v-model="detailsData.rate"
            :size="sizeObj"
            color="#f44"
            void-icon="star"
            void-color="#eee"
            class="commodity__rate"
          ></van-rate>
        </div>
      </div>
      <div class="second__right">
        {{ detailsData.comment_time }}
      </div>
    </div>
    <div class="evaluate__details__third">
      评价内容：{{ detailsData.content }}
    </div>
    <div class="evaluate__details__fourth" v-if="detailsData.goods">
      <div class="fourth__left">
        <img
          :src="detailsData.goods[0].image"
          alt=""
          class="fourth__goods__img"
        />
        <div class="fourth__left__div">
          {{ detailsData.goods[0].name }}
        </div>
      </div>
      <div class="fourth__right" @click="add__shoppingCart">
        <van-icon
          name="shopping-cart"
          size="20px"
          color="red"
          class="fourth__right__icon"
        ></van-icon>
      </div>
    </div>
    <div class="evaluate__details__fifth">
      <van-button
        type="primary"
        size="large"
        class="fifth__return"
        @click="evaluate__detailsReturn"
        >返回</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluateDatils",
  components: {},
  props: {},
  data() {
    return {
      detailsData: [],
      sizeObj: 25,
      valueCommodity: 0,
      userDataEvaluate: {}
    };
  },
  methods: {
    evaluate__detailsReturn() {
      this.$router.push({ name: "evaluation" });
    },
    add__shoppingCart() {},
    evaluateOneData() {
      this.$axios
        .req("api/evaluateOne", { _id: this.detailsData._id })
        .then(response => {
          if (response.code === 200) {
            this.userDataEvaluate = response.evaluateOne.user[0].nickname;
            console.log(this.userDataEvaluate);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.detailsData = this.$route.query.details;
    this.evaluateOneData();
    console.log(this.detailsData);
  },
  created() {},
  filters: {},
  computed: {
    authorData() {
      return this.$store.state.user;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.evaluate__details__body {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.evaluate__details__first {
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
.first__evaluate__details {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.evaluate__details__second {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
}
.second__left {
  display: flex;
  align-items: center;
}
.second__author__img {
  height: 100px;
}
.second__right {
  font-size: 25px;
}
.evaluate__details__third {
  font-size: 30px;
  line-height: 50px;
  margin-left: 20px;
}
.evaluate__details__fourth {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.fourth__left {
  display: flex;
}
.fourth__goods__img {
  height: 200px;
}
.fourth__left__div {
  font-size: 28px;
}
.fourth__right {
  width: 60px;
  height: 60px;
  background-color: #7d7e80;
  border-radius: 50%;
  text-align: center;
}
.fourth__right__icon {
  transform: translateY(25%);
}
.evaluate__details__fifth {
  width: 100vw;
  text-align: center;
  position: absolute;
  bottom: 10px;
}
.fifth__return {
  width: 94vw;
}
.van-button--large {
  height: 80px !important;
}
.van-button {
  font-size: 30px;
}
.user__Data__Evaluate {
  font-size: 30px;
}
</style>
