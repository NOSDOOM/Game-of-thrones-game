//see http://www.greensock.com/draggable/ for more details.

var droppables = $(".box");

//the overlapThreshold can be a percentage ("50%", for example, would only trigger when 50% or more of the surface area of either element overlaps) or a number of pixels (20 would only trigger when 20 pixels or more overlap), or 0 will trigger when any part of the two elements overlap.
var overlapThreshold = "50%"; 

//we'll call onDrop() when a Draggable is dropped on top of one of the "droppables", and it'll make it "flash" (blink opacity). Obviously you can do whatever you want in this function.
function onDrop(dragged, dropped) {
  TweenMax.fromTo(dropped, 0.1, {opacity:1}, {opacity:0, repeat:3, yoyo:true});
}

Draggable.create(droppables, {
  bounds:window,
  onDrag: function(e) {
    var i = droppables.length;
		 while (--i > -1) {
       if (this.hitTest(droppables[i], overlapThreshold)) {
         $(droppables[i]).addClass("highlight");
       } else {
         $(droppables[i]).removeClass("highlight");
       }
       
       /* ALTERNATE TEST: you can use the static Draggable.hitTest() method for even more flexibility, like passing in a mouse event to see if the mouse is overlapping with the element...
       if (Draggable.hitTest(droppables[i], e) && droppables[i] !== this.target) {
         $(droppables[i]).addClass("highlight");
       } else {
         $(droppables[i]).removeClass("highlight");
       }
       */
    }
  },
  onDragEnd:function(e) {
		var i = droppables.length;
		while (--i > -1) {
			if (this.hitTest(droppables[i], overlapThreshold)) {
				onDrop(this.target, droppables[i]);
			}
		}
	}
});

! function(a) {
	"use strict";

	function b() {
		this.numDice = 0, this.numSides = 0, this.modifier = 0
	}

	function c() {
		this.rolls = [], this.modifier = 0, this.total = 0
	}
	var d = {};
	c.prototype.toString = function() {
		return 1 === this.rolls.length && 0 === this.modifier ? this.rolls[0] + "" : this.rolls.length > 1 && 0 === this.modifier ? this.rolls.join(" + ") + " = " + this.total : 1 === this.rolls.length && this.modifier > 0 ? this.rolls[0] + " + " + this.modifier + " = " + this.total : this.rolls.length > 1 && this.modifier > 0 ? this.rolls.join(" + ") + " + " + this.modifier + " = " + this.total : 1 === this.rolls.length && this.modifier < 0 ? this.rolls[0] + " - " + Math.abs(this.modifier) + " = " + this.total : this.rolls.length > 1 && this.modifier < 0 ? this.rolls.join(" + ") + " - " + Math.abs(this.modifier) + " = " + this.total : void 0
	}, d.parse = function(a) {
		var c = null,
			d = new b;
		return (c = a.match(/^([1-9]\d*)?d([1-9]\d*)([+-]\d+)?$/i)) ? (d.numDice = c[1] - 0 || 1, d.numSides = c[2] - 0, d.modifier = c[3] - 0 || 0, d) : !1
	}, d.validate = function(a) {
		return d.parse(a) ? !0 : !1
	}, d.roll = function(a) {
		var b = null,
			e = new c;
		if (b = d.parse(a), !b) return !1;
		for (var f = 0; f < b.numDice; f++) e.rolls[f] = 1 + Math.floor(Math.random() * b.numSides);
		e.modifier = b.modifier;
		for (var g = 0; g < e.rolls.length; g++) e.total += e.rolls[g];
		return e.total += e.modifier, e
	}, "undefined" != typeof module && module.exports ? module.exports = d : a.droll = d
}(this);

$one = "<div class='side'><div class='dot c'></div></div>";
$two = "<div class='side'><div class='dot tl'></div><div class='dot br'></div></div>";
$three = "<div class='side'><div class='dot tl'></div><div class='dot c'></div><div class='dot br'></div></div>";
$four = "<div class='side'><div class='dot tl'></div><div class='dot tr'></div><div class='dot bl'></div><div class='dot br'></div></div>";
$five = "<div class='side'><div class='dot tl'></div><div class='dot tr'></div><div class='dot c'></div><div class='dot bl'></div><div class='dot br'></div></div>";
$six = "<div class='side'><div class='dot tl'></div><div class='dot tr'></div><div class='dot cl'></div><div class='dot cr'></div><div class='dot bl'></div><div class='dot br'></div></div>";

function roll() {
	var result = droll.roll('1d6');
	$newSides = 10;
	for ($i = 0; $i < $newSides; $i++) {
		$s = "";
		$num = result;
		if ($num == 1) {
			$s = $one;
		} else if ($num == 2) {
			$s = $two;
		} else if ($num == 3) {
			$s = $three;
		} else if ($num == 4) {
			$s = $four;
		} else if ($num == 5) {
			$s = $five;
		} else if ($num == 6) {
			$s = $six;
		}
		$('.dice').append($s);
	}
	$offset = $offset - (100 * $newSides);
}
$('.dice').on('click', roll);