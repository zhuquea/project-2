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
        <van-icon name="manager" size="50px" color="orange" v-if="!userData" />
        <img
          :src="userData.avatar"
          alt=""
          v-else-if="userData"
          class="third__right__image"
        />
        <van-icon name="arrow" size="20px" color="blue" />
      </div>
    </div>
    <div class="personal__fourth">
      <div class="fourth__left">
        用户名
      </div>
      <div class="fourth__right">
        <van-field v-model="value0" :placeholder="userData.username" disabled />
      </div>
    </div>
    <div class="personal__fifth">
      <div class="fifth__left">
        昵称
      </div>
      <div class="fifth__right">
        <van-field
          v-model="userData.nickname"
          :placeholder="userData.nickname"
        ></van-field>
      </div>
    </div>
    <div class="personal__fifth">
      <div class="fifth__left">
        性别
      </div>
      <div class="fifth__right">
        <van-field
          v-model="userData.gender"
          :placeholder="userData.gender"
          @click="switch__showGender"
        ></van-field>
        <van-action-sheet v-model="showGender">
          <van-picker
            show-toolbar
            title="性别"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
          ></van-picker>
        </van-action-sheet>
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
      <div class="sixth__right" @click="switch__show">
        {{ userData.year }}年{{ userData.month }}月{{ userData.day }}日
      </div>
      <van-popup position="bottom" v-model="showYear" @select="onSelect">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          @confirm="onConfirm1"
          @cancel="onCancel1"
        ></van-datetime-picker>
      </van-popup>
    </div>
    <div class="personal__seventh">
      <van-button type="primary" size="large" @click="save__User"
        >保存</van-button
      >
    </div>
    <div class="personal__seventh">
      <van-button type="warning" size="large" @click="cancelObj"
        >取消</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
export default {
  name: "PersonalData",
  components: {},
  props: {},
  data() {
    return {
      value0: "",
      value3: "",
      showYear: false,
      showGender: false,
      currentDate: new Date(),
      minDate: new Date(2017, 1, 1),
      columns: ["男", "女", "保密"]
    };
  },
  methods: {
    personalReturn() {
      this.$router.push({ name: "membership" });
    },
    switch__show() {
      this.showYear = true;
    },
    onSelect() {
      this.showYear = false;
    },
    switch__showGender() {
      this.showGender = true;
    },
    onConfirm(value, index) {
      console.log(index);
      this.$store.state.user.gender = value;
      this.showGender = false;
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      // Toast('取消');
      this.showGender = false;
    },
    onConfirm1(value) {
      this.$store.state.user.year = this.$moment(value).year();
      this.$store.state.user.month = this.$moment(value).month() + 1;
      this.$store.state.user.day = this.$moment(value).date();
      // this.$store.state.user.year = value.getFullYear();
      // this.$store.state.user.month = value.getMonth() + 1;
      // this.$store.state.user.day = value.getDate()
      this.showYear = false;
      console.log(this.showYear);
    },
    onCancel1() {
      this.showYear = false;
    },
    save__User() {
      let UserData = {
        day: this.$store.state.user.day,
        gender: this.$store.state.user.gender,
        month: this.$store.state.user.month,
        nickname: this.$store.state.user.nickname,
        year: this.$store.state.user.year,
        id: this.$store.state.user._id
      };
      console.log(UserData);
      axios
        .post("api/saveUser", UserData)
        .then(response => {
          if (response.code === 200) {
            Toast({
              message: "保存成功",
              type: "success",
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$router.push({ name: "membership" });
    },
    cancelObj() {
      this.$router.push({ name: "membership" });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    userData() {
      return this.$store.state.user;
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
.third__right__image {
  height: 100px;
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
