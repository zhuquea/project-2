<template>
  <div class="classification__body" ref="personWrap2">
    <div>
      <van-loading
        type="spinner"
        color="#1989fa"
        v-if="this.classDataArr === 0"></van-loading>
      <div v-else>
        <div class="classification__top">
          商品分类
        </div>
        <div class="classification__content">
          <div class="classification__left">
            <div
              v-for="(item, index) in classDataAll"
              :key="index"
              class="left__item"
              :class="{ left__class: tabnumobj === index }"
              @click="switchclass(item, index)"
            >
              {{ item.mallCategoryName }}
            </div>
          </div>
          <div class="classification__right">
            <div class="right__top">
              <van-tabs
                class="classification__right__van"
                line-width="60px"
                @click="getclassData"
                style="margin-top: 10px"
                v-model="activeObj"
              >
                <van-tab
                  v-for="(item, index) in classDataArr"
                  :key="index"
                  :title="item.mallSubName"
                  :name="item.mallSubId"
                  class="right__top__item"
                >
                  <div
                    v-for="(item, index) in datalist"
                    :key="index"
                    class="datalist"
                  >
                    <img
                      v-lazy="item.image"
                      class="item__img"
                      @click="jump__details(item)"
                    />
                    <div>
                      <div class="item__name">{{ item.name }}</div>
                      <div class="item__price">
                        ￥{{ item.present_price }}
                        <span class="item__old__price">{{
                          item.orl_price
                        }}</span>
                      </div>
                    </div>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Classification",
  components: {},
  props: {},
  data() {
    return {
      classDataArr: [],//从首页点击相应分类商品进入分类页面时，给classDataArr赋值
      classDataAll: [],//classDataAll接收完整数据
      classDataItem: [],
      idObj: "",
      datalist: [],
      tabnumobj: 0,
      activeObj: 0
    };
  },
  methods: {
    getclassData(name) {
      this.idObj = name;
      this.$axios
        .req(`api/classification?mallSubId=${this.idObj}`)
        .then(response => {
          if (response) {
            this.datalist = response.dataList;
            console.log(this.datalist);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    switchclass(item, index) {
      this.tabnumobj = index;
      //从分类页面进入详情页，从详情也返回分类时，需要将 this.$store.state.tabnumobj传回来
      this.$store.state.tabnumobj = index
      this.activeObj = 0;
      this.classDataAll.forEach(item => {
        if (this.classDataAll.indexOf(item) === index) {
          this.classDataItem = item;
          this.classDataArr = this.classDataItem.bxMallSubDto;
          //从分类页面进入详情页，从详情也返回分类时，需要将 this.$store.state.classDataArr传回来
          this.$store.state.classDataArr = this.classDataItem.bxMallSubDto
          console.log(this.$store.state.classDataArr);
          this.idObj = this.classDataArr[0].mallSubId;
          this.$axios
            .req(`api/classification?mallSubId=${this.idObj}`)
            .then(response => {
              if (response) {
                this.datalist = response.dataList;
                console.log(this.datalist);
              }
            })
            .catch(err => {
              console.log(err);
            });
          // console.log(this.classDataItem);
          // console.log(this.classDataArr);
        }
      });
    },
    jump__details(item) {
      this.$router.push({
        name: "details",
        query: { id: item.id }
      });
      this.$store.state.return_Class = true;
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
    }
  },
  mounted() {
    // this.classDataAll = JSON.parse(localStorage.getItem('category'))
    //classDataAll接收完整数据
    this.classDataAll = this.$route.query.categroy;
    //存储到vuex中，当从分类进入详情，再从详情返回分类页面再把数据传回来，使分类页面有数据
    this.$store.state.classDataAll = this.$route.query.categroy;
    console.log(this.classDataAll);
    //从首页点击相应分类商品进入分类页面时，给classDataArr赋值
    this.classDataArr = this.$route.query.bxMallSubDto;
    //存储到vuex中，当从分类进入详情，再从详情返回分类页面再把数据传回来，使分类页面有数据
    if (this.$route.query.bxMallSubDto) {
      this.$store.state.classDataArr = this.$route.query.bxMallSubDto
    }
    // this.$store.state.classDataArr = this.$route.query.bxMallSubDto
    console.log(this.classDataArr);
    //从首页点击相应分类商品进入分类页面时，让tabnumobj等于相应下标
    this.tabnumobj = this.$route.query.index;
    //存储到vuex中，当从分类进入详情，再从详情返回分类页面再把数据传回来，使分类页面有数据
    if (this.$route.query.index) {
      this.$store.state.tabnumobj = this.$route.query.index
    }
    console.log(this.tabnumobj);
    console.log(this.classDataArr);
    //从底部栏点击分类，进入分类页面时进行的操作
    if (this.$store.state.fromFooter === true) {
      if (this.$store.state.classDataArr.length === 0) {
        this.classDataAll.forEach(item => {
          if (this.classDataAll.indexOf(item) === 0) {
            this.classDataItem = item;
            this.classDataArr = this.classDataItem.bxMallSubDto;
          }
        });
        this.tabnumobj = 0;
      } else {
        this.classDataArr = this.$store.state.classDataArr
        this.tabnumobj = this.$store.state.tabnumobj
      }
      // this.classDataAll.forEach(item => {
      //   if (this.classDataAll.indexOf(item) === 0) {
      //     this.classDataItem = item;
      //     this.classDataArr = this.classDataItem.bxMallSubDto;
      //   }
      // });
      // this.tabnumobj = 0;
      this.$store.state.fromFooter = false;
    }
    if (this.classDataArr) {
      this.idObj = this.classDataArr[0].mallSubId;
    }
    console.log(this.idObj);
    this.$axios
      .req(`api/classification?mallSubId=${this.idObj}`)
      .then(response => {
        if (response) {
          this.datalist = response.dataList;
          console.log(this.datalist);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {
    this.$nextTick(() => {
      this.personScol2();
    });
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.classification__body {
  margin-bottom: 80px;
  height: 100vh;
  overflow: hidden;
}
.classification__top {
  width: 100vw;
  line-height: 80px;
  text-align: center;
  font-size: 35px;
  border-bottom: 1px solid #ededed;
}
.classification__content {
  display: flex;
  padding-bottom: 100px;
}
.classification__left {
  width: 20vw;
  /*height: 100vh;*/
  background-color: #7d7e80;
}
.left__item {
  font-size: 30px;
  text-align: center;
  line-height: 70px;
}
.classification__right {
  width: 80vw;
}
.right__top {
  display: flex;
}
.right__top__item {
  font-size: 30px;
}
.van-tab__pane,
.van-tab__pane-wrapper {
  padding: 10px;
}
.item__img {
  height: 200px;
}
.datalist {
  display: flex;
}
.item__name {
  color: red;
}
.item__price {
  color: red;
  margin-top: 60px;
  font-weight: bold;
}
.item__old__price {
  text-decoration: line-through;
  font-weight: normal;
  color: black;
}
.left__class {
  color: #47d1d1;
  background-color: white;
}
.van-loading__spinner {
  width: 100vw;
  height: 10vw;
 margin-top: 50%;
}
</style>
