export default function checkUserPermission(qx) {
    let bs_org_code = this.$store.state.baseinfo.cur_org_code
    let bs_base_id = this.$store.state.baseinfo.cur_base_id
    for(let i=0;i<this.$store.state.user.user.roleInfo.roles.length;i++){
        let role = this.$store.state.user.user.roleInfo.roles[i]
        let level = role.level

        if(((level === 1 || level === 2) && bs_org_code && bs_org_code.startsWith(role.bs_org.code))
                || (role.bs_base && bs_base_id === role.bs_base.id)){
            
            for(let j=0;j<role.permissions.length;j++){
                let permission = role.permissions[j]
                for(let k=0;k<qx.length;k++){
                    if(permission.name === qx[k]){
                        return true
                    }
                }
            }
        }
      }
    return false;
  }