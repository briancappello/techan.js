export default function () {
  let date = (d) => d.date,
    volume = (d) => d.volume

  function accessor(d) {
    return accessor.v(d)
  }

  accessor.date = function (_) {
    if (!arguments.length) return date
    date = _
    return bind()
  }

  accessor.volume = function (_) {
    if (!arguments.length) return volume
    volume = _
    return bind()
  }

  function bind() {
    accessor.d = date
    accessor.v = volume

    return accessor
  }

  return bind()
}
