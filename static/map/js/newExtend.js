define([], function() {

	var extendsObject = function() {
		this.into && this.into.apply(this, arguments);
		this.main && this.main.apply(this, arguments);
	};

	//扩展
	var extend = function(option) {

		for(var i in option)
			this.prototype[i] = option[i];

	};

	//继承
	var inherit = function(option) {

		var newExtendsObject = function() {
			this.into && this.into.apply(this, arguments);
			this.main && this.main.apply(this, arguments);
		};

		for(var i in this.prototype)
			newExtendsObject.prototype[i] = this.prototype[i];

		newExtendsObject.prototype.constructor = newExtendsObject;
		newExtendsObject.constructor = this;

		newExtendsObject.extend = extend;
		newExtendsObject.inherit = inherit;

		newExtendsObject.extend(option);

		return newExtendsObject;

	};

	//调用继承对象的同名函数
	var _super = function(param) {
		var _this = this,
		func;
		//获取函数名
		var name = arguments.callee.caller.name;
		//获取函数参数
		var argu = arguments.callee.caller.arguments;
		//获取对象的继承对象
		var _pro_function_ = arguments.callee.caller._pro_function_;
		_pro_function_ = _pro_function_ ? _pro_function_.constructor : this.constructor.constructor;
		//获取继承对象的prototype
		func = _pro_function_.prototype;
		//查询继承对象是否存在同名函数
		func = func[name];
		//将函数的对象函数存放在_pro_function_；
		func && (func._pro_function_ = _pro_function_);
		//如果存在同名函数则运行
		var ret = func && func.apply(_this, argu);
		//运行完毕之后消除标记
		func && (func._pro_function_ = null);
		return ret;
	}

	//调用继承对象的同名函数
	var __super = function(param) {

		var _this = this;
		try {
			_this._superShade_ ? _this._superShade_++ : _this._superShade_ = 1;
			var name = arguments.callee.caller.name;
			var argu = arguments.callee.caller.arguments;
			var func = _this.constructor.constructor.prototype;
			for(var i = 1; i < _this._superShade_; i++)
				func = func.constructor.constructor.prototype;
			func = func[name]
			var ret = func && func.call(_this, argu);
			_this._superShade_ ? _this._superShade_ = 0 : "";
		} catch(e) {
			_this._superShade_ = 0;
		}
		return ret;
	}
	extendsObject.extend = extend;
	extendsObject.inherit = inherit;

	var fn = extendsObject.prototype = {
		super: _super,
		into: function() {

		},
		main: function() {

		}
	};

	return extendsObject;

})