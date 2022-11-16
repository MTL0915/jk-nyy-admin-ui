/**
 * 事件函数
 * @date 2020-03-13
 * @param {any} 默认的触发回调函数
 * @returns {event} 事件对象
 */
let eventBox = function(func) {
  let data = [];

  let retFunc = func;

  let ret = function(func, bool) {
    if (typeof func === "function" && !bool) {
      data.push(func);

      func.remove = function() {
        data.splice(data.indexOf(func), 1);
        return this;
      };
      func.setIndex = function(index) {
        this.index = index;
        return this;
      };
      func.index = 0;

      ret.onaddFunction && ret.onaddFunction(func);

      return func;
    }

    retFunc && retFunc.apply(this, arguments);

    data.sort(function(a, b) {
      return a.index < b.index;
    });

    for (let i = 0; i < data.length; i++) {
      let it = data[i];

      it && it.apply(this, arguments) === "remove" && it.remove();

      ret.ontrigger && ret.ontrigger(it);

      if (data.indexOf(it) == -1) --i;
    }
  };

  ret.remove = function() {
    data = [];
  };

  ret.getFunction = function() {
    return data;
  };

  ret.onaddFunction = null;
  ret.ontrigger = null;

  return ret;
};
let pointMove = function(point) {
  // 路径
  this.point = null;

  // 速度事件
  this.speed = 2800;

  this.setPoint(point);

  //   每帧动画执行事件
  this.onanimate = new eventBox();
};

pointMove.prototype = {
  setPoint(point) {
    this.point = point;
    this.layer = this.point.getLayer();
  },

  move(xy, param) {
    let paths;
    if (this.paths && this.paths.length > 0) {
      if (
        this.paths[this.paths.length - 1][0] === xy[0] &&
        this.paths[this.paths.length - 1][1] === xy[1]
      ) {
        return;
      }
    } else {
      if (this.point.geometry.x === xy[0] && this.point.geometry.y === xy[1]) {
        return;
      }
    }

    if (this.paths) {
      // 处理位置进行分段处理
      paths = this.handlePath(this.paths[this.paths.length - 1], xy);
      // 扩充数组
      this.paths.push.apply(this.paths, paths);
      return;
    }
    // 处理位置进行分段处理
    paths = this.handlePath([this.point.geometry.x, this.point.geometry.y], xy);
    // 开始创建动画计时器
    this.createAnimateTimer(paths, param);
  },

  stop() {
    clearInterval(this.animate);
    this.animate = null;
    this.paths = null;
  },

  handlePath(path, xy) {
    let p = [];
    let start = path;
    let end = xy;
    if (!end) return;
    let x = start[0] - end[0];
    let y = start[1] - end[1];
    let _x = x / 100;
    let _y = y / 100;
    let angle = 0;
    if (x > 0 && y > 0) {
      angle = (Math.atan(Math.abs(x / y)) * 180) / Math.PI;
    } else if (x > 0 && y < 0) {
      angle = (Math.atan(Math.abs(y / x)) * 180) / Math.PI + 90;
    } else if (x < 0 && y < 0) {
      angle = (Math.atan(Math.abs(x / y)) * 180) / Math.PI + 180;
    } else if (x < 0 && y > 0) {
      angle = (Math.atan(Math.abs(y / x)) * 180) / Math.PI + 270;
    }
    // let angle = this.GetJiaoDu(start,end);
    for (let n = 1; n <= 100; n++) {
      // if( p[i-2] ) g.symbol.setAngle(this.GetJiaoDu(p[i-2],ps));
      p.push([start[0] - _x * n, start[1] - _y * n, angle]);
    }
    return p;
  },

  createAnimateTimer(points, param = {}) {
    // 如果存在动画先停掉
    if (this.animate) {
      this.stop();
    }
    this.paths = points;
    let layer = this.layer;
    this.animate = setInterval(
      () => {
        // 获取路线数组第一个
        let xy = points.shift();
        // xy如果不存在了 则停止
        if (!xy) {
          this.stop();
          return;
        }
        // 修改物体的经纬度
        this.point.geometry.x = xy[0];
        this.point.geometry.y = xy[1];

        this.onanimate(this);

        // console.log(
        //   "id:" +
        //     this.point.attributes.id +
        //     "x:" +
        //     this.point.geometry.x +
        //     " --- y:" +
        //     this.point.geometry.y
        // );

        // 设置角度
        // xy[2] && this.point.symbol.setAngle(xy[2]);
        // 刷新物体的layer;
        if (!layer) layer = this.point.getLayer();
        if (layer) layer.refresh();
      },
      param.speed ? param.speed / 100 : this.speed / 100
    );
  }
};

export default pointMove;
