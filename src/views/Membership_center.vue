<template>
  <div>
    <div class="my__first">会员中心</div>
    <div class="my__second">
      <div class="second__set">
        <van-icon name="setting" size="20px" />
      </div>
      <div class="second__manager">
        <van-icon name="manager" size="50px" color="orange" />
      </div>
      <div class="second__user">
        欢迎您：<span v-if="userInfo">{{ userInfo.nickname }}</span>
      </div>
      <div class="second__out" @click="login__Out" v-if="showOut === false">
        退出登录
      </div>
      <div class="second__out" @click="login__Out1" v-else-if="showOut">
        请登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Membership_center",
  components: {},
  props: {},
  data() {
    return {
    };
  },
  methods: {
    login__Out() {
      this.$axios
        .req("api/loginOut", {})
        .then(response => {
          if (response) {
            localStorage.removeItem("user");
            this.$store.state.user = "";
            this.$store.state.details_login = true
            console.log(this.userInfo);
            console.log(response);
           this.$store.state.showOut = !this.$store.state.showOut
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    login__Out1 () {
      this.$router.push({name: "login"})
      this.$store.state.showOut = !this.$store.state.showOut
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
    showOut () {
      return this.$store.state.showOut
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.my__first {
  width: 100%;
  line-height: 70px;
  text-align: center;
  font-size: 35px;
}
.my__second {
  width: 100%;
  height: 500px;
  background-color: #47d1d1;
  position: relative;
}
.second__set {
  position: absolute;
  top: 30px;
  right: 30px;
  color: white;
}
.second__manager {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
  text-align: center;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-60px);
}
.second__user {
  width: 100vw;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 220px;
  left: 50%;
  transform: translate(-50vw);
}
.second__out {
  width: 200px;
  text-align: center;
  color: white;
  font-size: 30px;
  position: absolute;
  top: 280px;
  left: 50%;
  transform: translate(-100px);
}
</style>
