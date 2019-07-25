<template>
  <div class="order__query__body">
    <div class="order__query__first">
      <div class="first__return" @click="orderQueryReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__order__query">
        我的订单
      </div>
    </div>
    <div
      v-for="(item, index) in MyOrderData"
      :key="index"
      class="order__query__second"
    >
      <div class="second__1">
        <div class="second__1__left">订单编号：{{ item.order_id }}</div>
        <div class="second__1__right">
          交易完成
        </div>
      </div>
      <div class="second__2">
        <div
          v-for="(item1, index1) in item.order_list"
          :key="index1"
          class="second__2__orderList"
        >
          <img
            :src="item1.image_path"
            alt=""
            class="second__2__orderList__img"
          />
          <div class="second__2__orderList__name">
            {{ item1.name }}
          </div>
          <div class="second__2__orderList__price">
            ￥{{ item1.present_price }}
          </div>
          <div class="second__2__orderList__count">×{{ item1.count }}</div>
        </div>
      </div>
      <div class="second__3">
        <div class="second__3__time">创建时间：{{ item.add_time }}</div>
        <div class="second__3__time">收货地址：{{ item.address }}</div>
        <div class="second__3__time">
          共计{{ item.totalShopping }}件商品，合计：{{ item.mallPrice }}元
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderQuery",
  components: {},
  props: {},
  data() {
    return {
      MyOrderData: []
    };
  },
  methods: {
    orderQueryReturn() {
      this.$router.push({ name: "membership" });
    },
    getMyOrderData() {
      this.$axios
        .req("api/myOrder")
        .then(response => {
          if (response.code === 200) {
            this.MyOrderData = response.list;
            this.MyOrderData.forEach(item => {
              let Num = 0;
              item.order_list.forEach(item1 => {
                Num = Num + item1.count;
              });
              item.totalShopping = Num;
            });
            console.log(this.MyOrderData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getMyOrderData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.order__query__body {
  width: 100vw;
  background-color: #f2f2f2;
}
.order__query__first {
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
.first__order__query {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.order__query__second {
  width: 94vw;
  margin: 10px auto;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
}
.second__1 {
  display: flex;
  justify-content: space-between;
}
.second__1__left {
  font-size: 28px;
}
.second__1__right {
  font-size: 25px;
  color: orange;
}
.second__2 {
}
.second__2__orderList {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.second__2__orderList__count {
  position: absolute;
  right: 10px;
  top: 50px;
  font-size: 28px;
}
.second__2__orderList__img {
  height: 150px;
}
.second__2__orderList__name {
  font-size: 28px;
}
.second__2__orderList__price {
  font-size: 25px;
  color: red;
}
.second__3 {
  margin-top: 10px;
}
.second__3__time {
  font-size: 28px;
}
</style>
