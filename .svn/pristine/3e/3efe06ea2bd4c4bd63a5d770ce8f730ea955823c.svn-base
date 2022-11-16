<template>
    <div class='vr_edit'>
        <div> 编辑锚点 </div>
        <div>  
            <div class='model'>
                <div class='name'>名称</div>
                <div class='value'>
                    <input type='text' v-model="data.name" />
                </div>
            </div>
            <div class='model'>
                <div class='name'>类型</div>
                <div class='value'>
                    <select v-model='data.type'>
                        <option :value='it.id' v-for="(it,u) in v" :key='u'>{{it.name}}</option>
                    </select>
                </div>
            </div>
            <div class='model' v-show='data.type=="0"'>
                <div class='name'>超链接</div>
                <div class='value'>
                    <input type='text' v-model="data.link" />
                </div>
            </div>
            <div class='model' v-show='data.type=="1"'>
                <div class='name'>选择场景</div>
                <div class='value'>
                    <select v-model="data.scenes">
                        <option>全景图1</option>
                        <option>全景图2</option>
                        <option>全景图3</option>
                        <option>全景图4</option>
                        <option>全景图5</option>
                        <option>全景图6</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            v : [ { id : "0" , name : "超链接" },{ id : "1" , name : "转场" } ],
            data : {
                type : "0",
                scenes : "",
                link : "",
                name : ""
            },
            anchor : null
        }
    },
    methods : {
        set ( obj ){
            this.anchor = obj;
            this.data = obj.data;
        }
    }
}
</script>

<style>
    .vr_edit {
        position: absolute;
        padding: 8px 15px;
        color: #00a1ff;
        background: #ffffff;
        border-radius: 4px;
        top: 8px;
        right: 8px;
        width: 250px;
    }

    .vr_edit .model {
        padding: 5px;
        display: flex;
        align-items: center;
    }

    .vr_edit .model .name {
        width: 100px;
        font-size: 12px;
    }

    .vr_edit .model .value {
        width: 100%;
    }

    .vr_edit .model input, .vr_edit .model select {
        border-radius: 4px;
        border: solid 1px #01a7f6;
        padding: 5px;
        outline: none;
        width: 100%;
    }

</style>