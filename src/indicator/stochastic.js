export default function (indicatorMixin, accessor_ohlc) {
  // Injected dependencies
  return function () {
    // Closure function
    const p = {} // Container for private, direct access mixed in variables
    let periodD = 3,
      overbought = 80,
      oversold = 20

    function indicator(data) {
      const periodLength = indicator.preroll()
      return data
        .map((d, i) => {
          if (i >= periodLength) {
            const max = []
            const min = []
            const stochasticKBuffer = []
            for (let per = 0; per < periodD; per++) {
              max.push(0)
              min.push(10000)
              stochasticKBuffer.push(0)
            }
            let stochasticD = 0
            for (let k = 0; k < periodD; k++) {
              for (let j = 0; j < p.period; j++) {
                if (p.accessor.h(data[i - j - k]) > max[k]) {
                  max[k] = p.accessor.h(data[i - j - k])
                }
                if (p.accessor.l(data[i - j - k]) < min[k]) {
                  min[k] = p.accessor.l(data[i - j - k])
                }
              }
              const diff = max[k] - min[k]
              if (diff > 0) {
                stochasticKBuffer[k] =
                  ((p.accessor.c(data[i - k]) - min[k]) / (max[k] - min[k])) *
                  100
              } else {
                stochasticKBuffer[k] = 50
              }
              stochasticD += stochasticKBuffer[k]
            }
            const stochasticK = stochasticKBuffer[0] // ((d.close-min)/(max-min))*100;
            stochasticD /= periodD
            return datum(
              p.accessor.d(d),
              stochasticK,
              stochasticD,
              overbought,
              oversold,
            )
          } else return datum(p.accessor.d(d), null, null, overbought, oversold)
        })
        .filter((d) => d.stochasticK)
    }

    indicator.periodD = function (_) {
      if (!arguments.length) return periodD
      periodD = +_
      return indicator
    }

    indicator.overbought = function (_) {
      if (!arguments.length) return overbought
      overbought = _
      return indicator
    }

    indicator.oversold = function (_) {
      if (!arguments.length) return oversold
      oversold = _
      return indicator
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(20)
      .preroll(() => {
        return p.period + periodD
      })

    return indicator
  }
}

function datum(date, stochasticK, stochasticD, overbought, oversold) {
  if (stochasticK)
    return {
      date: date,
      stochasticK: stochasticK,
      stochasticD: stochasticD,
      overbought: overbought,
      oversold: oversold,
    }
  else
    return {
      date: date,
      stochasticK: null,
      stochasticD: null,
      overbought: overbought,
      oversold: oversold,
    }
}
