'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      upper = function(d) { return d.upperBand; },
      lower = function(d) { return d.lowerBand; };

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
      var up = accessor.u(d),
          low = accessor.l(d);
      return up - ((up - low) / 2)
    };

    return accessor;
  }

  return bind();
};
