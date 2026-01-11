import scaleFactory from '../scale/index'
import accessorFactory from '../accessor/index'
import plotFactory from './plot'
import utilFactory from '../util/index'
import plotMixinFactory from './plotmixin'
import candlestickFactory from './candlestick'
import lineFactory from './line'
import axisannotationFactory from './axisannotation'
import svgFactory from '../svg/index'
import adxFactory from './adx'
import aroonFactory from './aroon'
import atrtrailingstopFactory from './atrtrailingstop'
import bollingerFactory from './bollinger'
import crosshairFactory from './crosshair'
import ichimokuFactory from './ichimoku'
import macdFactory from './macd'
import rsiFactory from './rsi'
import stochasticFactory from './stochastic'
import supstanceFactory from './supstance'
import tickFactory from './tick'
import tradearrowFactory from './tradearrow'
import trendlineFactory from './trendline'
import volumeFactory from './volume'
import williamsFactory from './williams'

export default function (d3) {
  const scale = scaleFactory(d3),
    accessor = accessorFactory(),
    plot = plotFactory(d3.line, d3.area, d3.curveMonotoneX, d3.select),
    d3_functor = utilFactory().functor,
    plotMixin = plotMixinFactory(
      d3.scaleLinear,
      d3_functor,
      scale.financetime,
      plot.dataSelector,
      plot.barWidth,
    ),
    candlestick = candlestickFactory(
      d3.scaleLinear,
      d3.extent,
      accessor.ohlc,
      plot,
      plotMixin,
    ),
    line = lineFactory,
    axisannotation = axisannotationFactory(
      d3.axisTop,
      d3.scaleLinear,
      accessor.value,
      plot,
      plotMixin,
    ),
    svg = svgFactory(d3)

  return {
    adx: adxFactory(accessor.adx, plot, plotMixin),
    aroon: aroonFactory(accessor.aroon, plot, plotMixin),
    atr: line(accessor.value, plot, plotMixin),
    atrtrailingstop: atrtrailingstopFactory(
      accessor.atrtrailingstop,
      plot,
      plotMixin,
    ),
    axisannotation: axisannotation,
    bollinger: bollingerFactory(accessor.bollinger, plot, plotMixin),
    candlestick: candlestick,
    close: line(accessor.ohlc, plot, plotMixin),
    crosshair: crosshairFactory(
      d3.select,
      d3.pointer,
      d3.dispatch,
      accessor.crosshair,
      plot,
      plotMixin,
    ),
    ema: line(accessor.value, plot, plotMixin),
    heikinashi: candlestick,
    ichimoku: ichimokuFactory(
      d3.area,
      d3.curveMonotoneX,
      accessor.ichimoku,
      plot,
      plotMixin,
    ),
    macd: macdFactory(accessor.macd, plot, plotMixin),
    momentum: line(accessor.value, plot, plotMixin, true),
    moneyflow: line(accessor.value, plot, plotMixin, true),
    ohlc: ohlcFactory(
      d3.scaleLinear,
      d3.extent,
      accessor.ohlc,
      plot,
      plotMixin,
    ),
    roc: line(accessor.value, plot, plotMixin, true),
    rsi: rsiFactory(accessor.rsi, plot, plotMixin),
    sma: line(accessor.value, plot, plotMixin),
    sroc: line(accessor.value, plot, plotMixin, true),
    stochastic: stochasticFactory(accessor.stochastic, plot, plotMixin),
    supstance: supstanceFactory(
      d3.drag,
      d3.select,
      d3.dispatch,
      accessor.supstance,
      plot,
      plotMixin,
    ),
    tick: tickFactory(
      d3.scaleLinear,
      d3.extent,
      accessor.tick,
      plot,
      plotMixin,
    ),
    tradearrow: tradearrowFactory(
      d3.select,
      d3_functor,
      d3.pointer,
      d3.dispatch,
      accessor.trade,
      plot,
      plotMixin,
      svg.arrow,
    ),
    trendline: trendlineFactory(
      d3.drag,
      d3.select,
      d3.dispatch,
      accessor.trendline,
      plot,
      plotMixin,
    ),
    volume: volumeFactory(accessor.volume, plot, plotMixin),
    vwap: line(accessor.value, plot, plotMixin),
    wilderma: line(accessor.value, plot, plotMixin),
    williams: williamsFactory(accessor.williams, plot, plotMixin),
  }
}

import ohlcFactory from './ohlc'
