export default function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    const p = {};  // Container for private, direct access mixed in variables
    let overbought = 70,
        middle = 0,
        oversold = 30;

    function indicator(data) {
      return data.map((d, i) => {
        if(i >= (p.period - 1)){
          let max = 0;
          let maxi = 0;
          let min = 10000;
          let mini = 0;
          for (let j = 0; j < p.period; j++) {
            if( p.accessor.h(data[i - j]) > max){
              max = p.accessor.h(data[i - j]);
              maxi = j;
            }
            if( p.accessor.l(data[i - j]) < min){
              min = p.accessor.l(data[i - j]);
              mini = j;
            }
          }
          const up = ((p.period - maxi) / p.period) * 100;
          const down = ((p.period - mini) / p.period) * 100;
          const oscillator = up - down;
          return datum(p.accessor.d(d), up, down, oscillator, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d));
      }).filter(d => d.up);
    }

    indicator.overbought = function(_) {
      if (!arguments.length) return overbought;
      overbought = _;
      return indicator;
    };

    indicator.middle = function(_) {
      if (!arguments.length) return middle;
      middle = _;
      return indicator;
    };

    indicator.oversold = function(_) {
      if (!arguments.length) return oversold;
      oversold = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc()).period(20);

    return indicator;
  };
}

function datum(date, up, down, oscillator, middle, overbought, oversold) {
  if(up) return { date: date, up: up, down: down, oscillator: oscillator, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, up: null, down: null, oscillator: null, middle: null, overbought: null, oversold: null };
}
