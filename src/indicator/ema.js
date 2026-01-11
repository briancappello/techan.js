export default function (indicatorMixin, accessor_ohlc, alpha_init) {
  // Injected dependencies
  return function () {
    // Closure function
    const p = {} // Container for private, direct access mixed in variables
    let previous, alpha, initialTotal, initialCount

    function indicator(data) {
      indicator.init()
      return data.map(ma).filter((d) => d.value !== null)
    }

    indicator.init = function () {
      previous = null
      alpha = alpha_init(p.period)
      initialTotal = 0
      initialCount = 0
      return indicator
    }

    function ma(d, i) {
      let value = indicator.average(p.accessor(d))
      if (i + 1 < p.period) {
        value = null
      }

      return { date: p.accessor.d(d), value: value }
    }

    indicator.average = function (value) {
      if (initialCount < p.period)
        return (previous = (initialTotal += value) / ++initialCount)
      else return (previous = previous + alpha * (value - previous))
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc()).period(10)

    return indicator
  }
}
