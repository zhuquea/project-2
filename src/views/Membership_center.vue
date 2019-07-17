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
        欢迎您：
      </div>
      <div class="second__out">
        退出登录
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
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
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
  width: 200px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 220px;
  left: 50%;
  transform: translate(-100px);
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
