export default function() {
  let date = d => d.date,
      upper = d => d.upperBand,
      lower = d => d.lowerBand;

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.upper = function(_) {
    if (!arguments.length) return upper;
    upper = _;
    return bind();
  };

  accessor.lower = function(_) {
    if (!arguments.length) return lower;
    lower = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.u = upper;
    accessor.l = lower;
    accessor.m = function (d) {
      const up = accessor.u(d),
          low = accessor.l(d);

      if (up === null || low === null) {
        return null;
      }
      return up - ((up - low) / 2);
    };

    return accessor;
  }

  return bind();
}
