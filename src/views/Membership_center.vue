<template>
  <div class="my__body">
    <div class="my__first">会员中心</div>
    <div class="my__second">
      <div class="second__set" @click="jump__personal__data">
        <van-icon name="setting" size="20px" />
      </div>
      <div class="second__manager">
        <van-icon name="manager" size="50px" color="orange" v-if="!this.$store.state.user"/>
        <img :src="userInfo.avatar" alt="" v-else-if="this.$store.state.user" class="second__user__image">
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
    <div class="my__third">
      <div>
        <van-icon name="paid" size="25px"/>
        <div>待付款</div>
      </div>
      <div>
        <van-icon name="shop-o" size="25px"/>
        <div>待发货</div>
      </div>
      <div>
        <van-icon name="logistics" size="25px"/>
        <div>待收货</div>
      </div>
      <div>
        <van-icon name="records" info="0" size="25px"/>
        <div>评价</div>
      </div>
      <div>
        <van-icon name="points" size="25px"/>
        <div>已完成</div>
      </div>
    </div>
    <div class="my__fourth">
     <div class="fourth__left">
       <van-icon name="orders-o" size="25px"/>全部订单
     </div>
      <div class="fourth__right">
        〉
      </div>
    </div>
    <div class="my__fifth">
      <div class="fifth__item">
        <div class="fourth__left">
          <van-icon name="points" size="25px"/>收藏商品
        </div>
        <div class="fourth__right">
          〉
        </div>
      </div>
      <div class="fifth__item" @click="jump__AddressList">
        <div class="fourth__left">
          <van-icon name="wap-home" size="25px"/>地址管理
        </div>
        <div class="fourth__right">
          〉
        </div>
      </div>
      <div class="fifth__item">
        <div class="fourth__left">
          <van-icon name="description" size="25px"/>最近浏览
        </div>
        <div class="fourth__right">
          〉
        </div>
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
      active: 0
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
            this.$store.state.userData = "";
            this.$store.state.details_login = true;
            console.log(this.userInfo);
            console.log(response);
           this.$store.state.showOut = !this.$store.state.showOut
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    login__Out1() {
      this.$router.push({name: "login"})
      this.$store.state.showOut = !this.$store.state.showOut
    },
    getUserData () {
      this.$axios.req("api/queryUser",{}).then((response) => {
        if (response.code === 200) {
          this.$store.state.user = response.userInfo
          console.log(this.$store.state.user);
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    jump__personal__data() {
      this.$router.push({name: "personal"})
    },
    jump__AddressList() {
      this.$store.state.returnMember = true
      this.$router.push({name: "addressList"})
    }
  },
  mounted() {
    this.getUserData()
  },
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
  .my__body {
    width: 100vw;
  }
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
.second__user__image {
  height: 120px;
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
  .my__third {
    width: 100vw;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    font-size: 30px;
    align-items: center;
  text-align: center;
  }
  .van-info {
    line-height: 30px !important;
    min-width: 30px !important;
    font-size: 20px !important;
  }
  .my__fourth {
    width: 100vw;
    font-size: 30px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fourth__left {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .fourth__right {
    font-size: 30px;
    padding-right: 10px;
  }
  .my__fifth {
    margin-top: 50px;
  }
  .fifth__item {
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    margin-top: 20px;
  }
</style>
