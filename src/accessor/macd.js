'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      macd = function(d) { return d.macd; },
      zero = function() { return 0; },
      signal = function(d) { return d.signal;};

  function accessor(d) {
    return accessor.m(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.macd = function(_) {
    if (!arguments.length) return macd;
    macd = _;
    return bind();
  };

  accessor.signal = function(_) {
    if (!arguments.length) return signal;
    signal = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.m = macd;
    accessor.s = signal;
    accessor.dif = function (d) {
      return accessor.m(d) - accessor.s(d);
    };
    accessor.z = zero;

    return accessor;
  }

  return bind();
};
