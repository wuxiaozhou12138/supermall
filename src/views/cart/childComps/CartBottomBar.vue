<template>
    <div class="bottom-bar">
        <div class="check-left">
            <check-button :isChecked="isSelectAll" @click.native="checkClick"></check-button>
            <span >全选</span>
        </div>
        <div class="total">合计：{{totalPrice}}</div>
        <div class="calclate" @click="calcClick">去结算（{{checkedLength}}）</div>
    </div>
</template>

<script>
    import CheckButton from './CheckButton.vue'

    export default {
        name:"CartBottomBar",
        components:{
            CheckButton,
        },
        data(){
            return {
                cartList:this.$store.state.cartList,
                isTotalChecked:false,
            }
        },
        computed:{
            totalPrice(){
                return "￥" + this.cartList.filter(item => {
                    return item.checked
                }).reduce((Prevalue,item) => {
                    return Prevalue + item.price * item.count
                },0).toFixed(2)
            },
            checkedLength(){
                return this.cartList.filter(item => {
                    return item.checked
                }).length
            },
            isSelectAll(){
                if (!this.cartList.length) return false;
                return !(this.cartList.filter(item => !item.checked).length)
            }
        },
        methods:{
            checkClick(){
                if(this.isSelectAll){
                    this.cartList.forEach(item => {
                        item.checked = false;
                    });
                }else{
                    this.cartList.forEach(item => {
                        item.checked = true;
                    })
                }
            },
            calcClick(){
                if(!this.isSelectAll){
                    this.$toast.show('请选择需要购买的商品',2000)
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        height: 40px;
        background-color:#eee;
        position: relative;
        display: flex;
        justify-content: space-between;
        line-height: 40px;
    }
    .check-left{
        height: 40px;
        display: flex;
        align-items: center;
        margin-left: 5px;
        flex: 0.4;
    }
    .check-left span{
        margin-left: 5px;
    }
    .total{
        flex: 1;
        text-align: left;
    }
    .calclate{
        flex: 0.6;
        color: #fff;
        background-color:#ff8198 ;
        text-align: center;
    }
</style>