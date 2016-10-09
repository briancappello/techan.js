'use strict';

module.exports = function(accessor_rsi, plot, plotMixin) {  // Injected dependencies
  return function(options) { // Closure function
    if (!options) options = {};
    var p = {},  // Container for private, direct access mixed in variables
        rsiLine = plot.pathLine(),
        overbought = options.overbought ? options.overbought : 70,
        middle = options.middle ? options.middle : 50,
        oversold = options.overbought ? options.overbought : 30;

    function rsi(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'middle');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'rsi');

      rsi.refresh(g);
    }

    rsi.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, rsiLine, overbought, middle, oversold);
    };

    function binder() {
      rsiLine.init(p.accessor.d, p.xScale, p.accessor.r, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(rsi, p).plot(accessor_rsi(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return rsi;
  };
};

function refresh(selection, accessor, x, y, plot, rsiLine, overbought, middle, oversold) {
  selection.select('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, overbought, y));
  selection.select('path.middle').attr('d', plot.horizontalPathLine(accessor.d, x, middle, y));
  selection.select('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, oversold, y));
  selection.select('path.rsi').attr('d', rsiLine);
}
