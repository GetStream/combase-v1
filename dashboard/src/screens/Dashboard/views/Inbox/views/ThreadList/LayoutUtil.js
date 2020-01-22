import { LayoutProvider } from "recyclerlistview/web";

export default (width, height = 104) => {
  return new LayoutProvider(
    index => {
      return index;
    },
    (index, dim) => {
      dim.height = height;
      dim.width = width;
    }
  );
};
