import breakpoints from "./breakpoints";
import * as colorUtils from "./colorUtils";

export default {
  borderRadius: 16,
  breakpoints,
  colorUtils,
  easing: {
    accelerate: [0.4, 0.0, 1, 1],
    deccelerate: [0.0, 0.0, 0.2, 1],
    standard: [0.4, 0.0, 0.2, 1],
    css: easing => `cubic-bezier(${easing.join(",")})`
  },
  gutter: 16
};
