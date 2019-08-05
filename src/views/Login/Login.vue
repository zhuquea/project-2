<template>
  <div class="login__body home__input">
    <div class="login__card home__input">
      <div class="login__first">登录/注册</div>
      <div class="username">
        <van-field
          v-model="username"
          :clearable="clearstr"
          placeholder="USERNAME"
          size="large"
        ></van-field>
      </div>
      <div class="password">
        <van-field
          v-model="password"
          :clearable="clearstr"
          type="password"
          placeholder="PASSWORD"
        ></van-field>
      </div>
      <div>
        <van-field
          v-model="phone"
          label="手机号码"
          placeholder="仅注册需要"
          size="large"
          label-width="80px"
          center></van-field>
      </div>
      <div>
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          label-width="80px"
        >
          <van-button slot="button" size="large" type="primary"
            >发送验证码</van-button
          >
        </van-field>
      </div>
      <div class="login__code">
        <van-field
          v-model="verifictioncode"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          size="large"
          label-width="80px"
          style="width: 230px"
        >
        </van-field>
        <span v-html="src" class="span__code" @click="getcode1"></span>
      </div>
      <div class="login__register">
        <van-button
          type="primary"
          size="large"
          class="login__L__R"
          @click="login"
          >登录</van-button
        >
        <van-button
          type="info"
          size="large"
          class="login__L__R"
          @click="register"
          >注册</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from "vant";
import _ from "lodash";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
      clearstr: true,
      phone: "",
      sms: "",
      verifictioncode: "",
      src: "",
      details_login: "",
      details_id: "",
      searchHistoryObj: []//当登陆或者注册成功后将localstorage中searchHistory的搜索历史记录清空
    };
  },
  methods: {
    getcode() {
      this.$axios
        .req("api/verify")
        .then(response => {
          if (response) {
            this.src = response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      this.$axios
        .req("api/login", {
          nickname: this.username,
          password: this.password,
          verify: this.verifictioncode
        })
        .then(response => {
          if (response) {
            console.log(response);
          }
          if (response.code === -1) {
            Toast({
              message: "请输入完整信息或者用户名密码错误",
              type: "fail",
              duration: 2000
            });
            // this.$notify("请输入完整信息或者用户名密码错误");
          } else if (response.code === -2) {
            Toast({
              message: "验证码错误",
              type: "fail",
              duration: 2000
            });
            // this.$notify("验证码错误");
            this.getcode();
          } else if (response.code === 200) {
            Toast({
              message: "恭喜你，登录成功",
              type: "success",
              duration: 2000
            });
            // this.$notify({
            //   message: "恭喜你，登录成功",
            //   duration: 3000,
            //   background: "#1989fa"
            // });
            localStorage.setItem("user", JSON.stringify(response.userInfo));
            localStorage.removeItem("recentBrowsingData");
            localStorage.setItem("searchHistory",JSON.stringify(this.searchHistoryObj))
            // localStorage.removeItem("searchHistory");
            this.$store.state.user = response.userInfo;
            if (this.details_login === true) {
              this.$router.push({name:"details" , query: {idLogin : this.details_id}})
              this.$store.state.details_login = false
              this.$store.state.showOut = false
              this.$store.state.isLogin = true
            } else {
              this.$router.push({ name: "home" });
              this.$store.state.showOut = false
              this.$store.state.isLogin = true
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      this.$axios
        .req("api/register", {
          nickname: this.username,
          password: this.password,
          verify: this.verifictioncode
        })
        .then(response => {
          if (response) {
            console.log(response);
          }
          if (response.code === -1) {
            Toast({
              message: "请输入完整信息或者用户名密码错误",
              type: "fail",
              duration: 2000
            });
            // this.$notify("请输入完整信息或用户名已存在");
          } else if (response.code === -2) {
            Toast({
              message: "验证码错误",
              type: "fail",
              duration: 2000
            });
            // this.$notify({
            //   message: "验证码错误",
            //   duration: 3000,
            //   background: "orange"
            // });
            this.getcode();
          } else if (response.code === 200) {
            Toast({
              message: "恭喜你，注册成功",
              type: "success",
              duration: 2000
            });
            // this.$notify({
            //   message: "恭喜你，注册成功",
            //   duration: 3000,
            //   background: "#1989fa"
            // });
            localStorage.setItem("user", JSON.stringify(response.userInfo));
            localStorage.removeItem("recentBrowsingData");
            localStorage.setItem("searchHistory",JSON.stringify(this.searchHistoryObj))
            // localStorage.removeItem("searchHistory");
            this.$store.state.user = response.userInfo;
            if (this.details_login === true) {
              this.$router.push({name:"details" , query: {idLogin : this.details_id}})
              this.$store.state.details_login = false
              this.$store.state.showOut = false
              this.$store.state.isLogin = true
            } else {
              this.$router.push({ name: "home" });
              this.$store.state.showOut = false
              this.$store.state.isLogin = true
            }
            // this.$router.push({ name: "home" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getcode();
    this.details_login = this.$route.query.details_login
    this.details_id = this.$route.query.id
    console.log(this.details_login);
  },
  created() {
    this.getcode1 = _.debounce(this.getcode, 350);
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.login__body {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../picture/tu1.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
}
.login__card {
  width: 80%;
  background-color: white;
  margin: 100px auto;
  padding: 20px;
  box-shadow: 5px 5px 4px 4px rgba(0, 0, 0, 0.2);
}
.login__first {
  width: 100%;
  font-size: 30px;
  font-weight: bold;
}
.username {
  margin-top: 20px;
  font-size: 30px;
  size: 50px;
  height: 80px;
}
.password {
  margin-top: 20px;
}
.login__code {
  display: flex;
  align-items: center;
}
.login__register {
  display: flex;
}
.login__L__R {
  width: 30%;
  height: 70px;
  margin-left: 20px;
}
</style>
