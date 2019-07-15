<template>
  <div>
    <div class="First">
      <div class="app1">
        <select name="" id="">
          <option value="">成都市</option>
        </select>
      </div>
      <div class="app2">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
        >
          <div slot="action" @click="onSearch" class="first__search">搜索</div>
        </van-search>
      </div>
    </div>
    <div v-if="HomeData.advertesPicture">
      <van-swipe :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in HomeData.slides" :key="index"
          ><img :src="item.image" alt="" class="Rotary_Planting_Map"
        /></van-swipe-item>
      </van-swipe>
      <div class="Home__category">
        <div v-for="(item,index) in HomeData.category" :key="index" class="category__item">
          <img :src="item.image" alt="" class="category__img">
          <div>{{item.mallCategoryName}}</div>
        </div>
      </div>
      <img
        :src="HomeData.advertesPicture.PICTURE_ADDRESS"
        alt=""
        class="imgtu"
      />
    </div>
      <div class="recomend">商品推荐</div>

  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      HomeData: {}
    };
  },
  methods: {
    onSearch() {},
    getrecommend() {
      this.$axios
        .req("api//recommend")
        .then(response => {
          if (response) {
            this.HomeData = response.data;
            console.log(this.HomeData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getrecommend();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.First {
  height: 50px;
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  align-items: center;
}
.app2 {
  width: 100%;
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
  display: inline-block;
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
  flex: 1;
  }
  .recomend {
    font-size: 30px;
  }
  .recomend {
    margin-left: 20px;
  }
</style>
