var toColor = {

  generateColourBar(c1, c2, num) {
    var ary = []
    num = num - 1;
    for (var i = 0; i < num; i++) {
      ary.push(this.to(c1, c2, i / num));
    }
    ary.push(c2);
    return ary;
  },

  to: function(c1, c2, v) {

    c1 = this.colorToArray(c1);

    c2 = this.colorToArray(c2);

    if (typeof v === "string" && v.indexOf("%") > 0) {

      v = parseInt(v) / 100;

    }

    c1[0] += parseInt((c2[0] - c1[0]) * v);
    c1[1] += parseInt((c2[1] - c1[1]) * v);
    c1[2] += parseInt((c2[2] - c1[2]) * v);

    return this.ArrayToColor(c1);

  },

  colorToArray: function(color) {

    if (typeof color === "string" && color.indexOf("#") > -1) {

      return this.hexToArray(color);

    }

  },

  hexToArray: function(color) {

    var i = 1;
    var a, b, c;

    a = parseInt("0x" + color.substring(i, i += 2));
    b = parseInt("0x" + color.substring(i, i += 2));
    c = parseInt("0x" + color.substring(i, i += 2));

    return [a, b, c];

  },

  ArrayToColor: function(array) {

    var a, b, c;

    a = array[0].toString(16);
    b = array[1].toString(16)
    c = array[2].toString(16);
    if (a.length == 1) {
      a = "0" + a;
    }
    if (b.length == 1) {
      b = "0" + b;
    }
    if (c.length == 1) {
      c = "0" + c;
    }
    return "#" + a + b + c;

  }

}

export default toColor
