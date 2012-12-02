// $Author$
// $Id$

function Shape(id, group, node, x, y, width, height) {
  if (!id)
    return;
  this.id = id;
  this.node = node;
  this.group = group;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Shape.prototype = {
  shape: "unknown",
  Attr: function(name, val) {
    if (val != null)
      this.node.setAttribute(name, val);
    else
      return this.node.getAttribute(name);
  },
  NewID: function() {
    return Math.uuid(15);
  },
  AddGroup: function(root, id) {
    return AddTagNS(root, svgNS, "g", { "id": id, "shape": this.shape } );
  },
}

Shape.Classes = {
};

Shape.Register = function(shape, create) {
  Shape.Classes[shape] = create;
};

Shape.LoadById = function (id) {
  var group = document.getElementById(id);
  var node = group.childNodes[0];
  var shape = group.getAttribute("shape");
  
  var concreteShape = Shape.Classes[shape]();
  concreteShape.load(id, group, node);
  return concreteShape;
};


// Rect shape
function Rect(root, x, y, width, height) {
  if (!root) 
    return;

  var id = this.NewID();
  var group = this.AddGroup(root, id);
  var node = AddTagNS(group, svgNS, "rect", {
    "x": x, "y": y,
    "width": width, "height": height,
    "fill": "none"
    //"stroke": GetShapeColor(), "stroke-width": ShapeStroke,
  });

  this.load(id, group, node);
}

Rect.prototype = new Shape;
Rect.prototype.constructor = Rect;
Rect.prototype.shape = "rect";
Rect.prototype.load = function(id, group, node) {
    var x = node.getAttribute("x");
    var y = node.getAttribute("y");
    var width = node.getAttribute("width");
    var height = node.getAttribute("height");
    Shape.call(this, id, group, node, x, y, width, height);
  };

Shape.Register(Rect.prototype.shape, function() { return new Rect(); });
