<template>
  <div class="evaluation__body">
    <div class="evaluation__first">
      <div class="first__return" @click="evaluationReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__evaluation">
        评价中心
      </div>
    </div>
    <div class="evaluation__second"></div>
    <div class="evaluation__third__Third">
      <div class="evaluation__third">
        <div
          class="third__left"
          :class="{ third__color: tabNumObj === 0 }"
          @click="switch__class1"
        >
          待评价
        </div>
        <div
          class="third__right"
          :class="{ third__color: tabNumObj === 1 }"
          @click="switch__class2"
        >
          已评价
        </div>
      </div>
    </div>
    <div class="evaluation__fourth__Fourth">
      <div class="evaluation__fourth" v-show="tobeShow">
        <div v-if="tobeData.length === 0">
          没有需要待评价的内容
        </div>
        <div v-else-if="tobeData.length > 0">
          <div
            v-for="(item, index) in tobeData"
            :key="item._id"
            class="tobe__item"
          >
            <img :src="item.image_path" alt="" class="tobe__image" />
            <div class="tobe__name">
              {{ item.name }}
            </div>
            <div class="tobe__comment" @click="to__evaluate(item)">
              <van-icon name="chat" size="20px" color="red" />
              <span>评论晒单</span>
            </div>
          </div>
        </div>
      </div>
      <div class="evaluation__fourth" v-show="alreadyShow">
        <div v-if="alreadyData.length === 0">
          没有已评价的内容
        </div>
        <div v-else-if="alreadyData.length > 0">
          <div
            v-for="(item, index) in alreadyData"
            :key="item._id"
            class="tobe__item"
          >
            <img :src="item.goods[0].image_path" alt="" class="tobe__image" />
            <div class="tobe__name">
              {{ item.goods[0].name }}
            </div>
            <div class="tobe__comment" @click="to__details(item)">
              <van-icon name="search" size="20px" />
              <span>查看评论</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluationCenter",
  components: {},
  props: {},
  data() {
    return {
      activeEva: 0,
      tabNumObj: 0,
      alreadyData: [],
      tobeData: [],
      tobeShow: true,
      alreadyShow: false
    };
  },
  methods: {
    evaluationReturn() {
      this.$router.push({ name: "membership" });
    },
    getAlreadyEva() {
      this.$axios
        .req("api/alreadyEvaluated")
        .then(response => {
          if (response) {
            this.alreadyData = response.data.list;
            console.log(this.alreadyData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTobeEva() {
      this.$axios
        .req("api/tobeEvaluated")
        .then(response => {
          if (response) {
            this.tobeData = response.data.list;
            console.log(this.tobeData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    switch__class1() {
      this.tabNumObj = 0;
      this.tobeShow = true;
      this.alreadyShow = false;
    },
    switch__class2() {
      this.tabNumObj = 1;
      this.tobeShow = false;
      this.alreadyShow = true;
    },
    to__evaluate(item) {
      this.$router.push({ name: "toEvaluate", query: { commodity: item } });
    },
    to__details(item) {
      this.$router.push({ name: "evaluateDetails", query: { details: item } });
    }
  },
  mounted() {
    this.getAlreadyEva();
    this.getTobeEva();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.evaluation__body {
  width: 100vw;
}
.evaluation__first {
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
.first__evaluation {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.evaluation__second {
  width: 100vw;
  height: 30vh;
  background-image: url("../../picture/evaluate.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
}
.evaluation__third__Third,
.evaluation__fourth__Fourth {
  width: 100vw;
}
.evaluation__third {
  width: 90vw;
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.1);
  margin: -30px auto;
  z-index: 10000;
}
.third__left {
  width: 35vw;
  line-height: 80px;
  font-size: 30px;
  text-align: center;
}
.third__right {
  width: 35vw;
  line-height: 80px;
  font-size: 30px;
  text-align: center;
}
.third__color {
  border-bottom: 4px solid red;
}
.evaluation__fourth {
  width: 90vw;
  margin: 50px auto;
}
.tobe__item {
  display: flex;
  position: relative;
}
.tobe__image {
  height: 200px;
}
.tobe__name {
  margin-left: 10px;
  font-size: 28px;
}
.tobe__comment {
  width: 170px;
  height: 60px;
  border-radius: 50px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.van-loading__spinner {
  width: 100vw;
  height: 10vw;
  margin-top: 50%;
}
</style>
