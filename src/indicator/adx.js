export default function (d3_max, indicatorMixin, accessor_ohlc, indicator_ema) {
  // Injected dependencies
  return function () {
    // Closure function
    const p = {} // Container for private, direct access mixed in variables

    function indicator(data) {
      const plusDmEma = indicator_ema()
          .accessor(indicator.accessor())
          .period(p.period)
          .init(),
        minusDmEma = indicator_ema()
          .accessor(indicator.accessor())
          .period(p.period)
          .init(),
        trEma = indicator_ema()
          .accessor(indicator.accessor())
          .period(p.period)
          .init(),
        adxEma = indicator_ema()
          .accessor(indicator.accessor())
          .period(p.period)
          .init()

      return data
        .map((d, i) => {
          if (i < 1) return datum(p.accessor.d(d))

          const upMove = p.accessor.h(data[i]) - p.accessor.h(data[i - 1])
          const downMove = p.accessor.l(data[i - 1]) - p.accessor.l(data[i])
          let plusDM = 0
          if (upMove > downMove && upMove > 0) {
            plusDM = upMove
          }

          let minusDM = 0
          if (downMove > upMove && downMove > 0) {
            minusDM = downMove
          }

          const TR = d3_max([
            p.accessor.h(d) - p.accessor.l(d),
            Math.abs(p.accessor.h(d) - p.accessor.c(data[i - 1])),
            Math.abs(p.accessor.l(d) - p.accessor.c(data[i - 1])),
          ])

          const plusDmAverage = plusDmEma.average(plusDM),
            minusDmAverage = minusDmEma.average(minusDM),
            trEmaAverage = trEma.average(TR)

          if (i > p.period) {
            const plusDi = (100 * plusDmAverage) / trEmaAverage,
              minusDi = (100 * minusDmAverage) / trEmaAverage
            let adxValue = 0

            if (plusDi - minusDi !== 0) {
              adxValue = Math.abs((plusDi - minusDi) / (plusDi + minusDi))
            }
            const adx = 100 * adxEma.average(adxValue)

            if (i >= p.period * 2) {
              return datum(p.accessor.d(d), adx, plusDi, minusDi)
            } else return datum(p.accessor.d(d))
          } else return datum(p.accessor.d(d))
        })
        .filter((d) => d.adx)
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc()).period(14)

    return indicator
  }
}

function datum(date, adx, plusDi, minusDi) {
  if (plusDi) {
    return { date: date, adx: adx, plusDi: plusDi, minusDi: minusDi }
  } else {
    return { date: date, adx: null, plusDi: null, minusDi: null }
  }
}
