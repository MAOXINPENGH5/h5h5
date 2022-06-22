/* app接口模块 */

//引入request 工具函数
import request from '@/utils/request';

/* 获取商品数据 */
export const getGoodsListReq = () => {
    return request({
        method: 'get',
        url: '/goods/goods_list',
    })
}
/* 获取店铺信息 */
export const getShopInfoReq = () => {
    return request({
        method: 'get',
        url: '/shop/seller'
    })
}
/* 获取店铺评论 */
export const getShopRatingsReq = () => {
    return request({
        method: 'get',
        url: '/shop/ratings'
    })
}