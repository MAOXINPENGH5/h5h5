import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//评论接口约束
interface IRate {
  avatar: string
  rateTime: number
  rateType: number
  text: string
  username: string
}
//食品约束
interface IFood {
  category: string
  ctime: string
  goodsDesc: string
  id: number
  imgUrl: string
  name: string
  price: number
  rating: number
  ratings: Array<IRate>
  sellCount: number
  count?: number //选中食品
}
//商品约束
interface IGood {
  name: string
  foods: Array<IFood>
}

//引入ajax函数
import { getShopInfoReq, getGoodsListReq } from "@/api/goods";

export default new Vuex.Store({
  state: {
    //店铺信息
    shopInfo: {},
    //商品数据
    goodsList: []
  },
  getters: {
    //侧边导航
    navList(state) {
      return state.goodsList.map((v: IGood) => v.name)
    },
    //赛选已经选中的食品
    filterFoods(state) {
      let temp: Array<IFood> = []
      state.goodsList.forEach((v: IGood) => {
        v.foods.forEach((subV: IFood) => {
          // 非空断言
          if (subV.count! > 0) {
            temp.push(subV)
          }
        })
      })
      return temp
    },
    //已赛选食品的总数量
    filterFoodsCount(state, getters) {
      return getters.filterFoods.reduce((total: number, cur: IFood): number => {
        return total + cur.count!
      }, 0)
    }
  },
  mutations: {
    //mutaions里面的方法 可以同步修改state数据
    SET_SHOP_INFO(state, payload) {
      state.shopInfo = payload
    },
    SET_GOODS_LIST(state, payload) {
      state.goodsList = payload
    }
  },
  actions: {
    //获取店铺信息
    get_shop_info({ commit }) {
      return new Promise(async (resolve) => {
        //发送请求
        let res = await getShopInfoReq()
        //解构数据
        let { data } = res.data
        //数据赋值 commit调用mutations里面的方法去修改state的数据
        commit('SET_SHOP_INFO', data)
        resolve(data)
      })
    },
    //获取商品数据
    get_goods_list({ commit }) {
      return new Promise(async (resolve) => {
        //发送请求
        let res = await getGoodsListReq()
        //解构数据
        let { goodsList } = res.data;
        //修改数据 添加选中字段初始值0
        goodsList.forEach((v: IGood) => {
          v.foods.forEach((subV: IFood) => {
            subV.count! = 0
          })
        })

        //commit调用mutations里面的同步方法 同步修改state数据
        commit('SET_GOODS_LIST', goodsList)
        resolve(goodsList)
      })
    }
  },
  modules: {
  }
})
