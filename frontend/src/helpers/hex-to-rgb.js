const hexColorToRGB = function (hexColor) {
    const detectShorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; // #000 vs #000000
    hexColor = hexColor.replace(detectShorthand, (m, r, g, b) => r + r + g + g + b + b);
  
    const hex_array = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor); // #000000 to #ffffff
    return hex_array
      ? {
          r: parseInt(hex_array[1], 16), // 0-255
          g: parseInt(hex_array[2], 16), // 0-255
          b: parseInt(hex_array[3], 16), // 0-255
        }
      : null;
  };
  
  export const hexToRGBAlpha = function (hexColor, alpha) {
    const rgb = hexColorToRGB(hexColor);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
  };
  