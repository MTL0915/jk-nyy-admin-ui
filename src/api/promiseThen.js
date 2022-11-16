/* eslint-disable */
var PromiseThen = function() {
  var fns = []

  var completeFunction = null

  this.then = function(fn) {
    fns.push(fn)
    return this
  }

  this.main = function(p) {
    var // 工序id
      i = -1,
      // 是否停止
      isStop = false,
      // 继续流程
      resolve = function(o) {
        if (isStop) return
        p = o
        i++
        fns[i] && fns[i].call({ suc: resolve }, p, resolve, complete)
      },
      // 完成函数
      complete = function() {
        // 触发完成晚熟
        completeFunction && completeFunction.apply(this, arguments)
        completeFunction = null
        resolve = null
        i = null
        isStop = null
        complete = null
      }
    // 触发第一道工序
    resolve(p)
    return this
  }

  this.start = function(param) {
    // 新建工序
    return new this.main()
  }

  // 清除掉
  this.remove = function(index) {
    if (!index) {
      fns = []
    }
  }

  // 插入工序
  this.add = function(fn, index) {
    fns.splice(index, 0, fn)
  }

  this.complete = function(func) {
    completeFunction = func
    return this
  }
}

export default PromiseThen
