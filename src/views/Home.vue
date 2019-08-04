<template>
  <div class="home__body" ref="personWrap2">
    <div>
      <van-loading
        type="spinner"
        color="#1989fa"
        v-if="!HomeData"
        class="home__loading"
      ></van-loading>
      <div v-else>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="First">
            <div class="app1" @click="jump__city">
              <van-loading
                type="spinner"
                color="#1989fa"
                v-if="this.$store.state.isLocation === false"
              ></van-loading>
              <span class="app1__city" v-else>{{ CityData }}</span>
              <van-icon name="location" size="20px" />
            </div>
            <div class="app2">
              <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                @keydown.delete="deleteReturn"
                @focus="FocusObj"
                @blur="BlurObj"
              >
                <div
                  slot="action"
                  @click="onSearch"
                  class="first__search"
                  v-if="hiddenHome === false"
                >
                  搜索
                </div>
                <div
                  slot="action"
                  @click="onSearch2"
                  class="first__search"
                  v-else-if="hiddenHome === true"
                >
                  取消
                </div>
              </van-search>
            </div>
          </div>
          <HomeSearch
            v-if="hiddenHome === true"
            :searchData="searchData"
            @getHistory="getHistory"
          ></HomeSearch>
          <div v-else-if="hiddenHome === false">
            <div v-if="HomeData.advertesPicture">
              <van-swipe :autoplay="2000" indicator-color="white">
                <van-swipe-item
                  v-for="(item, index) in HomeData.slides"
                  :key="index"
                  ><img :src="item.image" alt="" class="Rotary_Planting_Map"
                /></van-swipe-item>
              </van-swipe>
              <div class="Home__category">
                <div
                  v-for="(item, index) in HomeData.category"
                  :key="index"
                  class="category__item"
                  @click="jump__class(item)"
                >
                  <img :src="item.image" alt="" class="category__img" />
                  <div>{{ item.mallCategoryName }}</div>
                </div>
              </div>
              <img
                :src="HomeData.advertesPicture.PICTURE_ADDRESS"
                alt=""
                class="imgtu"
              />
            </div>
            <div class="recomend">商品推荐</div>
            <div ref="personWrap" class="recommend__wrap">
              <div class="recommend__shop">
                <div
                  v-for="(item, index) in HomeData.recommend"
                  :key="index"
                  class="recommend__item"
                >
                  <img
                    :src="item.image"
                    alt=""
                    class="recommend__img"
                    @click="jump__details(item)"
                  />
                  <div class="recommend__goodsname">{{ item.goodsName }}</div>
                  <div>
                    <span class="recommend__price">{{ item.price }}</span>
                    <span class="recomend__mallPrice">{{
                      item.mallPrice
                    }}</span>
                  </div>
                  <div class="recomend__footer">
                    <span
                      class="recommend__cart"
                      @click="add__shopping__cart(item)"
                      ><van-icon name="cart"></van-icon
                    ></span>
                    <span class="recommend__check" @click="jump__details(item)"
                      >查看详情</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="snacks" v-if="HomeData.floorName">
              <span class="snacks__1F">1F</span>
              <span class="snacks__content">{{
                HomeData.floorName.floor1
              }}</span>
            </div>
            <div class="snacks2">
              <div v-if="HomeData.floor1" class="snacks2__1">
                <img
                  :src="HomeData.floor1[0].image"
                  alt=""
                  class="snacks2__0__img"
                  @click="jump__details0(HomeData.floor1[0].goodsId)"
                />
                <div>
                  <img
                    :src="HomeData.floor1[1].image"
                    alt=""
                    class="snacks2__1__img"
                    @click="jump__details0(HomeData.floor1[1].goodsId)"
                  />
                  <img
                    :src="HomeData.floor1[2].image"
                    alt=""
                    class="snacks2__1__img"
                    @click="jump__details0(HomeData.floor1[2].goodsId)"
                  />
                </div>
              </div>
              <div v-if="HomeData.floor1" class="snacks2__1">
                <img
                  :src="HomeData.floor1[3].image"
                  alt=""
                  class="snacks2__2__img"
                  @click="jump__details0(HomeData.floor1[3].goodsId)"
                />
                <img
                  :src="HomeData.floor1[4].image"
                  alt=""
                  class="snacks2__2__img"
                  @click="jump__details0(HomeData.floor1[4].goodsId)"
                />
              </div>
            </div>
            <div class="snacks" v-if="HomeData.floorName">
              <span class="snacks__1F">2F</span>
              <span class="snacks__content">{{
                HomeData.floorName.floor2
              }}</span>
            </div>
            <div class="snacks2">
              <div v-if="HomeData.floor2" class="snacks2__1">
                <img
                  :src="HomeData.floor2[0].image"
                  alt=""
                  class="snacks2__0__img"
                  @click="jump__details0(HomeData.floor2[0].goodsId)"
                />
                <div>
                  <img
                    :src="HomeData.floor2[1].image"
                    alt=""
                    class="snacks2__1__img"
                    @click="jump__details0(HomeData.floor2[1].goodsId)"
                  />
                  <img
                    :src="HomeData.floor2[2].image"
                    alt=""
                    class="snacks2__1__img"
                    @click="jump__details0(HomeData.floor2[2].goodsId)"
                  />
                </div>
              </div>
              <div v-if="HomeData.floor2" class="snacks2__1">
                <img
                  :src="HomeData.floor2[3].image"
                  alt=""
                  class="snacks2__2__img"
                  @click="jump__details0(HomeData.floor2[3].goodsId)"
                />
                <img
                  :src="HomeData.floor2[4].image"
                  alt=""
                  class="snacks2__2__img"
                  @click="jump__details0(HomeData.floor2[4].goodsId)"
                />
              </div>
            </div>
            <div class="snacks" v-if="HomeData.floorName">
              <span class="snacks__1F">3F</span>
              <span class="snacks__content">{{
                HomeData.floorName.floor3
              }}</span>
            </div>
            <div class="snacks2">
              <div v-if="HomeData.floor3" class="snacks2__1">
                <img
                  :src="HomeData.floor3[0].image"
                  alt=""
                  class="snacks2__0__img"
                  @click="jump__details0(HomeData.floor3[0].goodsId)"
                />
                <div>
                  <img
                    :src="HomeData.floor3[1].image"
                    alt=""
                    class="snacks2__1__img"
                    @click="jump__details0(HomeData.floor3[1].goodsId)"
                  />
                  <img
                    :src="HomeData.floor3[2].image"
                    alt=""
                    class="snacks2__1__img"
                    @click="jump__details0(HomeData.floor3[2].goodsId)"
                  />
                </div>
              </div>
              <div v-if="HomeData.floor3" class="snacks2__1">
                <img
                  :src="HomeData.floor3[3].image"
                  alt=""
                  class="snacks2__2__img"
                  @click="jump__details0(HomeData.floor3[3].goodsId)"
                />
                <img
                  :src="HomeData.floor3[4].image"
                  alt=""
                  class="snacks2__2__img"
                  @click="jump__details0(HomeData.floor3[4].goodsId)"
                />
              </div>
            </div>
            <div class="snacks">
              <span class="snacks__content">热销商品</span>
              <div class="hot__shop">
                <div
                  v-for="(item, index) in HomeData.hotGoods"
                  :key="index"
                  class="hot__item"
                >
                  <img
                    :src="item.image"
                    alt=""
                    class="hot__img"
                    @click="jump__details(item)"
                  />
                  <div class="hot__footer">
                    <div class="hot__goodsname">{{ item.name }}</div>
                    <div>
                      <span class="hot__price">￥{{ item.price }}</span>
                      <span class="hot__mallPrice">￥{{ item.mallPrice }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import HomeSearch from "../components/HomeSearch";
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    HomeSearch
  },
  props: {},
  data() {
    return {
      value: "",
      HomeData: {},
      category: [],
      searchData: [],
      hiddenHome: false,
      searchHistoryData: [],
      isLoading: false
    };
  },
  methods: {
    jump__city() {
      this.$router.push({ name: "cityList" });
    },
    FocusObj() {
      this.hiddenHome = true;
    },
    BlurObj() {
      this.hiddenHome = false;
      if (localStorage.getItem("searchHistory")) {
        this.searchHistoryData.push(this.value);
      }
      if (this.searchHistoryData.length > 0) {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(this.searchHistoryData)
        );
      }
    },
    deleteReturn() {},
    onSearch() {},
    onSearch2() {
      this.hiddenHome = false;
    },
    getHistory(data) {
      this.value = data;
    },
    getrecommend() {
      this.$axios
        .req("api//recommend")
        .then(response => {
          if (response) {
            this.HomeData = response.data;
            this.category = this.HomeData.category;
            // localStorage.setItem('category',JSON.stringify(this.category))
            this.$store.state.category = this.category;
            console.log(this.HomeData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    personScoll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    personScol2() {
      this.$nextTick(() => {
        if (!this.scroll1) {
          this.scroll1 = new BScroll(this.$refs.personWrap2, {
            click: true
          });
        } else {
          this.scroll1.refresh();
        }
      });
    },
    jump__class(item) {
      this.$router.push({
        name: "classification",
        query: {
          bxMallSubDto: item.bxMallSubDto,
          index: this.HomeData.category.indexOf(item),
          categroy: this.HomeData.category
        }
      });
    },
    jump__details(item) {
      this.$store.state.shopping_Cart = [];
      this.$router.push({
        name: "details",
        query: { id: item.goodsId }
      });
    },
    jump__details0(id) {
      this.$store.state.shopping_Cart = [];
      this.$router.push({
        name: "details",
        query: { id: id }
      });
    },
    add__shopping__cart(item) {
      if (!this.$store.state.user) {
        this.$router.push({
          name: "login"
        });
      } else if (this.$store.state.user) {
        this.$axios
          .req("api/addShop", { id: item.goodsId })
          .then(response => {
            if (response.code === 200) {
              Toast({
                message: "加入购物车成功",
                type: "success",
                duration: 2000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    }
  },
  mounted() {
    this.getrecommend();
    if (localStorage.getItem("searchHistory")) {
      this.searchHistoryData = JSON.parse(
        localStorage.getItem("searchHistory")
      );
    }
    //定位
    if (this.$store.state.isLocation === false) {
      let _this = this;
      AMap.plugin("AMap.Geolocation", function() {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log(data);
          _this.$store.state.cityName = data.addressComponent.city;
          _this.$store.state.isLocation = true;
        }

        function onError(data) {
          console.log(data);
          // 定位出错
        }
      });
    }
  },
  created() {
    this.$nextTick(() => {
      this.personScoll();
      this.personScol2();
    });
  },
  filters: {},
  computed: {
    CityData() {
      return this.$store.state.cityName;
    }
  },
  watch: {
    value(val) {
      this.$axios
        .req("api/search", { value: val })
        .then(response => {
          if (response.code === 200) {
            this.searchData = response.data.list;
            this.searchData = this.searchData.filter(item => {
              return JSON.stringify(item).indexOf(val) !== -1;
            });
            //高亮显示关键字
            this.searchData.forEach((item, index) => {
              if (val && val.length > 0) {
                let replaceReg = new RegExp(val, "g");
                let replaceString =
                  '<span class="search-text">' + val + "</span>";
                this.searchData[index].name = item.name.replace(
                  replaceReg,
                  replaceString
                );
              }
            });
            console.log(this.searchData);
          }
        })
        .catch(err => {
          console.log(err);
        });
      if (val === "") {
        this.searchData = [];
      }
    }
  },
  directives: {}
};
</script>
<style scoped lang="scss">
.home__body {
  background-color: #f2f2f2;
  height: 100vh;
  overflow: hidden;
}
.First {
  height: 50px;
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  align-items: center;
}
.app1 {
  display: flex;
  align-items: center;
  width: 25vw;
}
.app1__city {
  font-size: 30px;
}
.app2 {
  width: 75vw;
  margin-left: 20px;
}
.first__search {
  font-size: 25px;
}
.imgtu {
  width: 100%;
  height: 100px;
}
.Rotary_Planting_Map {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 400px;
}
.category__img {
  width: 100px;
  height: 80px;
}
.Home__category {
  display: flex;
  width: 100%;
  text-align: center;
}
.category__item {
  margin-top: 10px;
  flex: 1;
}
.recomend {
  font-size: 30px;
  margin-left: 20px;
}
.recommend__item {
  margin-left: 10px;
}
.recommend__wrap {
  width: 100%;
  overflow: hidden;
  display: flex;
}
.recommend__shop {
  display: flex;
}
.recommend__img {
  height: 240px;
}
.recommend__goodsname {
  width: 240px;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 25px;
}
.recommend__price {
  font-size: 30px;
}
.recomend__mallPrice {
  margin-left: 20px;
  font-size: 25px;
  text-decoration: line-through;
}
.recomend__footer {
  margin-left: 10px;
}
.recommend__cart {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  background-color: orangered;
  color: white;
}
.recommend__check {
  display: inline-block;
  width: 180px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  background-color: orange;
  color: white;
}
.snacks {
  width: 100%;
  text-align: center;
}
.snacks__1F {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: red;
  color: white;
  border-radius: 50%;
}
.snacks__content {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  color: orangered;
}
.snacks2 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.snacks2__1 {
  display: flex;
}
.snacks2__0__img {
  height: 400px;
  width: 50%;
}
.snacks2__1__img {
  height: 200px;
  width: 100%;
  display: block;
}
.snacks2__2__img {
  width: 50%;
  height: 200px;
}
.hot__shop {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 100px;
}
.hot__item {
  width: 49vw;
  margin-left: 5px;
  margin-top: 5px;
}
.hot__img {
  height: 370px;
}
.hot__goodsname {
  width: 370px;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 30px;
  color: red;
}
.hot__footer {
  margin-top: -6px;
  background-color: white;
}
.hot__price {
  color: red;
  font-size: 30px;
}
.hot__mallPrice {
  margin-left: 20px;
  font-size: 25px;
  text-decoration: line-through;
}
.hidden__search__item {
  text-indent: 2em;
  line-height: 70px;
  font-size: 30px;
}
.search-text {
  color: red;
}
</style>
