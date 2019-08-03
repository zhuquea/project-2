export default {
  user: "",
  category: [],
  details_login: true,
  showOut: true,
  returnMember: false,
  shopping_Cart: [],
  shopping_Cart1: [],
  shopping_Cart2: [],
  shopping_Cart3:[],
  userData: {},
  receiveAddress: [],
  idOrder: "",
  orderData: {},
  valueObj: 0,
  orderSettleId: [],
  to_orderSettle: false,
  to_orderSettle2: false,
  returnShoppingCart: false,
  isAnonymous: false,
  recentBrowsingData: [],
  cityName: "城市",
  //return_Class为ture时从详情页点返回会回到分类页，只有在从分类也进入详情页时才会变为true
  return_Class: false,
  //isLocation为false时才会让首页进行定位，定位完成后马上变成true，再要跳转到登录界面时都会被变为false
  isLocation: false,
  //从分类页面进入详情页面，在从详情也返回是需要用到 classDataAll，classDataArr，tabnumobj
  classDataAll: [],
  classDataArr: [],
  tabnumobj: 0,
  //isLogin为true时才让会员中心页面可以获取用户信息，只有当登录注册成功后才会变为true
  isLogin: false,
  fromFooter: false,
  //从收藏页面进入详情页面，再从详情页返回时，为了保证会返回到收藏页面要将fromCollection = true
  fromCollection: false
};
