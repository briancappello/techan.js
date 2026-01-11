export default function() {
  let date = d => d.date,
      adx = d => d.adx,
      plusDi = d => d.plusDi,
      minusDi = d => d.minusDi;

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.adx = function(_) {
    if (!arguments.length) return adx;
    adx = _;
    return bind();
  };

  accessor.plusDi = function(_) {
    if (!arguments.length) return plusDi;
    plusDi = _;
    return bind();
  };

  accessor.minusDi = function(_) {
    if (!arguments.length) return minusDi;
    minusDi = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.adx = adx;
    accessor.plusDi = plusDi;
    accessor.minusDi = minusDi;

    return accessor;
  }

  return bind();
}
