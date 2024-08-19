fabric.Object.NUM_FRACTION_DIGITS = 100;

const minCanvasSizeWidth = 600;
const minCanvasSizeHeight = 400;

var canvas = new fabric.Canvas("mangaImageCanvas", {
  renderOnAddRemove: false,
  skipOffscreen: false,
  renderer: fabric.isWebglSupported ? "webgl" : "canvas",
});
document.addEventListener("DOMContentLoaded", function() {
  loadBookSize(210, 297, false);
  canvas.renderAll();
});

const mode = localStorage.getItem('mode') || 'light-mode';
if (mode === 'dark-mode') {
  canvas.backgroundColor = "gray";
}else{
  canvas.backgroundColor = "white";
}

// var clipAreaCoords = {
//   left: 0,
//   top: 0,
//   width: canvas.width,
//   height: canvas.height,
// };

var svgPagging = 20;
document.addEventListener('DOMContentLoaded', function() {
  svgPagging = document.getElementById('marginFromPanel').value;
  document.getElementById('marginFromPanel').addEventListener('input', function() {
    svgPagging = document.getElementById('marginFromPanel').value;
  });
});



var sdWebUIPort = 7860;
var sdWebUIHost = "127.0.0.1";

var comfyuiPort = 8188;
var comfyuiHost = "127.0.0.1";

const text2img_basePrompt = {
  text2img_prompt               : "masterpiece, best quality, 1girl, simple background, ",
  text2img_negativePrompt       : "low quality, worst quality, jpeg, normal quality, ",
  text2img_seed                 : -1,
  text2img_cfg_scale            : 7,
  text2img_width                : 1024,
  text2img_height               : 1024,
  text2img_samplingMethod       : "Euler a",
  text2img_samplingSteps        : 20,
  text2img_scheduler            : "Automatic",
  text2img_model                : "",
  text2img_hr_upscaler          : "None",
  text2img_basePrompt_hr_scale  : "1.3",
  text2img_basePrompt_hr_step   : 20,
  text2img_basePrompt_hr_denoising_strength: "0.7",
};

const t2i_init = {
  isPanel                 : true,
  t2i_prompt         : "",
  t2i_negativePrompt : "",
  t2i_seed           : -2,
  t2i_width          : -1,
  t2i_height         : -1,
};

const i2i_init = {
  i2i_prompt         : "",
  i2i_negativePrompt : "",
  i2i_seed           : -2,
  i2i_width          : -1,
  i2i_height         : -1,
  i2i_samplingSteps : 20,
  i2i_denoising_strength : 0.7,
  i2i_scale : 1.05,
};


// 共通プロパティリスト
const commonProperties = [
'excludeFromLayerPanel', 
'isPanel', 
'isIcon',
'text2img_prompt', 
'text2img_negativePrompt', 
'text2img_seed', 
'text2img_width', 
'text2img_height', 
'text2img_samplingMethod', 
'text2img_samplingSteps',
'initial', 
'clipPath.initial',
'name',
"guids", "guid", "tempPrompt", "tempNegativePrompt", "tempSeed", "img2imgScale", "img2img_denoising_strength", "canvasGuid"
];
