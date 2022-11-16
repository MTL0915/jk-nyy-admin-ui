import store from '@/store'

export default function checkBasePermission(bs_org_id,bs_base_id) {

  for(let i=0;i<this.$store.state.user.user.roleInfo.roles.length;i++){
    let role = this.$store.state.user.user.roleInfo.roles[i]
    let level = role.level
    if(level === 1){//超级管理员
        return true
    }else if(level === 2){//组织管理员
        if(bs_org_id === role.bs_org.id){
            return true
        }
    }else if(level === 3){//基地管理员
        if(bs_base_id === role.bs_base.id){
            return true
        }
    }
  }
    return false;
  }