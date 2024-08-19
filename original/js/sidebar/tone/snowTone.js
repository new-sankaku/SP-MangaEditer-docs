var tmpCanvasSnowTone = null;
var tmpCtxSnowTone = null;
var isDrawingSnowTone = false;
var nowSnowTone = null;

function snowToneStart() {
  var activeObject = canvas.getActiveObject();
  tmpCanvasSnowTone = document.createElement("canvas");

  if (isPanel(activeObject)) {
    var canvasX = (activeObject.width * activeObject.scaleX);
    var canvasY = (activeObject.height * activeObject.scaleY);
    tmpCanvasSnowTone.width = canvasX * 3;
    tmpCanvasSnowTone.height = canvasY * 3;
  }else{
    tmpCanvasSnowTone.width = canvas.width * 3;
    tmpCanvasSnowTone.height = canvas.height * 3;
  }

  tmpCtxSnowTone = tmpCanvasSnowTone.getContext("2d");
  tmpCtxSnowTone.scale(3, 3);
}

function snowToneEnd() {
  nowSnowTone = null;
  if( tmpCanvasSnowTone ){
    if (tmpCanvasSnowTone.parentNode) {
      tmpCanvasSnowTone.parentNode.removeChild(tmpCanvasSnowTone);
    }
  }
  tmpCanvasSnowTone = null;
  tmpCtxSnowTone = null;
  nowSnowTone = null;
  isDrawingSnowTone = false;
}

var snowTone_snowDensity  = null;
var snowTone_frontSnowSize  = null;
var snowTone_backSnowSize  = null;
var snowTone_frontBlurLength  = null;
var snowTone_backBlurLength  = null;
var snowTone_frontColor  = null;
var snowTone_backColor  = null;
var snowTone_snowAngle  = null;


function addSnowToneEventListener() {
  console.log("addSnowToneEventListener start");
  snowTone_snowDensity = document.getElementById(MODE_TONE_SNOW + '-density');
  snowTone_frontSnowSize = document.getElementById(MODE_TONE_SNOW + '-frontSize');
  snowTone_backSnowSize = document.getElementById(MODE_TONE_SNOW + '-backSize');
  snowTone_frontBlurLength = document.getElementById(MODE_TONE_SNOW + '-frontBlurSize');
  snowTone_backBlurLength = document.getElementById(MODE_TONE_SNOW + '-backBlurSize');
  snowTone_frontColor = document.getElementById(MODE_TONE_SNOW + '-frontColor');
  snowTone_backColor = document.getElementById(MODE_TONE_SNOW + '-backColor');
  snowTone_snowAngle = document.getElementById(MODE_TONE_SNOW + '-angle');
  
  snowTone_snowDensity.addEventListener("input", generateSnowTone);
  snowTone_frontSnowSize.addEventListener("input", generateSnowTone);
  snowTone_backSnowSize.addEventListener("input", generateSnowTone);
  snowTone_frontBlurLength.addEventListener("input", generateSnowTone);
  snowTone_backBlurLength.addEventListener("input", generateSnowTone);
  snowTone_frontColor.addEventListener("input", generateSnowTone);
  snowTone_backColor.addEventListener("input", generateSnowTone);
  snowTone_snowAngle.addEventListener("input", generateSnowTone);
}

function drawSnowflake(x, y, size, blurLength, color, angle) {
  tmpCtxSnowTone.save();
  tmpCtxSnowTone.translate(x, y);
  tmpCtxSnowTone.rotate((angle * Math.PI) / 180);

  const gradient = tmpCtxSnowTone.createLinearGradient(
    0,
    -size / 2 - blurLength,
    0,
    size / 2 + blurLength
  );

  const offset = size / (4 * blurLength);
  const clamp = (value) => Math.max(0, Math.min(1, value));

  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(clamp(0.5 - offset), "rgba(255,255,255,0)");
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(clamp(0.5 + offset), "rgba(255,255,255,0)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  tmpCtxSnowTone.beginPath();
  tmpCtxSnowTone.ellipse(
    0,
    0,
    size / 4,
    size / 2 + blurLength,
    0,
    0,
    2 * Math.PI
  );
  tmpCtxSnowTone.fillStyle = gradient;
  tmpCtxSnowTone.fill();
  tmpCtxSnowTone.restore();
}

function interpolateColor(color1, color2, factor) {
  const r1 = parseInt(color1.substr(1, 2), 16);
  const g1 = parseInt(color1.substr(3, 2), 16);
  const b1 = parseInt(color1.substr(5, 2), 16);
  const r2 = parseInt(color2.substr(1, 2), 16);
  const g2 = parseInt(color2.substr(3, 2), 16);
  const b2 = parseInt(color2.substr(5, 2), 16);
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  return `rgb(${r}, ${g}, ${b})`;
}

function generateSnowTone() {
  tmpCtxSnowTone.clearRect(0, 0, tmpCanvasSnowTone.width, tmpCanvasSnowTone.height);


  const density = parseInt(snowTone_snowDensity.value);
  const frontSize = parseInt(snowTone_frontSnowSize.value);
  const backSize = parseInt(snowTone_backSnowSize.value);
  const snowTone_frontBlurLengthValue = parseInt(snowTone_frontBlurLength.value);
  const snowTone_backBlurLengthValue = parseInt(snowTone_backBlurLength.value);
  const angle = parseInt(snowTone_snowAngle.value);

  for (let i = 0; i < density; i++) {
    const x = Math.random() * tmpCanvasSnowTone.width;
    const y = Math.random() * tmpCanvasSnowTone.height;
    const depth = Math.random();
    const size = backSize + (frontSize - backSize) * depth;
    const blurLength =
      snowTone_backBlurLengthValue +
      (snowTone_frontBlurLengthValue - snowTone_backBlurLengthValue) * depth;
    const color = interpolateColor(snowTone_backColor.value, snowTone_frontColor.value, depth);
    drawSnowflake(x, y, size, blurLength, color, angle);
  }
  updateSnowTone();
}


var tmpCanvasSnowTone = null;
var tmpCtxSnowTone = null;
var isDrawingSnowTone = false;
var nowSnowTone = null;

function updateSnowTone() {
  if (isDrawingSnowTone) {
    return;
  }

  isDrawingSnowTone = true; 
  if (nowSnowTone) {
    canvas.remove(nowSnowTone);
    nowSnowTone = null;
  }

  const dataURL = tmpCanvasSnowTone.toDataURL({ format: "png" });
  fabric.Image.fromURL(dataURL, function (img) {
    var activeObject = canvas.getActiveObject();
    if (isPanel(activeObject)) {
      var canvasX = activeObject.left + (activeObject.width * activeObject.scaleX) / 2;
      var canvasY = activeObject.top + (activeObject.height * activeObject.scaleY) / 2;
      putImageInFrame(img, canvasX, canvasY, true);
      img.name = 'Snow Tone';
      nowSnowTone = img;
    }else{
      img.scaleToWidth(canvas.width);
      img.name = 'Snow Tone';
      canvas.add(img);
      canvas.renderAll();
      nowSnowTone = img;    
    }
    isDrawingSnowTone = false; 
  });
}
