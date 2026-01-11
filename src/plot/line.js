export default function (accessor_value, plot, plotMixin, showZero) {
  // Injected dependencies
  const isShowZero = showZero || false

  return function () {
    // Closure function
    const p = {} // Container for private, direct access mixed in variables
    const svgLine = plot.pathLine()

    function line(g) {
      const group = p.dataSelector(g)

      group.entry.append('path').attr('class', 'line')

      if (isShowZero) group.selection.append('path').attr('class', 'zero')

      line.refresh(g)
    }

    line.refresh = function (g) {
      refresh(
        p.dataSelector.select(g),
        p.accessor,
        p.xScale,
        p.yScale,
        plot,
        svgLine,
        isShowZero,
      )
    }

    function binder() {
      svgLine.init(p.accessor.d, p.xScale, p.accessor, p.yScale)
    }

    // Mixin 'superclass' methods and variables
    plotMixin(line, p)
      .plot(accessor_value(), binder)
      .dataSelector(plotMixin.dataMapper.array)
    binder()

    return line
  }
}

function refresh(selection, accessor, x, y, plot, svgLine, showZero) {
  selection.select('path.line').attr('d', svgLine)

  if (showZero)
    selection
      .select('path.zero')
      .attr('d', plot.horizontalPathLine(accessor.d, x, accessor.z, y))
}
