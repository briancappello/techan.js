export default function () {
  let date = (d) => d.date,
    macd = (d) => d.macd,
    zero = () => 0,
    signal = (d) => d.signal

  function accessor(d) {
    return accessor.m(d)
  }

  accessor.date = function (_) {
    if (!arguments.length) return date
    date = _
    return bind()
  }

  accessor.macd = function (_) {
    if (!arguments.length) return macd
    macd = _
    return bind()
  }

  accessor.signal = function (_) {
    if (!arguments.length) return signal
    signal = _
    return bind()
  }

  function bind() {
    accessor.d = date
    accessor.m = macd
    accessor.s = signal
    accessor.dif = function (d) {
      return accessor.m(d) - accessor.s(d)
    }
    accessor.z = zero

    return accessor
  }

  return bind()
}
