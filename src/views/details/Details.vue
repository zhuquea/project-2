<template>
  <div class="details__body">
    <van-loading
      type="spinner"
      color="#1989fa"
      v-if="!detailData.goodsOne"
    ></van-loading>
    <div v-else>
      <div class="detail__return" @click="returnObj">
        <van-icon name="arrow-left" size="25px" color="white" />
      </div>
      <div class="details__second" v-if="detailData.goodsOne">
        <van-swipe :autoplay="3000" indicator-color="white" @change="onChange">
          <van-swipe-item
            ><img
              :src="detailData.goodsOne.image"
              alt=""
              class="details__img"
              @click="preview__img"
          /></van-swipe-item>
          <van-swipe-item
            ><img
              :src="detailData.goodsOne.image_path"
              alt=""
              class="details__img"
              @click="preview__img"
          /></van-swipe-item>
          <div class="custom-indicator" slot="indicator">
            {{ current + 1 }}/2
          </div>
        </van-swipe>
      </div>
      <div class="details__name" v-if="detailData.goodsOne">
        {{ detailData.goodsOne.name }}
      </div>
      <div class="details__price" v-if="detailData.goodsOne">
        ￥{{ detailData.goodsOne.present_price }}
      </div>
      <div class="detail__collection" v-if="detailData">
        <div class="freight">运费：0</div>
        <div class="surplus" v-if="detailData.goodsOne">
          剩余：{{ detailData.goodsOne.amount }}
        </div>
        <!--      <div class="collection" v-if="checkCollect === 0">-->
        <!--        收藏:<van-icon name="like-o" size="25px" @click="collectionObj" />-->
        <!--      </div>-->
        <div class="collection" v-if="checkCollect === 1">
          取消收藏:<van-icon
            name="like"
            size="25px"
            color="red"
            @click="collectionObjCancel"
          ></van-icon>
        </div>
        <div class="collection" v-else>
          收藏:<van-icon name="like-o" size="25px" @click="collectionObj" />
        </div>
      </div>
      <div class="detail__get__into">
        <div class="get__into__1">
          <van-icon name="shop-o" size="30px" />
          <div class="official">
            有赞的店
            <van-button type="danger">官方</van-button>
          </div>
        </div>
        <div class="get__into__2">
          <div>进入店铺</div>
          <div><van-icon name="arrow" size="15px" /></div>
        </div>
      </div>
      <div class="detail__shop__comment">
        <van-tabs v-model="active1">
          <van-tab title="商品详情">
            <span
              v-html="detailData.goodsOne.detail"
              v-if="detailData.goodsOne"
            ></span>
          </van-tab>
          <van-tab title="商品评论" v-if="detailData.comment">
            <div
              class="van__tab__comment"
              v-if="detailData.comment.length === 0"
            >
              暂无评论内容
            </div>
            <div
              class="van__tab__comment1"
              v-else-if="detailData.comment.length > 0"
            >
              <div
                v-for="(item, index) in detailData.comment"
                :key="index"
                class="detailData__comment__item"
              >
                <div class="detailData__comment__left" v-if="item.user">
                  <img
                    :src="item.user[0].avatar"
                    alt=""
                    class="detailData__comment__avatar"
                  />
                  <div>
                    <div>
                      {{ item.user[0].nickname }}
                    </div>
                    <div>
                      <van-rate
                        v-model="item.rate"
                        :size="sizeObj"
                        color="#f44"
                        void-icon="star"
                        void-color="#eee"
                        class="commodity__rate"
                      ></van-rate>
                    </div>
                    <div>
                      {{ item.content }}
                    </div>
                  </div>
                </div>
                <div class="detailData__comment__left" v-else>
                  <img
                    :src="item.comment_avatar"
                    alt=""
                    class="detailData__comment__avatar"
                  />
                  <div>
                    <div>
                      {{ item.comment_nickname }}
                    </div>
                    <div>
                      <van-rate
                        v-model="item.rate"
                        :size="sizeObj"
                        color="#f44"
                        void-icon="star"
                        void-color="#eee"
                        class="commodity__rate"
                      ></van-rate>
                    </div>
                    <div>
                      {{ item.content }}
                    </div>
                  </div>
                </div>
                <div class="detailData__comment__right">
                  {{ item.comment_time }}
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div
        class="detail__add__cart"
        v-if="this.$store.state.user && this.$store.state.shopping_Cart1"
      >
        <van-goods-action class="detail__van__goods__action">
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon
            icon="shopping-cart-o"
            :info="info__Data"
            text="购物车"
            @click="jump__shoppingCart"
          ></van-goods-action-icon>
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="add__to__cart"
          ></van-goods-action-button>
          <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="shopping_now"
          ></van-goods-action-button>
          <van-action-sheet
            v-model="show"
            :title="detailData.goodsOne.name"
            v-if="detailData.goodsOne"
            class="van__shopping__now"
          >
            <div class="van__action__sheetObj">
              <div>
                <div class="purchase__quantity">购买数量：</div>
                <div class="residual__quantity">
                  剩余数量：{{ detailData.goodsOne.amount }} 件
                  <span class="residual__quantity__1">每人限购50件</span>
                </div>
              </div>
              <div class="van__stepper">
                <van-stepper
                  v-model="valueObj"
                  :disable-input="disabled"
                  max="50"
                  input-width="40px"
                  button-size="30px"
                ></van-stepper>
              </div>
              <div class="van__action__img">
                <img
                  :src="detailData.goodsOne.image"
                  alt=""
                  class="van__action__img__image"
                />
              </div>
              <div class="van__action__price">
                ￥{{ detailData.goodsOne.present_price }}
              </div>
            </div>
            <div class="van__action__sheetObj2">
              <van-button type="danger" @click="shopping__Now"
                >立即购买</van-button
              >
            </div>
          </van-action-sheet>
        </van-goods-action>
      </div>
      <div class="detail__add__cart" v-else-if="!this.$store.state.user">
        <van-goods-action class="detail__van__goods__action">
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon
            icon="shopping-cart-o"
            info="0"
            text="购物车"
            @click="jump__shoppingCart"
          ></van-goods-action-icon>
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="add__to__cart"
          ></van-goods-action-button>
          <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="shopping_now"
          ></van-goods-action-button>
          <van-action-sheet
            v-model="show"
            :title="detailData.goodsOne.name"
            v-if="detailData.goodsOne"
            class="van__shopping__now"
          >
            <div class="van__action__sheetObj">
              <div>
                <div class="purchase__quantity">购买数量：</div>
                <div class="residual__quantity">
                  剩余数量：{{ detailData.goodsOne.amount }} 件
                  <span class="residual__quantity__1">每人限购50件</span>
                </div>
              </div>
              <div class="van__stepper">
                <van-stepper
                  v-model="valueObj"
                  :disable-input="disabled"
                  max="50"
                  input-width="40px"
                  button-size="30px"
                ></van-stepper>
              </div>
              <div class="van__action__img">
                <img
                  :src="detailData.goodsOne.image"
                  alt=""
                  class="van__action__img__image"
                />
              </div>
              <div class="van__action__price">
                ￥{{ detailData.goodsOne.present_price }}
              </div>
            </div>
            <div class="van__action__sheetObj2">
              <van-button type="danger" @click="shopping__Now"
                >立即购买</van-button
              >
            </div>
          </van-action-sheet>
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ImagePreview } from "vant";
import { Toast } from "vant";
export default {
  name: "Details",
  components: {},
  props: {},
  data() {
    return {
      goodsId: "",
      detailData: {},
      current: 0,
      active: "chat",
      active1: 0,
      checkCollect: 0,
      show: false,
      valueObj: 1,
      disabled: true,
      sizeObj: 20,
      recentBrowsingData: [],
      FromCollection: false
    };
  },
  methods: {
    getDetailsData() {
      this.$axios
        .req(`api/goods/one?id=${this.goodsId}&page=${1}`)
        .then(response => {
          if (response) {
            this.detailData = response.goods;
            this.$store.state.recentBrowsingData.push(this.detailData.goodsOne);
            this.recentBrowsingData.push(response.goods.goodsOne);
            localStorage.setItem(
              "recentBrowsingData",
              JSON.stringify(this.recentBrowsingData)
            );
            console.log(this.detailData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onChange(index) {
      this.current = index;
    },
    returnObj() {
      // this.$router.go(-1);
      //从分类进来，点返回回到分类页面
      if (
        this.$store.state.return_Class === false &&
        this.$store.state.fromCollection === false
      ) {
        this.$router.push({ name: "home" });
      } else if (
        this.$store.state.return_Class &&
        this.$store.state.fromCollection === false
      ) {
        this.$router.push({
          name: "classification",
          query: {
            categroy: this.$store.state.classDataAll,
            bxMallSubDto: this.$store.state.classDataArr,
            index: this.$store.state.tabnumobj
          }
        });
        this.$store.state.return_Class = false;
      } else if (
        this.$store.state.return_Class === false &&
        this.$store.state.fromCollection === true
      ) {
        this.$router.push({ name: "myCollection" });
        this.$store.state.fromCollection = false;
      }
      // this.$router.push({ name: "home" });
    },
    preview__img() {
      ImagePreview({
        images: [
          this.detailData.goodsOne.image,
          this.detailData.goodsOne.image
        ],
        startPosition: 0,
        showIndicators: true,
        onClose() {
          // do something
        }
      });
    },
    collectionObj() {
      if (!this.$store.state.user) {
        this.$store.state.isLocation = false;
        this.$router.push({
          name: "login",
          query: { details_login: this.details_login, id: this.goodsId }
        });
      } else if (this.$store.state.user) {
        axios
          .post("api/collection", this.detailData.goodsOne)
          .then(response => {
            if (response) {
              Toast({
                message: "收藏成功",
                type: "success",
                duration: 2000
              });
              console.log(response);
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.checkCollect = 1;
      }
    },
    collectionObjCancel() {
      this.$axios
        .req("api/cancelCollection", { id: this.goodsId })
        .then(response => {
          if (response) {
            Toast({
              message: "取消收藏成功",
              type: "fail",
              duration: 2000
            });
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.checkCollect = 0;
    },
    checkCollection() {
      if (this.$store.state.user) {
        this.$axios
          .req("api/isCollection", { id: this.goodsId })
          .then(response => {
            if (response) {
              this.checkCollect = response.isCollection;
              console.log(this.checkCollect);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    add__to__cart() {
      if (!this.$store.state.user) {
        this.$store.state.isLocation = false;
        this.$router.push({
          name: "login",
          query: { details_login: this.details_login, id: this.goodsId }
        });
      } else if (this.$store.state.user) {
        this.$axios
          .req("api/addShop", { id: this.goodsId })
          .then(response => {
            if (response.code === 200) {
              Toast({
                message: "加入购物车成功",
                type: "success",
                duration: 2000
              });
              this.getShoppingCard();
              console.log(this.$store.state.shopping_Cart1);
              console.log(response);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    shopping_now() {
      this.show = true;
    },
    shopping__Now() {
      if (!this.$store.state.user) {
        this.$store.state.isLocation = false;
        this.$router.push({
          name: "login",
          query: { details_login: this.details_login, id: this.goodsId }
        });
      } else if (this.$store.state.user) {
        this.$store.state.shopping_Cart.push(this.goodsId);
        this.$router.push({
          name: "orderSettlement",
          query: {
            idOrder: this.goodsId,
            data: this.detailData.goodsOne,
            valueObj: this.valueObj
          }
        });
      }
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
    jump__shoppingCart() {
      this.$router.push({ name: "shoppingCart" });
    }
  },
  mounted() {
    // this.goodsId = this.$route.query.id;
    if (this.$route.query.idLogin) {
      this.goodsId = this.$route.query.idLogin;
    } else if (this.$route.query.id) {
      this.goodsId = this.$route.query.id;
    } else if (this.$route.query.idOrder) {
      this.goodsId = this.$route.query.idOrder;
    }
    this.getDetailsData();
    this.getShoppingCard();
    if (localStorage.recentBrowsingData) {
      this.recentBrowsingData = JSON.parse(
        localStorage.getItem("recentBrowsingData")
      );
      // console.log(JSON.parse(localStorage.getItem("recentBrowsingData")))
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
    next(vm => {
      if (from.path === "/myCollection") {
        vm.FromCollection = true;
        console.log(vm.FromCollection);
      }
    });
  },
  created() {
    this.$nextTick(() => {
      this.checkCollection();
    });
  },
  filters: {},
  computed: {
    details_login() {
      return this.$store.state.details_login;
    },
    info__Data() {
      return this.$store.state.shopping_Cart1.length;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.details__body {
  width: 100vw;
  padding-bottom: 100px;
}
.detail__return {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #7d7e80;
  text-align: center;
  line-height: 60px;
  margin-left: 20px;
  margin-top: 20px;
}
.van-icon:before {
  line-height: 60px;
}
.details__second {
  width: 100vw;
  text-align: center;
}
.details__img {
  height: 600px;
}
.details__name {
  width: 100vw;
  font-size: 30px;
  margin-top: 40px;
}
.details__price {
  width: 100vw;
  font-size: 30px;
  color: #ce272d;
  margin-top: 40px;
}
.detail__collection {
  width: 100vw;
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-top: 40px;
}
.freight {
  flex: 1;
}
.surplus {
  flex: 1;
}
.collection {
  display: flex;
  align-items: center;
  flex: 1;
}
.detail__get__into {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.get__into__1 {
  display: flex;
  align-items: center;
}
.official {
  font-size: 30px;
}
.get__into__2 {
  display: flex;
  align-items: center;
  padding-right: 30px;
  font-size: 30px;
}
.detail__shop__comment {
  width: 100vw;
  margin-top: 60px;
}
.van__tab__comment {
  text-align: center;
  font-size: 30px;
}
.detailData__comment__item {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.detailData__comment__avatar {
  height: 100px;
}
.detailData__comment__left {
  display: flex;
}
.detail__add__cart {
  width: 100vw;
}
.van-goods-action-icon {
  font-size: 30px !important;
}
.van-button--large {
  height: 100px !important;
}
.van-info {
  line-height: 30px !important;
  min-width: 30px !important;
  font-size: 20px !important;
}
.van-action-sheet {
  height: 380px !important;
}
.van-action-sheet__header {
  height: 200px;
  font-size: 25px !important;
  line-height: 80px !important;
}
.van-icon[data-v-1dd994aa]:before {
  font-size: 35px !important;
}
.van__action__sheetObj {
  width: 100vw;
  display: flex;
  position: relative;
}
.purchase__quantity {
  margin-left: 20px;
  font-size: 25px;
}
.residual__quantity {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  color: #7d7e80;
}
.residual__quantity__1 {
  margin-left: 20px;
  font-size: 20px;
  color: #ce272d;
}
.van__stepper {
}
.van-action-sheet__cancel {
  font-size: 30px !important;
  background-color: #ce272d !important;
  color: white !important;
  line-height: 80px !important;
}
.van__shopping__now {
  width: 100vw;
}
.van__action__img {
  position: absolute;
  top: -200px;
  left: 0px;
  z-index: 10000;
}
.van__action__img__image {
  height: 200px;
  z-index: 10000;
}
.van__action__price {
  position: absolute;
  top: -80px;
  left: 220px;
  font-size: 20px;
  color: #ce272d;
}
.detail__van__goods__action .van-button {
  width: 100vw !important;
  font-size: 40px !important;
  height: 80px;
}
.van__action__sheetObj2 {
  margin-top: 10px;
}
.van-loading__spinner {
  width: 100vw;
  height: 10vw;
  margin-top: 50%;
}
</style>
