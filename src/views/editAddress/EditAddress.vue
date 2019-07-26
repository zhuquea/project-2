<template>
  <div class="edit__address__body">
    <div class="edit__list__first">
      <div class="first__return" @click="EditAddressReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__address">
        编辑地址
      </div>
    </div>
    <div class="edit__address__second">
      <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave1"
        @delete="onDelete"
        v-if="this.$route.query.item"
        :address-info="editItem"
      ></van-address-edit>
      <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        v-else
      ></van-address-edit>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import areaList from "./area";
export default {
  name: "EditAddress",
  components: {},
  props: {},
  data() {
    return {
      areaList: {},
      searchResult: [],
      editItem: {}
    };
  },
  methods: {
    EditAddressReturn() {
      this.$router.push({ name: "addressList" });
    },
    onSave(name) {
      console.log(name);
      let str = name.province + name.city + name.county + name.addressDetail;
      axios
        .post("api/address", {
          name: name.name,
          tel: name.tel,
          isDefault: name.isDefault,
          province: name.province,
          city: name.city,
          county: name.county,
          addressDetail: name.addressDetail,
          areaCode: name.areaCode,
          address: str
        })
        .then(response => {
          if (response) {
            Toast({
              message: "添加地址成功",
              type: "success",
              duration: 2000
            });
            this.$router.push({ name: "addressList" });
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
      // this.$router.push({ name: "addressList" })
    },
    onDelete() {
      this.$axios
        .req("api/deleteAddress", { id: this.editItem._id })
        .then(response => {
          if (response) {
            Toast("删除成功");
            this.$router.push({ name: "addressList" });
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSave1(name) {
      console.log(name);
      axios
        .post("api/address", {
          name: name.name,
          tel: name.tel,
          isDefault: name.isDefault,
          province: name.province,
          city: name.city,
          county: name.county,
          addressDetail: name.addressDetail,
          areaCode: name.areaCode,
          address: name.address,
          id: name._id
        })
        .then(response => {
          if (response.code === 200) {
            Toast({
              message: "修改成功",
              type: "success",
              duration: 2000
            });
            this.$router.push({ name: "addressList" });
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.areaList = areaList;
    if (this.$route.query.item) {
      this.editItem = this.$route.query.item;
    }
    console.log(this.editItem);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.edit__address__body {
  width: 100vw;
  height: 100vh;
}
.edit__list__first {
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
.first__address {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
</style>
