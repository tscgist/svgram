// Rect shape
// $Author$
// $Id$

function Rect(context, x, y, width, height) {
	if (!context)
		return;
	
	x = parseInt(x);
	y = parseInt(y);
	width = parseInt(width ? width : context.width);
	height = parseInt(height ? height : context.height);
	var left = Math.round(x - width / 2);
	var top = Math.round(y - height / 2);
	var right = left + width;
	var bottom = top + height;
	
	var id = Shape.NewID();
	var group = Shape.AddGroup(context, context.root_shapes, id, this.shape);
	var node = AddTagNS(group, context.svgNS, "rect", {
			"x" : left,
			"y" : top,
			"width" : width,
			"height" : height,
			"fill" : context.fill,
			"stroke" : context.stroke_color,
			"stroke-width" : context.stroke_width,
		});
	
	var spec = AddTagNS(group, context.svgNS, "rect", {
			"x" : left,
			"y" : top,
			"width" : width,
			"height" : height,
		});
	Shape.AddSpecAttr(context, spec);
	
	Shape.AddResizer(context, group, right, bottom);
	
	Shape.AddKnot(context, group, left, y, "left");
	Shape.AddKnot(context, group, right, y, "right");
	Shape.AddKnot(context, group, x, top, "top");
	Shape.AddKnot(context, group, x, bottom, "bottom");
	
	this.load(id, group, node, spec);
}

Rect.shape = "rect";
Rect.create = function () {
	return new Rect();
};

Rect.prototype = new Shape;
Rect.prototype.constructor = Rect;
Rect.prototype.shape = Rect.shape;
Rect.prototype.load = function (id, group, node, spec) {
	var left = node.getAttribute("x");
	var top = node.getAttribute("y");
	var width = node.getAttribute("width");
	var height = node.getAttribute("height");
  
	Shape.call(this, id, group, node, spec, left, top, width, height);
  
	this.resizers.push(group.childNodes[2]);
	this.knots.push(group.childNodes[3]);
	this.knots.push(group.childNodes[4]);
	this.knots.push(group.childNodes[5]);
	this.knots.push(group.childNodes[6]);
};

Rect.prototype.SetPosition = function () {
	SetAttr(this.node, {
		"x" : this.left,
		"y" : this.top,
		"width" : this.width,
		"height" : this.height
	});
  
	SetAttr(this.spec, {
		"x" : this.left,
		"y" : this.top,
		"width" : this.width,
		"height" : this.height
	});
	
	Shape.MoveRect(this.resizers[0], this.right, this.bottom);
	
	Shape.MoveCircle(this.knots[0], this.left, this.y);
	Shape.MoveCircle(this.knots[1], this.right, this.y);
	Shape.MoveCircle(this.knots[2], this.x, this.top);
	Shape.MoveCircle(this.knots[3], this.x, this.bottom);
}
