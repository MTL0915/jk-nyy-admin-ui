<template>
    <div class='componentsPage' >
        <div class='btns' :title='page < 2 ? "已经是首页了" : "上一页"' :class='{stop: page < 2}' @click='prev'>上一页</div>
        <div class='btns' @click='btnsClick(it)' :testa='page + "____" + it' :class='{active: it === page}' v-for='(it, i) in pages' :key='i'>{{it}}</div>
        <div class='btns' :title='page > max - 1 ? "已经是最后一页了" : "下一页"' :class='{stop: page > max - 1}' @click='next'>下一页</div>
    </div>
</template>

<script>
export default {
    props: {
        // 最大页码
        max: {
            type: Number,
            default: 1
        },
        change: {
            type: Function,
            default: ()=>{}
        },
        // 同时出现的页码个数
        count: {
            type: Number,
            default: 5
        },
    },
    watch: {
        max () {
            if (this.max > 0) {
                this.setPage(1)
            }
        }
    },
    data (){
        return {
            page: 0,
            pages: [],
        }
    },
    mounted (){
        
    },
    methods: {

        setPage (i){
            this.page = i;
            this.initPage(i)
        },

        initPage (i){
            if( i < 1 ){ i = 1 };
            if( i > this.max ){ i = this.max };
            this.createDom(i);
        },

        createDom (i){
            var count = this.count;
            var pages = [];
            var index = 3;
            // 先判断一共有
            if( i - Math.round(count / 2) < 1 ){ index = 1 }
            // 判断是否超出上限
            else if( i + Math.round(count / 2) > this.max ){ index = this.max - count + 1 }
            else { index = i - Math.round(count / 2) + 1 }
            // 创建页码
            for( var e = 0;e < 5; e++ ){
                var it = index + e;
                pages.push(it);
                // 如果添加的页码已经大于等级最大页码了 则停止
                if( it >= this.max ){
                    break;
                }
            }
                
            // 赋值
            this.pages = pages;
        },

        // 翻页
        btnsClick (i){
            this.setPage(i);
            this.change(i);
        },

        prev (){
            if( this.page >= 2 ){
                this.setPage(this.page - 1);
                this.change(this.page);
            }
        },

        next (){
            if( this.page <= this.max - 1 ){
                this.setPage(this.page + 1);
                this.change(this.page);
            }
        }
    }
}
</script>

<style> 

    .componentsPage * {
        user-select: none   ;
    }

    .componentsPage {
        display:flex;
        justify-content: space-between;
        width: 100%;
        padding: 15px;
    }

    .componentsPage .btns.stop {
        color:#333333;
        cursor: not-allowed;
    }

    .componentsPage .btns {
        padding: 8px;
        cursor: pointer;
        color: #000000;
        border-radius: 4px;
    }

    .componentsPage .btns:hover, .componentsPage .btns.active {
        background:#3e3e3e;
        color:#ffffff;
    }   

</style>
