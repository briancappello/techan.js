import indicatormixin from './indicatormixin';
import accessorFactory from '../accessor/index';
import ema_init from './ema';
import sma_init from './sma';
import atr_init from './atr';
import utilFactory from '../util/index';
import sroc_init from './sroc';
import vwap_init from './vwap';
import atrtrailingstop_init from './atrtrailingstop';
import heikinashi_init from './heikinashi';
import ichimoku_init from './ichimoku';
import macd_init from './macd';
import rsi_init from './rsi';
import aroon_init from './aroon';
import stochastic_init from './stochastic';
import williams_init from './williams';
import adx_init from './adx';
import bollinger_init from './bollinger';

export default function(d3) {
  const indicatorMixin = indicatormixin(),
      accessor = accessorFactory(),
      ema = ema_init(indicatorMixin, accessor.ohlc, ema_alpha_init),
      sma = sma_init(indicatorMixin, accessor.ohlc),
      atr = atr_init(indicatorMixin, accessor.ohlc, sma),
      circularbuffer = utilFactory().circularbuffer,
      vwap = vwap_init(indicatorMixin, accessor.ohlc);

  return {
    atr: atr,
    atrtrailingstop: atrtrailingstop_init(indicatorMixin, accessor.ohlc, atr),
    ema: ema,
    heikinashi: heikinashi_init(indicatorMixin, accessor.ohlc, d3.min, d3.max),
    ichimoku: ichimoku_init(indicatorMixin, accessor.ohlc),
    macd: macd_init(indicatorMixin, accessor.ohlc, ema),
    rsi: rsi_init(indicatorMixin, accessor.ohlc, ema),
    sma: sma,
    wilderma: ema_init(indicatorMixin, accessor.ohlc, wilder_alpha_init),
    aroon: aroon_init(indicatorMixin, accessor.ohlc),
    roc: sroc_init(circularbuffer, indicatorMixin, accessor.ohlc, ema, 1),
    sroc: sroc_init(circularbuffer, indicatorMixin, accessor.ohlc, ema, 13),
    stochastic: stochastic_init(indicatorMixin, accessor.ohlc, ema),
    williams: williams_init(indicatorMixin, accessor.ohlc, ema),
    adx: adx_init(d3.max, indicatorMixin, accessor.ohlc, ema),
    bollinger: bollinger_init(indicatorMixin, accessor.ohlc, sma),
    vwap: vwap
   };
}

function ema_alpha_init(period) {
  return 2 / (period + 1);
}

function wilder_alpha_init(period) {
  return 1 / period;
}
