<template>
  <div class="address__list__body">
    <div class="address__list__first">
      <div class="first__return" @click="addressReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__address">
        地址列表
      </div>
    </div>
    <div v-if="this.$store.state.receiveAddress.length === 0">
      <div class="address__list__second">
        暂无收货地址
      </div>
      <van-button
        type="danger"
        class="address__list__third"
        @click="address__Add"
        >新增地址</van-button
      >
    </div>
    <div
      class="address__list__second2"
      v-else-if="this.$store.state.receiveAddress.length > 0"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="receiveAddress"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      ></van-address-list>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "AddressList",
  components: {},
  props: {},
  data() {
    return {
      disabledList: [],
      chosenAddressId: ""
    };
  },
  methods: {
    addressReturn() {
      if (this.$store.state.returnMember === false) {
        if (this.$store.state.to_orderSettle2 === true) {
             this.$router.push({name: "orderSettlement"})
          this.$store.state.to_orderSettle = true
          this.$store.state.to_orderSettle2 = false
        }else if (this.$store.state.to_orderSettle2 === false) {
          this.$router.push({
            name: "orderSettlement",
            query: {
              idOrder1: this.$store.state.idOrder,
              orderData1: this.$store.state.orderData,
              valueObj1: this.$store.state.valueObj
            }
          });
        }
      } else if (this.$store.state.returnMember) {
        this.$store.state.returnMember = false;
        this.$router.push({ name: "membership" });
      }
    },
    address__Add() {
      this.$router.push({ name: "editAddress" });
    },
    getAddressData() {
      this.$axios
        .req("api/getAddress")
        .then(response => {
          if (response.code === 200) {
            this.$store.state.receiveAddress = response.address;
            this.$store.state.receiveAddress.forEach(item => {
              item.id = item._id;
            });
            this.chosenAddressId = response.address[0].id;
            // console.log(this.$store.state.receiveAddress[0].id);
            // console.log(this.$store.state.receiveAddress);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onAdd() {
      this.$router.push({ name: "editAddress" });
    },
    onEdit(item, index) {
      console.log(item);
      console.log(index);
      this.$router.push({ name: "editAddress", query: { item: item } });
    },
    onSelect() {
      this.$axios
        .req("api/setDefaultAddress", { id: this.chosenAddressId })
        .then(response => {
          if (response.code === 200) {
            Toast({
              message: "设置默认地址成功",
              type: "success",
              duration: 2000
            });
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getAddressData();
  },
  created() {},
  filters: {},
  computed: {
    receiveAddress() {
      return this.$store.state.receiveAddress;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.address__list__body {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.address__list__first {
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
.address__list__second {
  width: 100vw;
  line-height: 300px;
  font-size: 30px;
  color: #d8d8d8;
  text-align: center;
}
.address__list__third {
  width: 100vw;
  height: 80px;
  font-size: 30px;
  position: absolute;
  bottom: 0px;
}
.van-button--large {
  height: 80px !important;
}
.van-button {
  font-size: 30px !important;
}
.van-address-item__address {
  line-height: 50px !important;
}
</style>
