import store from '@/store'

export default function checkDeviceControl(hd_device_id) {
    if (this.$store.state.baseinfo.cur_user_level <= 3){
        return true;
    }
    if (!this.$store.getters.deviceUserPermission){
        return false
    }

    for (var i = 0;i<this.$store.getters.deviceUserPermission.length;i++){

        if (this.$store.getters.deviceUserPermission[i].hd_device_id === hd_device_id && this.$store.getters.deviceUserPermission[i].deviceSta === 1){
            
            return true;
        }
    }
    
    return false;
  }


 
  