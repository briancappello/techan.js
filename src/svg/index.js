import arrowFactory from './arrow'
import utilFactory from '../util/index'

export default function () {
  return {
    arrow: arrowFactory(utilFactory().functor),
  }
}
