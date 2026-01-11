import adx from './adx'
import aroon from './aroon'
import atrtrailingstop from './atrtrailingstop'
import bollinger from './bollinger'
import crosshair from './crosshair'
import ichimoku from './ichimoku'
import macd from './macd'
import ohlc from './ohlc'
import rsi from './rsi'
import stochastic from './stochastic'
import supstance from './supstance'
import tick from './tick'
import trade from './trade'
import trendline from './trendline'
import value from './value'
import volume from './volume'
import williams from './williams'

export default function () {
  return {
    adx,
    aroon,
    atrtrailingstop,
    bollinger,
    crosshair,
    ichimoku,
    macd,
    ohlc,
    rsi,
    stochastic,
    supstance,
    tick,
    trade,
    trendline,
    value,
    volume,
    williams,
  }
}
