import arrowFactory from './arrow';
import utilFactory from '../util/index';

export default function(d3) {
  return {
    arrow: arrowFactory(utilFactory().functor)
  };
}
