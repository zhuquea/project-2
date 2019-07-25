<template>
  <div class="order__settlement__body">
    <div class="order__settlement__first">
      <div class="first__return" @click="orderSettleReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__order">
        订单结算
      </div>
    </div>
    <div class="order__settlement__second">
      <div class="second__1" v-if="!this.defaultAddress" @click="add__Address">
        点击添加收货地址
      </div>
      <div class="second__1__1" v-else-if="this.defaultAddress">
        <div class="second__1__1__One">
          <div class="One__left">联系人：{{ defaultAddress.name }}</div>
          <div class="One__right">电话：{{ defaultAddress.tel }}</div>
        </div>
        <div class="second__1__1__Two">
          <div class="Two__left">
            <van-icon name="location" size="20px" />
            <span>{{ defaultAddress.address }}</span>
          </div>
          <div class="Two__right" @click="jump__addressList">
            <van-icon name="arrow" size="20px" />
          </div>
        </div>
        <van-notice-bar wrapable :scrollable="false">
          （收货不便时，可选择免费待收货服务）
        </van-notice-bar>
      </div>
      <img src="../../picture/caitiao.jpg" alt="" class="second__2" />
    </div>
    <div
      class="order__settlement__third"
      v-if="orderData && ShoppingCart.length === 0"
    >
      <div class="third__left">
        <img :src="orderData.image" alt="" class="third__image" />
      </div>
      <div class="third__right">
        <div class="third__name">{{ orderData.name }}</div>
        <div class="third__price">￥{{ orderData.present_price }}</div>
      </div>
      <div class="third__number">×{{ valueObj }}</div>
    </div>
    <div v-else-if="ShoppingCart.length > 0">
      <div
        class="order__settlement__third"
        v-for="(item, index) in ShoppingCart"
        :key="index"
      >
        <div class="third__left">
          <img :src="item.image_path" alt="" class="third__image" />
        </div>
        <div class="third__right">
          <div class="third__name">{{ item.name }}</div>
          <div class="third__price">￥{{ item.present_price }}</div>
        </div>
        <div class="third__number">×{{ item.count }}</div>
      </div>
    </div>
    <div
      class="order__settlement__fourth"
      v-if="orderData && ShoppingCart.length === 0"
    >
      <van-submit-bar
        :price="total"
        button-text="提交订单"
        @submit="onSubmit"
      ></van-submit-bar>
    </div>
    <div class="order__settlement__fourth" v-else-if="ShoppingCart.length > 0">
      <van-submit-bar
        :price="total2"
        button-text="提交订单"
        @submit="onSubmit2"
      ></van-submit-bar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "OrderSettlement",
  components: {},
  props: {},
  data() {
    return {
      idOrder: "",
      orderData: {},
      valueObj: 1,
      defaultAddress: {},
      ShoppingCart: []
    };
  },
  methods: {
    orderSettleReturn() {
      if (this.$store.state.returnShoppingCart === false) {
        this.$router.push({
          name: "details",
          query: { idOrder: this.idOrder }
        });
        this.$store.state.shopping_Cart = [];
      } else if (this.$store.state.returnShoppingCart === true) {
        this.$store.state.returnShoppingCart = false;
        this.$router.push({ name: "shoppingCart" });
      }
    },
    onSubmit() {
      if (!this.defaultAddress) {
        Toast({
          message: "请添加收货地址",
          type: "fail",
          duration: 2000
        });
      } else if (this.defaultAddress) {
        axios
          .post("api/order", {
            address: this.defaultAddress.address,
            tel: this.defaultAddress.tel,
            orderId: this.$store.state.shopping_Cart,
            totalPrice: this.total,
            count: this.valueObj,
            idDirect: true
          })
          .then(response => {
            if (response) {
              Toast({
                message: "结算成功，一共" + this.total / 100 + "元",
                type: "success",
                duration: 2000
              });
              this.$store.state.shopping_Cart = [];
              console.log(response);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    add__Address() {
      this.$router.push({ name: "addressList" });
    },
    getDefaultAddress() {
      this.$axios
        .req("api/getDefaultAddress")
        .then(response => {
          if (response.code === 200) {
            this.defaultAddress = response.defaultAdd;
            console.log(this.defaultAddress);
            // console.log(this.$store.state.orderSettleId);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    jump__addressList() {
      this.$router.push({ name: "addressList" });
    },
    getShoppingCart() {
      this.$axios
        .req("api/getCard", {})
        .then(response => {
          if (response) {
            this.ShoppingCart = response.shopList;
            console.log(this.ShoppingCart);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit2() {
      if (!this.defaultAddress) {
        Toast({
          message: "请添加收货地址",
          type: "fail",
          duration: 2000
        });
      } else if (this.defaultAddress) {
        axios
          .post("api/order", {
            address: this.defaultAddress.address,
            tel: this.defaultAddress.tel,
            orderId: this.$store.state.shopping_Cart2,
            totalPrice: this.total2,
            count: this.allCount,
            idDirect: false
          })
          .then(response => {
            if (response) {
              Toast({
                message: "结算成功，一共" + this.total2 / 100 + "元",
                type: "success",
                duration: 2000
              });
              this.$store.state.shopping_Cart = [];
              this.$store.state.shopping_Cart2 = [];
              console.log(response);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    if (this.$route.query.idOrder) {
      this.idOrder = this.$route.query.idOrder;
      this.$store.state.idOrder = this.$route.query.idOrder;
    } else if (this.$route.query.idOrder1) {
      this.idOrder = this.$route.query.idOrder1;
      this.$store.state.idOrder = this.$route.query.idOrder1;
    }
    if (this.$route.query.data) {
      this.orderData = this.$route.query.data;
      this.$store.state.orderData = this.$route.query.data;
    } else if (this.$route.query.orderData1) {
      this.orderData = this.$route.query.orderData1;
      this.$store.state.orderData = this.$route.query.orderData1;
    }
    if (this.$route.query.valueObj) {
      this.valueObj = this.$route.query.valueObj;
      this.$store.state.valueObj = this.$route.query.valueObj;
    } else if (this.$route.query.valueObj1) {
      this.valueObj = this.$route.query.valueObj1;
      this.$store.state.valueObj = this.$route.query.valueObj1;
    }
    console.log(this.orderData);
    console.log(this.$store.state.shopping_Cart);
    console.log(this.$store.state.shopping_Cart2);
    this.getDefaultAddress();
    if (this.$store.state.to_orderSettle === true) {
      this.getShoppingCart();
      this.$store.state.to_orderSettle = false;
      this.$store.state.to_orderSettle2 = true
    }
  },
  created() {},
  filters: {},
  computed: {
    total() {
      return this.valueObj * this.orderData.present_price * 100;
    },
    total2() {
      let summation = 0;
      this.ShoppingCart.forEach(item => {
        summation = summation + item.count * item.present_price;
      });
      return summation * 100;
    },
    allCount() {
      let allcount = 0;
      this.ShoppingCart.forEach(item => {
        allcount = allcount + item.count;
      });
      return allcount;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.order__settlement__body {
  width: 100vw;
}
.order__settlement__first {
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
.first__order {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.order__settlement__second {
  width: 100vw;
  text-align: center;
}
.second__1 {
  width: 100vw;
  line-height: 150px;
  text-align: center;
  font-size: 30px;
}
.second__2 {
  width: 100vw;
}
.order__settlement__third {
  width: 100vw;
  margin-top: 20px;
  display: flex;
  align-items: center;
  position: relative;
}
.third__right {
  margin-left: 20px;
}
.third__number {
  position: absolute;
  top: 100px;
  right: 20px;
  font-size: 30px;
}
.third__image {
  height: 200px;
}
.third__name {
  font-size: 30px;
}
.third__price {
  font-size: 30px;
  color: #ce272d;
  margin-top: 50px;
}
.van-submit-bar__bar {
  height: 100px !important;
  font-size: 30px !important;
}
.van-submit-bar__price {
  font-size: 30px !important;
}
.van-submit-bar__button {
  width: 25vw !important;
}
.van-button {
  font-size: 30px !important;
}
.van-button--large {
  height: 80px !important;
}
.second__1__1 {
  width: 100vw;
}
.second__1__1__One {
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 30px;
}
.second__1__1__Two {
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
}
.Two__left {
  display: flex;
  align-items: center;
}
</style>
