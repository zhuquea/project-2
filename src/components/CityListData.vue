<template>
  <div>
    <div
      v-for="(item, index) in CityListData2"
      :key="index"
      class="CityList__Data"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CityListData",
  components: {},
  props: {
    CityListData2: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.CityList__Data {
  font-size: 30px;
  margin-top: 10px;
  margin-left: 20px;
}
</style>
