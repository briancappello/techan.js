import * as d3 from 'd3';
import version from './version/index';
import accessorFactory from './accessor/index';
import indicatorFactory from './indicator/index';
import plotFactory from './plot/index';
import scaleFactory from './scale/index';
import svgFactory from './svg/index';

const accessor = accessorFactory();
const indicator = indicatorFactory(d3);
const plot = plotFactory(d3);
const scale = scaleFactory(d3);
const svg = svgFactory(d3);

export {
  version,
  accessor,
  indicator,
  plot,
  scale,
  svg
};

export default {
  version,
  accessor,
  indicator,
  plot,
  scale,
  svg
};
