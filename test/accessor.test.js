import { describe, it, expect } from 'vitest';
import accessorFactory from '../src/accessor/index';

describe('accessor', () => {
  const accessor = accessorFactory();

  it('should have all expected accessors', () => {
    expect(accessor.adx).toBeDefined();
    expect(accessor.aroon).toBeDefined();
    expect(accessor.atrtrailingstop).toBeDefined();
    expect(accessor.bollinger).toBeDefined();
    expect(accessor.crosshair).toBeDefined();
    expect(accessor.ichimoku).toBeDefined();
    expect(accessor.macd).toBeDefined();
    expect(accessor.ohlc).toBeDefined();
    expect(accessor.rsi).toBeDefined();
    expect(accessor.stochastic).toBeDefined();
    expect(accessor.tick).toBeDefined();
    expect(accessor.trade).toBeDefined();
    expect(accessor.trendline).toBeDefined();
    expect(accessor.value).toBeDefined();
    expect(accessor.volume).toBeDefined();
    expect(accessor.williams).toBeDefined();
  });
});
