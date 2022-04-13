import {request} from './request';

export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid,
        }
    })
}

// 请求推荐内容的函数
export function getRecommend(){
    return request({
        url:'http://152.136.185.210:7878/api/hy66/recommend'
    })
}

// 商品基本信息
export class Goods{
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

// 店铺信息
export class Shop {
	constructor(shopInfo) {
	    this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
		this.score = shopInfo.score;
		this.sells = shopInfo.cSells;
		this.goodsCount = shopInfo.cGoods;
	}
}

//参数信息
export class GoodsParam {
	constructor(info, rule) {
        this.image = info.images ? info.images[0] : "";
	    this.infos = info.set;
		this.rules = rule.tables;
	}
}


