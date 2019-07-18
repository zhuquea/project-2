<template>
  <div class="details__body">
     <div class="detail__return">
         <van-icon name="arrow-left" size="25px" color="white"/>
     </div>
     <div class="details__second" v-if="detailData.goodsOne">
         <van-swipe :autoplay="3000" indicator-color="white" @change="onChange">
             <van-swipe-item><img :src="detailData.goodsOne.image" alt="" class="details__img"></van-swipe-item>
             <van-swipe-item><img :src="detailData.goodsOne.image_path" alt="" class="details__img"></van-swipe-item>
             <div class="custom-indicator" slot="indicator">
                 {{ current + 1 }}/2
             </div>
         </van-swipe>
     </div>
      <div class="details__name" v-if="detailData.goodsOne">
          {{detailData.goodsOne.name}}
      </div>
      <div class="details__price" v-if="detailData.goodsOne">
          ￥{{detailData.goodsOne.present_price}}
      </div>
      <div class="detail__collection" v-if="detailData">
          <div class="freight">运费：{{detailData.count}}</div>
          <div class="surplus" v-if="detailData.goodsOne">剩余：{{detailData.goodsOne.amount}}</div>
          <div class="collection">收藏:<van-icon name="like-o" size="25px"/></div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  components: {},
  props: {},
  data() {
    return {
      goodsId: "",
        detailData: {},
        current: 0
    };
  },
  methods: {
    getDetailsData() {
      this.$axios
        .req(`api/goods/one?id=${this.goodsId}&page=${1}`)
        .then(response => {
          if (response) {
              this.detailData = response.goods
            console.log(this.detailData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
      onChange (index) {
        this.current = index
      }
  },
  mounted() {
    this.goodsId = this.$route.query.id;
    this.getDetailsData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
    .details__body {
        width: 100vw;
        padding: 20px;
    }
    .detail__return {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #7d7e80;
        text-align: center;
        line-height: 60px;
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
    }
    .details__price {
        width: 100vw;
        font-size: 30px;
        color: #ce272d;
    }
    .detail__collection {
        width: 100vw;
        display: flex;
        align-items: center;
        font-size: 30px;
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
</style>
