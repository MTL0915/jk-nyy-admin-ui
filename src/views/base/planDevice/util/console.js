let isdebug = false;

const console = function(param){
    var message = param.message;
    if( message.length && typeof message !== 'string'){
        for( var i in message ){
            window.console.log.apply(window.console,message[i].length ? message[i] : [message[i]]);
        }
    }else{
        window.console.log(param.message)
    }
}

console.log = function(message){
    console({message});
}

console.newObjext = function(message){
    var messages = [];
    messages.push(["\n%c *********************************","color:#ff0000"],);
    messages.push(["%c %o","color:#ff0000",message]);
    messages.push(["\n%c *********************************","color:#ff0000"],);
    console({message: messages});
}

console.debug = function(message){
    if( !isdebug ) return
    var messages = [];
    messages.push(["\n%c 调试*********************************","color:#fff000"],);
    messages.push(["%c %o ","color:#000000",message]);
    messages.push(["\n%c *********************************","color:#fff000"],);
    console({message: messages});
}

console.success = function(message){
    var messages = [];
    messages.push(["\n%c 成功*********************************","color:blue"],);
    messages.push(["%c %o","color:blue",message]);
    messages.push(["\n%c *********************************","color:blue"],);
    console({message: messages});
}

console.error = function(message){
    var messages = [];
    messages.push(["\n%c 错误 *********************************","color:#ff0000"],);
    messages.push(["%c %o","color:#ffffff;background:#fff000;",message]);
    messages.push(["\n%c *********************************","color:#ff0000"],);
    console({message: messages});
}

console.warn = function(){
    if( !isdebug ) return
    var messages = [];
    messages.push(["\n%c 警告*********************************","color:#fff000"],);
    messages.push(["%c %o ","color:#000000",message]);
    messages.push(["\n%c *********************************","color:#fff000"],);
    console({message: messages});
}

console.info = function(name, message){
    var messages = [];
    messages.push(["\n%c "+name+" *********************************","color:#000000"],);
    messages.push(["%c %o","color:blue",message]);
    messages.push(["\n%c ******************************************","color:#000000"],);
    console({message: messages});
}

export default console;