let tippyInstances = []; 

function removeTooltips() {
  tippyInstances.forEach(instance => {
    instance.destroy();
  });
  tippyInstances = [];
}

const theme = "light";

function addTooltipByElement(element, translationKey) {
  if (!element) {
    console.warn(`Element with ID ${elementId} not found`);
    return;
  }
  const tooltipText = getText(translationKey);
  const instance = tippy(element, {
    content: tooltipText,
    arrow: true,
    theme: theme,
    delay: [800, 0], 
    duration: 0,
    placement: 'bottom',
  });
  tippyInstances.push(instance);
}

function addTooltip(elementId, translationKey) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID ${elementId} not found`);
    return;
  }

  const tooltipText = getText(translationKey);
  
  const instance = tippy(element, {
    content: tooltipText,
    arrow: true,
    theme: theme,
    duration: 1000,
  });
  
  tippyInstances.push(instance);
}

function setLanguage(language) {
  i18next.changeLanguage(language, () => {
    console.log("setLanguage start");
    removeTooltips();

    addTooltip('inputImageFile', 'inputImageFile');
    addTooltip('zoomIn', 'zoomIn');
    addTooltip('zoomOut', 'zoomOut');
    addTooltip('zoomFit', 'zoomFit');
    addTooltip('clearMode', 'clearMode');
    addTooltip('undo', 'undo');
    addTooltip('redo', 'redo');
    addTooltip('cropMode', 'cropMode');
    addTooltip('crop', 'crop');
    addTooltip('rembg', 'rembg');
  });
}

