<template>
  <div class="Home">
    <!-- 头部 -->
    <div class="header df" v-if="Object.keys(shopInfo).length"
      :style="{'background-image': `url(${shopInfo.avatar})`}">
      <img :src="shopInfo.avatar" class="avatar" alt="">
      <div class="info">
        <h3>{{shopInfo.name}}</h3>
      </div>
      <van-notice-bar background='rgba(0,0,0,.7)' left-icon="volume-o"
        :text="shopInfo.bulletin" />
    </div>
    <!-- 内容 -->
    <div class="main df fdc">
      <!-- 导航 -->
      <!-- color 主体颜色 下滑条 -->
      <!-- title-active-color选中字体颜色 -->
      <!-- to 相当于router-link to -->
      <!-- title 标题 -->
      <!-- name 绑定字符串 赋值是当前地址 -->
      <!-- v-model 获取当前地址 与name属性的值匹配  -->
      <van-tabs class="fn" duration='.1' color='#fcc40b'
        title-active-color='#fcc40b' v-model="active">
        <van-tab :to='item.path' :name='item.path' :title="item.title"
          v-for="item in navList" :key="item.path">
        </van-tab>
      </van-tabs>
      <!-- 二级路由出口 -->
      <div class="content f1">
        <router-view></router-view>
      </div>
    </div>
    <!-- 购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon :badge="filterFoodsCount"
        @click="filterFoodsCount && showPop()" icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

    <!-- 弹窗 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <!-- 食品 -->
      <van-card v-for="subItem in filterFoods" :key="subItem.id"
        class="food-item" :price="subItem.price" :desc="subItem.goodsDesc"
        :title="subItem.name" :thumb="subItem.imgUrl">
        <template #footer>
          <van-stepper v-model="subItem.count" theme="round" button-size="22"
            min="0" max="10" disable-input />
        </template>
      </van-card>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
//引入mapActions
import { mapActions, mapState, mapGetters } from "vuex";
interface INav {
  path: string;
  title: string;
}

//装饰器 里面可以写vue2语法
@Component({
  computed: {
    ...mapState(["shopInfo"]),
    ...mapGetters(["filterFoods", "filterFoodsCount"]),
  },
  methods: {
    ...mapActions(["get_shop_info"]),
  },
})
export default class Home extends Vue {
  active: string = this.$route.path;
  get_shop_info: any; //函数占位
  show: boolean = false; //弹窗
  navList: Array<INav> = [
    {
      path: "/home/goods",
      title: "商品",
    },
    {
      path: "/home/comment",
      title: "评价",
    },
    {
      path: "/home/shop",
      title: "商家",
    },
  ];
  created() {
    //初始化发请求
    this.get_shop_info();
  }
  //显示购物车
  showPop() {
    this.show = !this.show;
  }
}
</script>

<style lang="scss" scoped>
.van-goods-action {
  width: 10rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  box-shadow: -4px 0 6px #ddd;
}
::v-deep .van-overlay {
  width: 10rem;
  left: 50%;
  transform: translateX(-50%);
}
.van-popup {
  width: 10rem;
  left: 50%;
  margin-left: -5rem;
  padding-bottom: 80px;
}
.content {
  overflow: hidden;
}
.header {
  height: 240px;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 40px;
  padding-left: 40px;
  position: relative;
  &::before {
    content: "";
    position: absolute; /* 一定要用绝对定位 */
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    left: 0;
    top: 0;
    border-radius: 15px; /* 这里记得给遮罩层加一个圆角！！！ */
    backdrop-filter: blur(5px); /* 模糊半径 */
  }

  .info {
    position: relative;
    color: white;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin-right: 20px;
    position: relative;
  }
  .van-notice-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
.main {
  height: 100vh;
  // background: darkcyan;
}
</style>