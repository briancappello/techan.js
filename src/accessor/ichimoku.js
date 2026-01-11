export default function () {
  let date = (d) => d.date,
    tenkanSen = (d) => d.tenkanSen, // Conversion line
    kijunSen = (d) => d.kijunSen, // Base Line
    senkouSpanA = (d) => d.senkouSpanA, // Leading Span A
    senkouSpanB = (d) => d.senkouSpanB, // Leading Span B
    chikouSpan = (d) => d.chikouSpan, // Lagging Span
    // Functions to get to the parameters
    ptenanSen = (d) => d.parameters.tenkanSen, // Parameter: Conversion Line Period
    pkijunSen = (d) => d.parameters.kijunSen, // Parameter: Base Line Period, Offset
    psenkouSpanB = (d) => d.parameters.senkouSpanB // Parameter: Senkou Span B Period, Offset

  function accessor(d) {
    return accessor.ts(d)
  }

  accessor.date = function (_) {
    if (!arguments.length) return date
    date = _
    return bind()
  }

  accessor.tenkanSen = function (_) {
    if (!arguments.length) return tenkanSen
    tenkanSen = _
    return bind()
  }

  accessor.kijunSen = function (_) {
    if (!arguments.length) return kijunSen
    kijunSen = _
    return bind()
  }

  accessor.senkouSpanA = function (_) {
    if (!arguments.length) return senkouSpanA
    senkouSpanA = _
    return bind()
  }

  accessor.senkouSpanB = function (_) {
    if (!arguments.length) return senkouSpanB
    senkouSpanB = _
    return bind()
  }

  accessor.chikouSpan = function (_) {
    if (!arguments.length) return chikouSpan
    chikouSpan = _
    return bind()
  }

  accessor.ptenanSen = function (_) {
    if (!arguments.length) return ptenanSen
    ptenanSen = _
    return bind()
  }

  accessor.pkijunSen = function (_) {
    if (!arguments.length) return pkijunSen
    pkijunSen = _
    return bind()
  }

  accessor.psenkouSpanB = function (_) {
    if (!arguments.length) return psenkouSpanB
    psenkouSpanB = _
    return bind()
  }

  function bind() {
    accessor.d = date
    accessor.ts = tenkanSen
    accessor.ks = kijunSen
    accessor.sa = senkouSpanA
    accessor.sb = senkouSpanB
    accessor.c = chikouSpan
    accessor.pts = ptenanSen
    accessor.pks = pkijunSen
    accessor.pssb = psenkouSpanB

    return accessor
  }

  return bind()
}
