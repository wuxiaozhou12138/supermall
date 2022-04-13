export default {
    addCart(state,payload){
        // payload新添加的商品
        let oldProduct = null;
        for(let item of state.cartList){
            if(item.iid === payload.iid){
                oldProduct = item;
            }
        }
        // 判断oldProduct
        if(oldProduct){
            oldProduct.count += 1;
        }else{
            payload.count = 1;
            payload.checked = true;
            state.cartList.push(payload);
        }
    }
}