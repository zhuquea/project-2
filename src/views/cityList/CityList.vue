<template>
  <div class="city__list__body">
    <div class="city__list__first">
      <div class="first__return" @click="cityListReturn">
        <van-icon name="arrow-left" size="20px" color="blue" />
      </div>
      <div class="first__city__list">
        城市列表
      </div>
    </div>
    <div class="city__list__second">
      <van-cell-group class="city__list__van__icon">
        <van-field
          v-model="cityVal"
          placeholder="请输入城市关键字"
          left-icon="search"
          @focus="getFocus"
          @blur="loseBlur"
          @keydown.delete="Delete__Return"
        ></van-field>
      </van-cell-group>
    </div>
    <br><br><br><br><br><br>
    <CityListData
      v-if="showCityListData === true"
      :CityListData2="CityListData2"
    ></CityListData>
    <div v-else-if="showCityListData === false">
      <div class="city__list__third">
        <div class="city__list__third__1">
          当前城市
        </div>
        <div class="city__list__third__2" @click="switch__city1">
          成都市
        </div>
      </div>
      <div class="city__list__fourth">
        <div class="city__list__fourth__1">
          热门城市
        </div>
        <div class="city__list__fourth__2">
          <div class="fourth__2__one" v-if="cityList.hotCities">
            <div
              v-for="(item, index) in cityList.hotCities.slice(0, 3)"
              :key="index"
              class="fourth__2__item"
              @click="switch__city2(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="fourth__2__one" v-if="cityList.hotCities">
            <div
              v-for="(item, index) in cityList.hotCities.slice(3, 6)"
              :key="index"
              class="fourth__2__item"
              @click="switch__city2(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="city__list__fifth">
          <van-index-bar class="index__anchor__Item">
            <div v-for="(item, index) in cityList.cities" :key="index">
              <van-index-anchor :index="index" />
              <div v-for="key in item" :key="key.id" @click="switch__city(key.name)">
                <van-cell :title="key.name" />
              </div>
            </div>
          </van-index-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CityList from "./city";
import CityListData from "../../components/CityListData";
export default {
  name: "CityList",
  components: {
    CityListData
  },
  props: {},
  data() {
    return {
      cityList: {},
      cityVal: "",
      indexArr: [],
      showCityListData: false,
      CityListData: [],
      CityListData2: [], //CityListData子组件之中的数据
      CityListData3: []
    };
  },
  methods: {
    cityListReturn() {
      this.$router.push({ name: "home" });
    },
    getFocus() {
      this.showCityListData = true;
    },
    loseBlur() {
      this.showCityListData = false;
    },
    Delete__Return() {
      this.CityListData2 = this.CityListData3;
    },
    //切换定位城市
    switch__city(cityName) {
      this.$store.state.cityName = cityName
        this.$router.push({name: "home" })
    },
    switch__city1() {
      this.$store.state.cityName = "成都市"
      this.$router.push({name: "home" })
    },
    switch__city2(item) {
      this.$store.state.cityName = item.name
      this.$router.push({name: "home" })
    }
  },
  mounted() {
    this.cityList = CityList.data;
    for (let i in CityList.data.cities) {
      this.CityListData.push(CityList.data.cities[i]);
    }
    this.CityListData.forEach(item => {
      item.forEach(item1 => {
        this.CityListData2.push(item1);
      });
    });
    this.CityListData3 = this.CityListData2;
    console.log(this.CityListData);
    console.log(this.CityListData2);
    console.log(this.cityList);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    cityVal(val) {
      console.log(val);
      this.CityListData2 = this.CityListData2.filter(item => {
        return JSON.stringify(item).indexOf(val) !== -1;
      });
      console.log(this.CityListData2);
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.city__list__body {
  width: 100vw;
}
.city__list__first {
  width: 100vw;
  line-height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: white;
}
.first__return {
  width: 5vw;
  text-align: center;
  display: flex;
  align-items: center;
}
.first__city__list {
  width: 95vw;
  font-size: 30px;
  text-align: center;
}
.city__list__second {
  width: 100vw;
  position: fixed;
  top: 70px;
  z-index: 100;
  background-color: white;
}
.van-cell {
  font-size: 28px;
  line-height: 60px;
}
.city__list__third {
  width: 100vw;
  font-size: 30px;
  position: fixed;
  top: 170px;
  z-index: 100;
  background-color: white;
}
.city__list__third__1 {
  margin-left: 20px;
}
.city__list__third__2 {
  margin-top: 20px;
  margin-left: 20px;
  width: 200px;
  line-height: 40px;
  border: 1px solid darkgrey;
  text-align: center;
}
.city__list__fourth {
  width: 100vw;
  margin-top: 20px;
}
.city__list__fourth__1 {
  font-size: 30px;
  margin-left: 16px;
  position: fixed;
  top: 272px;
  z-index: 100;
  background-color: white;
}
.city__list__fourth__2 {
  width: 100vw;
  position: fixed;
  top: 310px;
  z-index: 100;
  background-color: white;
}
.fourth__2__one {
  width: 100vw;
  display: flex;
}
.fourth__2__item {
  font-size: 30px;
  width: 200px;
  line-height: 40px;
  border: 1px solid darkgrey;
  text-align: center;
  margin-top: 20px;
  margin-left: 20px;
}
  .city__list__fifth {
    padding-top: 270px;
  }
</style>
