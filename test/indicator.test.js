import { describe, it, expect, beforeEach } from 'vitest'
import techan from '../src/techan'
import movingaverage from './spec/bundle/_fixtures/data/movingaverage.cjs'

describe('indicator/ema', () => {
  const ema = techan.indicator.ema()

  describe('And ema is initialised with defaults', () => {
    it('should calculate correct values', () => {
      const result = ema(movingaverage.input)
      result.forEach((d, i) => {
        expect(d.date).toEqual(movingaverage.expected.ema[i].date)
        expect(d.value).toBeCloseTo(movingaverage.expected.ema[i].value, 10)
      })
    })

    it('should calculate the same correct values on second invoke', () => {
      const result = ema(movingaverage.input)
      result.forEach((d, i) => {
        expect(d.date).toEqual(movingaverage.expected.ema[i].date)
        expect(d.value).toBeCloseTo(movingaverage.expected.ema[i].value, 10)
      })
    })
  })
})
