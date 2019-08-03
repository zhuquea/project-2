<template>
  <div class="shopping__cart__body">
    <div class="shopping__cart__first">
      购物车
    </div>
    <div class="shopping__cart__second" v-if="!this.$store.state.user">
      <img src="../../picture/shop.png" alt="" class="second__image" />
      <div class="second__to__login" @click="jump__login">
        你还尚未登录，请点击此处登录
      </div>
    </div>
    <div v-else-if="this.$store.state.user">
      <div class="shopping__cart__second1">
        <div class="second1__left">
          <input
            type="checkbox"
            class="input__check__box"
            :checked="allElection"
            v-model="allElection"
            @change="AllElect"
          />
          全选
        </div>
        <div class="second1__right">
          <div>合计：{{ totalData }}元</div>
          <div>请确认订单</div>
        </div>
      </div>
      <div class="shopping__cart__third" v-show="showDiv === true">
        <van-button type="danger" class="third__delete" @click="delete__Data"
          >删除</van-button
        >
        <van-button type="info" class="third__settlement" @click="to__settlement">去结算</van-button>
      </div>
      <div class="shopping__cart__fourth" v-if="shopping_Cart.length > 0">
        <div
          v-for="(item, index) in shopping_Cart"
          :key="item.id"
          class="fourth__item"
        >
          <input
            type="checkbox"
            class="input__check__box"
            :checked="item.check"
            @change="reverseElection"
            v-model="item.check"
          />
          <div>
            <img :src="item.image_path" alt="" class="item__Image" />
          </div>
          <div>
            <div class="item__name">
              {{ item.name }}
            </div>
            <div class="item__price">￥{{ item.present_price }}</div>
          </div>
          <van-stepper
            v-model="item.count"
            :disable-input="inputObj"
            class="item__stepper"
            @change="onChange(item)"
          ></van-stepper>
        </div>
      </div>
      <div class="no__Something" v-else-if="shopping_Cart.length === 0">
           你还没有购买任何商品，欢迎去商城选购
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "ShoppingCart",
  components: {},
  props: {},
  data() {
    return {
      shopping_Cart: [],
      deleteID: [],
      inputObj: true,
      allElection: false,
      showDiv: false
    };
  },
  methods: {
    jump__login() {
      this.$router.push({ name: "login" });
    },
    getShoppingCard() {
      this.$axios
        .req("api/getCard", {})
        .then(response => {
          if (response) {
            this.shopping_Cart = response.shopList;
            this.$store.state.shopping_Cart1 = response.shopList;
            console.log(this.shopping_Cart);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //全选
    AllElect() {
      if (this.allElection === true) {
        this.shopping_Cart.forEach(item => {
          item.check = true;
        });
        this.showDiv = true
      } else if (this.allElection === false) {
        this.shopping_Cart.forEach(item => {
          item.check = false;
        });
        this.showDiv = false
      }
    },
    //反选
    reverseElection() {
      let flag = true;
      this.shopping_Cart.forEach(item => {
        if (item.check === false) {
          flag = false;
        }
      });
      if (flag === true) {
        this.allElection = true;
      } else {
        this.allElection = false;
      }
      this.shopping_Cart.forEach((item) => {
        if (item.check === true) {
          this.showDiv = true
        }
      })
    },
    //购物车加减商品
    onChange(item) {
      this.$axios
        .req("api/editCart", {
          count: item.count,
          id: item.cid,
          mallPrice: item.mallPrice
        })
        .then(response => {
          if (response) {
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除操作
    delete__Data() {
      Dialog.confirm({
        title: "删除操作",
        message: "确认要删除选种商品吗"
      })
        .then(() => {
          this.shopping_Cart.forEach(item => {
            if (item.check === true) {
              this.deleteID.push(item.cid);
            }
          });
          axios
            .post("api/deleteShop", this.deleteID)
            .then(response => {
              if (response) {
                Toast({
                  message: "删除成功",
                  type: "success",
                  duration: 2000
                });
                this.getShoppingCard();
                console.log(response);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    to__settlement() {
      this.shopping_Cart.forEach((item) => {
        if (item.check === true) {
          this.$store.state.shopping_Cart3.push(item)
        }
      })
      this.$store.state.to_orderSettle = true
      this.$store.state.returnShoppingCart = true
      this.$router.push({name: "orderSettlement"})
    }
  },
  mounted() {
    this.getShoppingCard();
  },
  created() {},
  filters: {},
  computed: {
    totalData() {
      let numTotal = 0;
      this.shopping_Cart.forEach(item => {
        if (item.check === true) {
          numTotal = numTotal + item.count * item.present_price;
        }
      });
      return numTotal.toFixed(2);
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.shopping__cart__body {
  width: 100vw;
}
.shopping__cart__first {
  width: 100vw;
  font-size: 35px;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #d8d8d8;
}
.shopping__cart__second {
  width: 100vw;
  text-align: center;
  line-height: 60px;
}
.second__image {
  height: 250px;
}
.second__to__login {
  font-size: 35px;
  color: #e0322b;
}
.shopping__cart__second1 {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.second1__left {
  margin-left: -100px;
  font-size: 30px;
  display: flex;
  align-items: center;
}
.second1__right {
  font-size: 30px;
}
.input__check__box {
  zoom: 180%;
}
.shopping__cart__third {
  width: 100vw;
  line-height: 80px;
  position: relative;
}
.van-button {
  height: 80px;
  width: 200px;
}
.van-button--normal {
  font-size: 35px;
}
.third__delete {
  position: absolute;
  top: 0;
  right: 220px;
}
.third__settlement {
  position: absolute;
  top: 0;
  right: 0px;
}
.shopping__cart__fourth {
  width: 100vw;
  margin-top: 100px;
}
.fourth__item {
  font-size: 30px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  position: relative;
}
.item__Image {
  height: 200px;
}
.item__name {
  font-size: 30px;
  color: #e0322b;
}
.item__price {
  font-size: 30px;
  color: #e0322b;
  margin-top: 30px;
}
.item__stepper {
  position: absolute;
  bottom: 20px;
  right: 50px;
}
  .no__Something {
    width: 100vw;
    line-height: 100px;
    margin-top: 200px;
    font-size: 40px;
    color: #7dd2d9;
    text-align: center;
  }
</style>
