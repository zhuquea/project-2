<template>
  <div class="personal__body">
    <div class="personal__first">
      <div class="first__return" @click="personalReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__data">
        个人资料
      </div>
    </div>
    <div class="personal__second">
      <span> Github</span>
    </div>
    <div class="personal__third">
      <div class="third__left">
        头像
      </div>
      <div class="third__right">
        <van-icon name="manager" size="50px" color="orange" />
        <van-icon name="arrow" size="20px" color="blue" />
      </div>
    </div>
    <div class="personal__fourth">
      <div class="fourth__left">
        用户名
      </div>
      <div class="fourth__right">
        <van-field v-model="value0" :placeholder="userDataObj.username" />
      </div>
    </div>
    <div class="personal__fifth">
      <div class="fifth__left">
        昵称
      </div>
      <div class="fifth__right">
        <van-field v-model="value1" :placeholder="userDataObj.nickname" />
      </div>
    </div>
    <div class="personal__fifth">
      <div class="fifth__left">
        性别
      </div>
      <div class="fifth__right">
        <van-field v-model="value2" :placeholder="userDataObj.gender" />
      </div>
    </div>
    <div class="personal__fifth">
      <div class="fifth__left">
        邮箱
      </div>
      <div class="fifth__right">
        <van-field v-model="value3" placeholder="请输入邮箱" />
      </div>
    </div>
    <div class="personal__sixth">
      <div class="sixth__left">
        出生年月
      </div>
      <div class="sixth__right"></div>
    </div>
    <div class="personal__seventh">
      <van-button type="primary" size="large">保存</van-button>
    </div>
    <div class="personal__seventh">
      <van-button type="warning" size="large">取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalData",
  components: {},
  props: {},
  data() {
    return {
      value0: "",
      value1: "",
      value2: "",
      value3: ""
    };
  },
  methods: {
    personalReturn() {
      this.$router.push({ name: "membership" });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    userDataObj() {
      return this.$store.state.userData;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.personal__body {
  width: 100vw;
}
.personal__first,
.personal__second,
.personal__fourth,
.personal__fifth,
.personal__sixth {
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
.first__data {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.personal__second > span {
  display: inline-block;
  width: 20vw;
  text-align: center;
  font-size: 30px;
}
.personal__third {
  width: 100vw;
  line-height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
}
.third__left {
  width: 15vw;
  text-align: center;
  font-size: 30px;
}
.third__right {
  width: 20vw;
  text-align: center;
  display: flex;
  align-items: center;
}
.fourth__left {
  width: 20vw;
  text-align: center;
  font-size: 30px;
}
.fourth__right {
  width: 80vw;
  font-size: 30px;
  margin-left: 40px;
}
.fifth__left {
  width: 15vw;
  text-align: center;
  font-size: 30px;
}
.fifth__right {
  width: 85vw;
  font-size: 30px;
  margin-left: 80px;
}
.sixth__left {
  width: 23vw;
  text-align: center;
  font-size: 30px;
}
.sixth__right {
  width: 75vw;
  font-size: 30px;
  margin-left: 10px;
}
.personal__seventh {
  width: 90vw;
  margin: 20px auto;
}
.van-button--large {
  height: 80px !important;
}
.van-button {
  font-size: 30px !important;
}
</style>
