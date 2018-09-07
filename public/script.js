(function() {
  var canvas = document.getElementById("canvas");
  var hiddenInput = document.getElementById('hidden-input');
  var button = document.getElementById('button');

  var context = canvas.getContext("2d");
  canvas.width = 276;
  canvas.height = 180;
  context.fillStyle = "#fff";
  context.strokeStyle = "#444";
  context.lineWidth = 1.5;
  context.lineCap = "round";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var pixels = [];
  var cpixels = [];
  var xyLast = {};
  var xyAddLast = {};
  function remove_event_listeners() {
    canvas.removeEventListener("mousemove", on_mousemove, false);
    canvas.removeEventListener("mouseup", on_mouseup, false);
    document.body.removeEventListener("mouseup", on_mouseup, false);
  }

  function get_coords(e) {
    var x, y;
    if (e.layerX || 0 == e.layerX) {
      x = e.layerX;
      y = e.layerY;
    } else if (e.offsetX || 0 == e.offsetX) {
      x = e.offsetX;
      y = e.offsetY;
    }

    return {
      x: x,
      y: y
    };
  }

  function on_mousedown(e) {
    e.preventDefault();
    e.stopPropagation();

    canvas.addEventListener("mouseup", on_mouseup, false);
    canvas.addEventListener("mousemove", on_mousemove, false);
    document.body.addEventListener("mouseup", on_mouseup, false);

    var xy = get_coords(e);
    context.beginPath();
    pixels.push("moveStart");
    context.moveTo(xy.x, xy.y);
    pixels.push(xy.x, xy.y);
    xyLast = xy;
  }

  function on_mousemove(e, finish) {
    e.preventDefault();
    e.stopPropagation();

    var xy = get_coords(e);
    var xyAdd = {
      x: (xyLast.x + xy.x) / 2,
      y: (xyLast.y + xy.y) / 2
    };

    context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
    pixels.push(xyAdd.x, xyAdd.y);
    context.stroke();
    context.beginPath();
    context.moveTo(xyAdd.x, xyAdd.y);
    xyAddLast = xyAdd;
    xyLast = xy;
  }

  function on_mouseup(e) {
    remove_event_listeners();
    context.stroke();
    pixels.push("e");
    var dataURL = canvas.toDataURL();
    hiddenInput.value = dataURL;
  }
  canvas.addEventListener("mousedown", on_mousedown, false);
})();
