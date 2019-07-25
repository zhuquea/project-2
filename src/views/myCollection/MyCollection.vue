<template>
  <div class="myCollection__body">
    <div class="myCollection__first">
      <div class="first__return" @click="collectionReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__collection">
        我的收藏
      </div>
    </div>
    <div class="myCollection__second">
      <div
        v-for="(item, index) in collectionData"
        :key="item.cid"
        class="second__collection__item"
      >
        <img :src="item.image_path" alt="" class="my__collection__image" />
        <div class="second__1__div">
          <div class="collection__item__name">
            {{ item.name }}
          </div>
          <div class="collection__item__price">￥{{ item.present_price }}</div>
        </div>
        <div class="second__2__div" @click="cancel_Collection(item)">
          ×
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "MyCollection",
  components: {},
  props: {},
  data() {
    return {
      collectionData: []
    };
  },
  methods: {
    collectionReturn() {
      this.$router.push({ name: "membership" });
    },
    getCollectionData() {
      this.$axios
        .req(`api/collection/list`)
        .then(response => {
          if (response.code === 200) {
            this.collectionData = response.data.list;
            console.log(response.data);
            console.log(this.collectionData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel_Collection(item) {
      this.$axios
        .req("api/cancelCollection", { id: item.cid })
        .then(response => {
          if (response) {
            Toast({
              message: "取消收藏成功",
              type: "fail",
              duration: 2000
            });
            this.getCollectionData();
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCollectionData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.myCollection__body {
  width: 100vw;
}
.myCollection__first {
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
.first__collection {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.myCollection__second {
  width: 100vw;
}
.second__collection__item {
  width: 100vw;
  display: flex;
  position: relative;
}
.my__collection__image {
  height: 200px;
}
.second__1__div {
  margin-left: 20px;
}
.collection__item__name {
  font-size: 30px;
  margin-top: 30px;
}
.collection__item__price {
  font-size: 30px;
  color: #e0322b;
  margin-top: 50px;
}
.second__2__div {
  width: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #d3d3d4;
  border-radius: 50%;
  font-size: 40px;
  position: absolute;
  right: 20px;
  bottom: 50px;
  color: #7d7e80;
}
</style>
