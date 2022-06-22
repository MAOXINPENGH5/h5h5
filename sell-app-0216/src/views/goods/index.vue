<template>
  <div class="Goods df">
    <!-- 左侧导航 -->
    <div class="sidebar fn" id="sidebar">
      <van-sidebar v-model="activeKey">
        <!-- $event 子传父的数据 -->
        <van-sidebar-item @click="activeKey = $event;handleLeftClick()"
          v-for="item in navList" :key="item" :title="item" />
      </van-sidebar>
    </div>
    <!-- 右侧内容 -->
    <div class="right-content f1" id="rightContent">
      <div>
        <!-- 商品 -->
        <div class="good-item" :id="'g'+index" v-for="(item,index) in goodsList"
          :key="item.name">
          <h3 class="title">{{item.name}}</h3>
          <!-- 食品 -->
          <van-card v-for="subItem in item.foods" :key="subItem.id"
            class="food-item" :price="subItem.price" :desc="subItem.goodsDesc"
            :title="subItem.name" :thumb="subItem.imgUrl">
            <template #footer>
              <van-stepper v-model="subItem.count" theme="round"
                button-size="22" min="0" max="10" disable-input />
            </template>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
//引入辅助函数
import { mapActions, mapState, mapGetters } from "vuex";
//引入bs
import BScroll from "@better-scroll/core";

@Component({
  computed: {
    ...mapState(["goodsList"]),
    ...mapGetters(["navList"]),
  },
  methods: {
    ...mapActions(["get_goods_list"]),
  },
})
export default class Goods extends Vue {
  activeKey: number = 0; //选中索引
  get_goods_list: any;
  rightScroll: any;
  heightList: Array<number> = []; //装good-item 高度
  loading: boolean = false; //左侧是否点击
  //初始化调用一次
  created() {}
  //mounted生命周期 可以操作dom
  async mounted() {
    await this.get_goods_list();
    this.$nextTick(() => {
      //定时器 保个险
      setTimeout(() => {
        let leftScroll = new BScroll("#sidebar", {
          scrollY: true,
          click: true,
        });
        this.rightScroll = new BScroll("#rightContent", {
          scrollY: true,
          click: true,
          probeType: 3, //派发滚动事件
        });

        /* 
         分析盒子高度 和 索引关系
         0-1 0
         1< <1+2  1
         1+2< 1+2+3 2
         1+2+3< <1+2+3+4 3
         前面盒子的和 <  <前面盒子的和+当前盒子高度  索引就是当前盒子的索引

         先决条件 把所有盒子的高度装进一个数组里面
        */

        //把good-item高度装进数组
        let nodeList = document.querySelectorAll(".good-item");
        nodeList.forEach((v: any) => {
          this.heightList.push(v.clientHeight);
        });

        //监听正在滚动
        this.rightScroll.on("scroll", ({ y }: any) => {
          let py: number = Math.abs(y);
          console.log("this.loading :>> ", this.loading);
          //如果左侧在点击 右侧不需要去监听计算
          if (this.loading) return;

          this.heightList.reduce(
            (total: number, cur: number, index: number): number => {
              // 前面盒子的和 <  <前面盒子的和+当前盒子高度  索引就是当前盒子的索引
              if (py > total && py < total + cur) {
                //把索引赋值给 左侧选中索引
                this.activeKey = index;
              }
              return total + cur;
            },
            0
          );
        });

        //监听滚动结束 把loading还原为false 代表左联动右已结结束
        this.rightScroll.on("scrollEnd", () => {
          this.loading = false;
        });
      }, 200);
    });
  }
  //左侧点击
  handleLeftClick() {
    //右侧滚动到指定位置
    this.rightScroll.scrollToElement("#g" + this.activeKey, 1000, 0, 0);
    //把loading变为true
    this.loading = true;
  }
}
</script>

<style lang="scss">
.right-content {
  overflow-x: hidden;
}
.Goods {
  height: 100%;
}
.good-item {
  .title {
    height: 36px;
    background: #f4f4f4;
    border-left: 4px solid #ddd;
    padding-left: 10px;
    line-height: 36px;
  }
}
</style>