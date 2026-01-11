export default function (indicatorMixin, accessor_ohlc, indicator_sma) {
  // Injected dependencies
  return function () {
    // Closure function
    const p = {} // Container for private, direct access mixed in variables
    let sdMultiplication = 2,
      sd

    function indicator(data) {
      const signalLine = indicator_sma()
        .accessor(indicator.accessor())
        .period(p.period)
        .init()
      return data
        .map((d, i) => {
          const middleBand = signalLine.average(p.accessor(d))
          if (i >= p.period) {
            let sum = 0
            for (let j = 0; j < p.period; j++) {
              sum += Math.pow(p.accessor.c(data[i - j]) - middleBand, 2)
            }
            sd = Math.sqrt(sum / p.period)
            const upperBand = middleBand + sdMultiplication * sd,
              lowerBand = middleBand - sdMultiplication * sd
            return datum(p.accessor.d(d), middleBand, upperBand, lowerBand)
          } else return datum(p.accessor.d(d))
        })
        .filter((d) => d.middleBand)
    }

    indicator.sdMultiplication = function (_) {
      if (!arguments.length) return sdMultiplication
      sdMultiplication = _
      return indicator
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc()).period(20)

    return indicator
  }
}

function datum(date, middleBand, upperBand, lowerBand) {
  if (middleBand)
    return {
      date: date,
      middleBand: middleBand,
      upperBand: upperBand,
      lowerBand: lowerBand,
    }
  else return { date: date, middleBand: null, upperBand: null, lowerBand: null }
}
