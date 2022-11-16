var camera = [
    {
        info : {
            name : "依山蔬菜基地",
            id : "1",
            path : "ryx_dqz_ysscjd",
        },
        anchor : [
            { name : "测试标点1", type : "0" , link : "https://www.baidu.com" , scenes : "1", x: -606.6743012698381 ,y: -4.848867093468724 ,z: -794.9357085114893 },
            { name : "测试标点1", type : "1" , link : "https://www.baidu.com" , scenes : "2", x: 459.8962397417829 ,y: -30.978762774204593 ,z: -887.4321184903937 },
        ]
    },
    {
        info : {
            name : "嘉农蔬菜基地",
            id : "2",
            path : "ryx_dqz_jnscjd",
        },
        anchor : [
            { name : "测试标点1", type : "0" , link : "https://www.baidu.com" , scenes : "1", x: -606.6743012698381 ,y: -4.848867093468724 ,z: -794.9357085114893 },
            { name : "测试标点1", type : "1" , link : "https://www.baidu.com" , scenes : "2", x: 459.8962397417829 ,y: -30.978762774204593 ,z: -887.4321184903937 },
        ]
    },
    {
        info : {
            name : "水都蔬菜基地",
            id : "3",
            path : "ryx_dqz_sdscjd",
        },
        anchor : [
            { name : "测试标点1", type : "0" , link : "https://www.baidu.com" , scenes : "1", x: -606.6743012698381 ,y: -4.848867093468724 ,z: -794.9357085114893 },
            { name : "测试标点1", type : "1" , link : "https://www.baidu.com" , scenes : "2", x: 459.8962397417829 ,y: -30.978762774204593 ,z: -887.4321184903937 },
        ]
    },
    {
        info : {
            name : "水都蔬菜基地2",
            id : "4",
            path : "ryx_dqz_sdscjd",
        },
        anchor : [
            { name : "测试标点1", type : "0" , link : "https://www.baidu.com" , scenes : "1", x: -606.6743012698381 ,y: -4.848867093468724 ,z: -794.9357085114893 },
            { name : "测试标点1", type : "1" , link : "https://www.baidu.com" , scenes : "2", x: 459.8962397417829 ,y: -30.978762774204593 ,z: -887.4321184903937 },
        ]
    },
    {
        info : {
            name : "金穗蔬菜基地",
            id : "5",
            path : "ryx_dqz_jhscjd",
        },
        anchor : [
            { name : "测试标点1", type : "0" , link : "https://www.baidu.com" , scenes : "1", x: -606.6743012698381 ,y: -4.848867093468724 ,z: -794.9357085114893 },
            { name : "测试标点1", type : "1" , link : "https://www.baidu.com" , scenes : "2", x: 459.8962397417829 ,y: -30.978762774204593 ,z: -887.4321184903937 },
        ]
    },
    {
        info : {
            name : "石岗村蔬菜基地",
            id : "6",
            path : "ryx_dqz_sgcscjd",
        },
        anchor : [
            { name : "测试标点1", type : "0" , link : "https://www.baidu.com" , scenes : "1", x: -606.6743012698381 ,y: -4.848867093468724 ,z: -794.9357085114893 },
            { name : "测试标点1", type : "1" , link : "https://www.baidu.com" , scenes : "2", x: 459.8962397417829 ,y: -30.978762774204593 ,z: -887.4321184903937 },
        ]
    },
]

var getCameraById = function(id,fn){
    var v;
    if( id === "all" ){
        v = camera;
    }else{
        v = camera.find((e)=>{ return e.info.id === id })
    }
    fn && fn(v)
    return v;
}

export { getCameraById }