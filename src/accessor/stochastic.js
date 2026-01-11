export default function() {
  let date = d => d.date,
      stochasticK = d => d.stochasticK,
      stochasticD = d => d.stochasticD,
      overbought = () => 80,
      oversold = () => 20;

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.stochasticK = function(_) {
    if (!arguments.length) return stochasticK;
    stochasticK = _;
    return bind();
  };
  accessor.stochasticD = function(_) {
    if (!arguments.length) return stochasticD;
    stochasticD = _;
    return bind();
  };

  accessor.overbought = function(_) {
    if (!arguments.length) return overbought;
    overbought = _;
    return bind();
  };

  accessor.oversold = function(_) {
    if (!arguments.length) return oversold;
    oversold = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.k = stochasticK;
    accessor.sd = stochasticD;
    accessor.ob = overbought;
    accessor.os = oversold;

    return accessor;
  }

  return bind();
}
