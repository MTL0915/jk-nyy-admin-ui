export function changeDK(a, map) {
  var deff = wucha();
  var c = map.toScreen(
    new window.esri.geometry.Point([110.9672505814843, 21.754225405436358])
  );
  var x = map.toScreen({ x: 110.96275815910529, y: 21.75398527463481 });
  var x1 = map.toScreen({ x: 110.95888439658779, y: 21.75541295123831 });

  var b = a.map(e => {
    var a = map.toScreen(new window.esri.geometry.Point(e));
    return [a.x, a.y];
  });

  c = [c.x, c.y];
  b.forEach(e => {
    e[0] -= c[0];
    e[1] -= c[1];
  });
  var f = b.map(e => {
    return [e[1], e[0] * -1];
  });
  var ff = f.map(e => {
    return map.toMap({
      x: e[0] + c[0] + (x1.x - x.x) - deff.x,
      y: e[1] + c[1] + (x1.y - x.y) - deff.y
    });
  });
  return ff.map(e => {
    return [e.x, e.y];
  });
}

export function changePoint(a, map) {
  var deff = wucha(map);

  var c = map.toScreen(
    new window.esri.geometry.Point([110.9672505814843, 21.754225405436358])
  );
  var x = map.toScreen({ x: 110.96275815910529, y: 21.75398527463481 });
  var x1 = map.toScreen({ x: 110.95888439658779, y: 21.75541295123831 });

  var area = map.toScreen(new window.esri.geometry.Point(a));
  var b = [area.x, area.y];

  c = [c.x, c.y];
  b[0] -= c[0];
  b[1] -= c[1];

  var f = [b[1], b[0] * -1];

  var ff = map.toMap({
    x: f[0] + c[0] + (x1.x - x.x) - deff.x,
    y: f[1] + c[1] + (x1.y - x.y) - deff.y
  });

  return [ff.x, ff.y];
}

var wucha = function(map) {
  var p = new window.esri.geometry.Point({
    type: "point",
    x: 110.96197474838858,
    y: 21.753668497951832
  });
  var p1 = new window.esri.geometry.Point({
    type: "point",
    x: 110.95256160064952,
    y: 21.754353782721513
  });

  p = map.toScreen(p);
  p1 = map.toScreen(p1);

  var deffx = p.x - p1.x;
  var deffy = p.y - p1.y;
  return { x: deffx, y: deffy };
};

export function changeTree(a, map) {
  var deff = wucha();

  var area = a.map(e => {
    return map.toScreen(new window.esri.geometry.Point(e));
  });

  var ff = area.map(e => {
    return map.toMap({
      x: e.x - deff.x,
      y: e.y - deff.y
    });
  });

  return ff.map(e => {
    return [e.x, e.y];
  });
}

export function changeWay(a, map) {
  var deff = wucha();

  var area = a[0].map(e => {
    return map.toScreen(new window.esri.geometry.Point(e));
  });

  var ff = area.map(e => {
    return map.toMap({
      x: e.x - deff.x,
      y: e.y - deff.y
    });
  });
  let val = ff.map(e => {
    return [e.x, e.y];
  });
  return [val];
}

export function changeAreaName(a, map) {
  var deff = wucha();

  var area = map.toScreen(new window.esri.geometry.Point(a));

  var ff = map.toMap({
    x: area.x - deff.x,
    y: area.y - deff.y
  });

  return [ff.x, ff.y];
}
