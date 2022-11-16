import dat from './dat.js'
import { getDetailById } from '@/api/equip'
var Dat = dat;
var a = new dat("device",{
    // 設備id
    id: "",
    // 加载事件
    loadAjax (){
        return new Promise((res,req)=>{
            getDetailById({
                device_id: 1
            }).then((e)=>{
                res(e)
            }).catch(()=>{
                req();
            })
        })
    }
})