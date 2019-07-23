<template>
  <div class="classification__body">
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
<!--                <div class="datalist__scroll" ref="personWrap2">-->
<!--                    <div>-->
<!--                        <div v-for="(item, index) in datalist" :key="index" class="datalist">-->
<!--                            <img :src="item.image" alt="" class="item__img" />-->
<!--                            <div>-->
<!--                                <div class="item__name">{{ item.name }}</div>-->
<!--                                <div class="item__price">-->
<!--                                    ￥{{ item.present_price }}-->
<!--                                    <span class="item__old__price">{{ item.orl_price }}</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
              <div
                v-for="(item, index) in datalist"
                :key="index"
                class="datalist"
              >
                <img :src="item.image" alt="" class="item__img" @click="jump__details(item)"/>
                <div>
                  <div class="item__name">{{ item.name }}</div>
                  <div class="item__price">
                    ￥{{ item.present_price }}
                    <span class="item__old__price">{{ item.orl_price }}</span>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    // import BScroll from "better-scroll"
export default {
  name: "Classification",
  components: {},
  props: {},
  data() {
    return {
      classDataArr: [],
      classDataAll: [],
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
        this.activeObj = 0
      this.classDataAll.forEach(item => {
        if (this.classDataAll.indexOf(item) === index) {
          this.classDataItem = item;
          this.classDataArr = this.classDataItem.bxMallSubDto;
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
              query: {id: item.id}
          })
      }
  },
  mounted() {
    // this.classDataAll = JSON.parse(localStorage.getItem('category'))
    this.classDataAll = this.$route.query.categroy;
    console.log(this.classDataAll);
    this.classDataArr = this.$route.query.bxMallSubDto;
      console.log(this.classDataArr);
      this.tabnumobj = this.$route.query.index;
    console.log(this.tabnumobj);
    console.log(this.classDataArr);
    if (!this.$route.query.bxMallSubDto) {
      this.classDataAll.forEach(item => {
        if (this.classDataAll.indexOf(item) === 0) {
          this.classDataItem = item;
          this.classDataArr = this.classDataItem.bxMallSubDto;
        }
      });
      this.tabnumobj = 0;
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
}
.classification__left {
  width: 20vw;
    height: 100vh;
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
</style>
