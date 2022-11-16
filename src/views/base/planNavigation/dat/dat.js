import incident from '../bll/incident.js'
let dats = []; // 已创建的全部数据集

class dat {
			
    constructor (name,option = {}){
        // super();
        this.name = name;                        //数据名称
        this.__dependOn = option.__dependOn || 0 //加载优先级别 (暂时还想不到用处 先放着)
        this.__loaded = false;                   //是否已经加载完毕
        this.__loading = false;                  //是否已經在加載中
        this.__data = null;                      //数据集数据

        // 监听数据加载完成事件
        this.onload = new incident()

        // 监听数据变化事件
        this.onchangeData = new incident()

        dat.setDats(this);
        this.setOption(option);
    }

    setOption (option){
        // 处理一下扩展重写的属性
        for( var i in option){
            this[i] = option[i];
        }
    }

    loadAjax (){
        return new Promise((suc,req)=>{
            suc([]);
        })
    }

    load (){
        // 开始加载获取数据
        return new Promise((suc)=>{
            this.__loading = true;
            this.loadAjax().then((data)=>{
                this.__loading = false;
                this.setData(data);
                this.onload(data);
            });
        });
    }

    setData (data){
        this.__data = data;
        this.onchangeData(data,this.getData());
    }

    getData (){
        // 获取数据
        return new Promise((suc)=>{
            if( this.__loaded ){
                // 如果已经加载完毕了
                suc(this.__data);
            }else if( this.__loading ){
                this.onload(()=>{
                    suc(this.__data);
                    return 'remove';
                })
            }
        })
    }

    static setDats (dat){
        dats.push(dat);
    }

    /** 启动加载
     *  这个是整体加载
     */
    static load (){
        return new Promise((suc,err)=>{
            var len = dats.length;
            // 首先根据加载优先进行排序
            for( var i = 0; i < dats.length ; i++ ){
                var it = dats[i];
                // 启动数据集加载
                it.load().then(()=>{
                    len--;
                    len == 0 && suc(dats)
                }).catch(()=>{
                    len--;
                    len == 0 && suc(dats)
                });
            }
        })
    }

    /** 获取数据合集
     *  合集对象
     */
    static get (name){
        return new Promise((suc)=>{
            var dat = dats.find((e)=> { return e.name == name; })
            if( dat.__loaded ){
                // 如果数据已经加载完毕了
                suc()
            }else{
                dat.onload(()=>{
                    suc(dat.getData());
                    // 只执行一次
                    return "remove"
                })
            }
        })
    }

    static GET_VUE_DATA (json,ary){
        var j = {};
        for( var i in json ){
            j[i] = json[i];
        }
        for( let i in dats ){
            if( ary.indexOf(dats[i].name) > -1 ){
                j[dats[i].name] = null;
                dats[i].getData().then((data)=>{
                    j[dats[i].name] = data;
                })
            }
        }
        return j;
    }

    static onload (ary, fns){
        var len = ary.length;
        var datsData = [];
        for( var i in dats ){
            if( ary.indexOf(dats[i].name) > -1 ){
                datsData.push(dats[i]);
                // 如果是存在的数据
                if( dats[i].__loaded ){
                    // 如果已经是加载成功了
                    len --;
                }else{
                    dats[i].onload(()=>{
                        len --;
                        if( len == 0 ){
                            fns.apply(this,datsData.map(()=>{ return e ? e.__data : null }))
                        }
                        return 'remove'
                    })
                }
            }else{
                len --;
                datsData.push(null);
            }
            if( len == 0 ){
                fns.apply(this,datsData.map(()=>{ return e ? e.__data : null }))
            }
        }
    }

}

export default dat