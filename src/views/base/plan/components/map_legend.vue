<template>

  <!-- 图例 -->
    <div ref='legend' style="width:180px;border:1px solid #66697540;padding:5px;color:#FFF;position:absolute;bottom:0;right:100px;background:rgba(53, 66, 97, 0.65)">
			<div style="width: 100%;text-align: center;padding-bottom: 10px;font-size:15px;border-bottom:1px solid grey;line-height: 20px;">图例</div>
      <i class='el-icon-caret-bottom close_legend' @click='close_legend' v-show='is_close_legend'></i>
      <i class='el-icon-caret-right close_legend' @click='close_legend' v-show='!is_close_legend'></i>
			<div style="width:100%;padding-left:15px" v-show='is_close_legend'>
			<div style='height: 20px;margin-top:15px'>
				<div style="float:left;width:25px;">
					<div style="width:20px;height:10px;background:#4f787b00;border:1px solid #ffffff"></div>
				</div>
				<div style="float:left;margin-left:20px">基地</div>
			</div>
      <div>
        <div style="clear: both;height: 20px;margin-top:5px" v-for='(it,i) in dk' :key='i'>
          <label>
            <div style="float:left;width:25px;">
              <div style="width:20px;height:10px;background:#4f787b00;border:1px solid #ffffff"></div>
            </div>
            <div style="float:left;margin-left:20px">{{it}}</div>
            <input checked='checked' style='position:absolute;left: 0;' @change="filter(it,$event.target.checked);" type='checkbox' />
          </label>
        </div>
      </div>
      <div>
        <div style="clear: both;height: 20px;margin-top:5px" v-for='(it,i) in sb' :key='i'>
          <label>
            <div style="float:left;width:25px;">
                <img :src='"/static/img/Plan/sbIcon/"+icon.find((e)=>{ return e.name === it }).type+"_1.png"' style='width:16px;height: 16px;' />
            </div>
            <div style="float:left;margin-left:20px;line-height: 19px;">{{it}}</div>
            <input checked='checked' style='position:absolute;left: 0;' @change="filter(it,$event.target.checked);" type='checkbox' />
          </label>
        </div>
      </div>
      <div>
        <div style="clear: both;height: 20px;margin-top:5px">
          <label>
            <div style="float:left;width:25px;">
                
            </div>
            <div style="float:left;margin-left:20px;line-height: 19px;">设备名</div>
            <input style='position:absolute;left: 0;' @change="filterName(it,$event.target.checked);" type='checkbox' />
          </label>
        </div>
      </div>
		</div>
  </div>

</template>

<script>
import ajaxApi from '@/api/map.js'
import graphicShowName from '@/views/base/plan/mapUtil/graphicShowName'
export default {
  name: 'MapLegned',
  props: {
    data: Object
  },
  data() {
    
    return {
      name: 'mapLegned',
      sbData : [],
      sb : [],
      dk : [],
      is_close_legend : param.is_close_legend === undefined ? true : !!JSON.parse(param.is_close_legend),

    }
  },
  methods: {
    filterName (name,bool){
      
      if( bool ){
        this.$parent.mapData.jd[0].sb.forEach((e)=>{
          if( e.graphic ){
            if( !e.graphic.graphic.attributes ){ e.graphic.graphic.attributes = { name : e.graphic.attr.name } };
            graphicShowName.showGraphicName(e.graphic.graphic);
          }
        })
        graphicShowName.setModel(2);
      }else{
        graphicShowName.setModel(1);
        if( this.$parent.map.getLevel() !== this.$parent.map.getMaxZoom() ){
          this.$parent.mapData.jd[0].sb.forEach((e)=>{
            if( e.graphic ){
              graphicShowName.hideGraphicName(e.graphic.graphic);
            }
          })
        }
      }
    },
    filter(name , bool) {
      if( !bool ){
        this.$parent.mapData.jd[0].dk.forEach((e)=>{
          if( e.option.rs_facilities_type_name === name && e.graphic ){
            e.graphic.hide();
          }
        })
        this.$parent.mapData.jd[0].sb.forEach((e)=>{
          if( e.option.hd_device_type_name === name && e.graphic ){
            e.graphic.hide();
          }
        })
      }else{
        this.$parent.mapData.jd[0].dk.forEach((e)=>{
          if( e.option.rs_facilities_type_name === name && e.graphic ){
            e.graphic.show();
          }
        })
        this.$parent.mapData.jd[0].sb.forEach((e)=>{
          if( e.option.hd_device_type_name === name && e.graphic ){
            e.graphic.show();
          }
        })
      }
      
    },
    setData (data){
      var dk = data.jd[0].dk.map((e)=>{ return e.option.rs_facilities_type_name });
      dk = Array.from(new Set(dk));
      var icon = [];
      var sb = data.jd[0].sb.map((e)=>{ 
        if( !icon.find((ei)=>{ 
              return ei.name === e.option.hd_device_type_name 
            }) 
          ){
          icon.push({
            name : e.option.hd_device_type_name,
            type : e.option.hd_device_type_code
          });
        }
        return e.option.hd_device_type_name; 
      });
      sb = Array.from(new Set(sb));
      icon = Array.from(new Set(icon));
      this.dk = dk;
      this.sb = sb;
      this.icon = icon;
      
    },
    // 获取面积
    setDKLength(length) {
      this.dkLength = length
    },
    // 输入设备数量信息
    setSBLength(length, showLength) {
      this.sbLength = length
      this.sbShowLength = showLength
    },
    // 关闭按钮
    close_legend (){
      
      this.is_close_legend = !this.is_close_legend;
    }
  }
}

</script>

<style>

.close_legend {
  position:absolute;
  top: 5px;
  right: 5px;
  font-size: 18px;
  cursor: pointer;
}

.map_legend {
  position: absolute;
  bottom: 10px;
  left: 20px;
  background: #ffffff;
  border-radius: 4px;
  /* padding: 12px; */
}
.map_legend .legendName {
  color: #fff;
  background: #304156;
  padding: 8px 12px;
}
.map_legend .legend {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
}
.map_legend .legend > * {
  padding: 5px 0;
}
</style>
