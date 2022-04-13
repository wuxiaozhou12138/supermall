<template>
    <div class="toast" v-show="isShow">
        <div >{{message}}</div>
    </div>
</template>

<script>
    export default {
        name:"Toast",
        data(){
            return {
                message:'',
                isShow:false,
            };
        },
        methods:{
            show(message,druation = 1500){
                this.isShow = true;
                this.message = message;

                setTimeout(() =>{
                    this.isShow = false;
                    this.message = '';
                },druation)
            }
        }
    }
</script>

<style scoped>
    .toast{
        position: fixed;
        left: 50%;
        top: 80%;
        transform: translate(-50%,-50%);
        background-color: rgba(0, 0, 0, 0.65);
        color: #fff;
        padding: 3px 10px;
        border-radius: 8px;
        z-index: 999;
    }
</style>