# TechanJS

> **Te**chnical **Ch**art **An**alysis

A visual, technical analysis and charting library built on [D3](https://github.com/d3/d3). Build interactive financial charts for modern and mobile browsers.

**Note:** This project has been modernized to use D3 v7 and ES Modules.

[Examples Gallery](https://github.com/andredumas/techan.js/wiki/Gallery)

TechanJS utilizes D3's [reusable chart API](https://bost.ocks.org/mike/chart/) pattern and currently supports a range of [static and interactive plots](http://bl.ocks.org/andredumas/edf630690c10b89be390).

## Static Plots

- [Candlestick](http://bl.ocks.org/andredumas/27c4a333b0e0813e093d)
- [OHLC](http://bl.ocks.org/andredumas/06ad3573c0053d0e1fc7)
- [Volume](http://bl.ocks.org/andredumas/f9cb47fa9e32ce34011a)
- [Axis Annotations](http://bl.ocks.org/andredumas/06d462978e089323a116)
- [Moving Averages (Simple & Exponential)](http://bl.ocks.org/andredumas/274b54b4d2c2ffa19fca)
- [RSI](http://bl.ocks.org/andredumas/6da267f1c51a13dea35b)
- [MACD](http://bl.ocks.org/andredumas/10d701ccb3b8b1e99878)

## Interactive & Dynamic Plots

- [Updating Data Feed](http://bl.ocks.org/andredumas/95f1f22130fb1a3a8181)
- [Crosshair](http://bl.ocks.org/andredumas/045f550b72ad46301130)
- [Trendlines](http://bl.ocks.org/andredumas/69f49097e9bb5c0c6e4d)
- [Support & Resistence Lines](http://bl.ocks.org/andredumas/10194a84a3e46fe127d4)
- [Plot Zooming](http://bl.ocks.org/andredumas/a48008ea8e2c832144db)

## Algorithms

- [Ichimoku Cloud](http://bl.ocks.org/andredumas/ef212e7c26d2b7ba5403)
- [Moving Averages (Simple & Exponential)](http://bl.ocks.org/andredumas/274b54b4d2c2ffa19fca)
- [RSI](http://bl.ocks.org/andredumas/6da267f1c51a13dea35b)
- [MACD](http://bl.ocks.org/andredumas/10d701ccb3b8b1e99878)
- [ATR](http://bl.ocks.org/andredumas/5cb069d5cc38397d6fc1)
- [ATR Trailing Stop](http://bl.ocks.org/andredumas/55cacf3a2a4881f0be66)

## Getting Started

### Installation

```bash
npm install --save techanjs
```

### Usage

#### ES Modules (Recommended)

```javascript
import * as d3 from 'd3';
import techanjs from 'techanjs';

// Use techan...
const candlestick = techanjs.plot.candlestick().xScale(x).yScale(y);
```

#### Browser (UMD)

Include D3 and TechanJS in your HTML:

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="path/to/techan.js"></script>
<script>
  // Access via global variable 'techanjs'
  var candlestick = techanjs.plot.candlestick().xScale(x).yScale(y);
</script>
```

**Important:** The global variable name is now `techanjs` (previously `techan`).

## Development

### Build From Source

Cloning and building the project:

```bash
git clone https://github.com/andredumas/techan.js.git
cd techan.js
npm install

# Build the project (generates dist/techan.js and dist/techan.mjs)
npm run build
```

### Running Tests

```bash
npm test
```

### Linting and Formatting

```bash
# Check for linting errors
npm run lint

# Format code
npm run fmt
```
