import { request } from "./request.js"

export function getHomeData(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return request({
        url:'home/data',
        params:{
            // type和page的属性值是形参的值，这里可以简写
            type,
            page
        }
    })
}