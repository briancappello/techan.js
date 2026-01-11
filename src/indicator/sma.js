export default function (indicatorMixin, accessor_ohlc) {
  // Injected dependencies
  return function () {
    // Closure function
    const p = {} // Container for private, direct access mixed in variables
    let samples, currentIndex, total

    function indicator(data) {
      indicator.init()
      return data.map(ma).filter((d) => d.value !== null)
    }

    indicator.init = function () {
      total = 0
      samples = []
      currentIndex = 0
      return indicator
    }

    function ma(d, i) {
      const value = indicator.average(p.accessor(d))
      return { date: p.accessor.d(d), value: i + 1 < p.period ? null : value }
    }

    indicator.average = function (value) {
      total += value

      if (samples.length + 1 < p.period) {
        samples.push(value)
        return total / ++currentIndex
      } else {
        if (samples.length < p.period) {
          samples.push(value)
          total += value
        }

        total -= samples[currentIndex]
        samples[currentIndex] = value
        if (++currentIndex === p.period) {
          currentIndex = 0
        }

        return total / p.period
      }
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc()).period(10)

    return indicator
  }
}
