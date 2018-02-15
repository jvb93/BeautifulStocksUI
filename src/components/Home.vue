<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Indices</h1>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><index-item :current="getCloseAtKey(INX, 0)" :last="getCloseAtKey(INX, 1)" :symbol="'INX'"></index-item></li>
            <li class="list-group-item"><index-item :current="getCloseAtKey(DJI, 0)" :last="getCloseAtKey(DJI, 1)" :symbol="'DJI'"></index-item></li>
            <li class="list-group-item"><index-item :current="getCloseAtKey(IXIC, 0)" :last="getCloseAtKey(IXIC, 1)" :symbol="'IXIC'"></index-item></li>
        </ul>
      
      </div>
      <div class="col">
      </div> 
      <div class="col">
        <h1>Trending</h1>
        <ul class="list-group list-group-flush">
            <li @click="showModal(symbol)" class="list-group-item " v-for="(symbol, index) in trendingSymbols" :key="index">{{symbol.symbol}}</li>
        </ul>
      </div> 
    </div>
    <modal name="stock-modal" :height="'auto'" :width="'60%'">
      <stock-display :symbol="selectedSymbol"></stock-display>
    </modal>
  </div>
</template>
<script>
import IndexItem from './IndexItem'
import StockDisplay from './StockDisplay'
export default {
  name: 'Home',
  data () {
    return {
     trendingSymbols: [],
     INX:{},
     DJI:{},
     IXIC:{},
     selectedSymbol:{}
    }
  },
  components:{
    IndexItem,
    StockDisplay
  },
  methods:{
    showModal:function(symbol)
    {
      this.selectedSymbol = symbol;
      this.$modal.show('stock-modal');
    },
    getTrendingSymbols(){
      this.$http.jsonp('https://api.stocktwits.com/api/2/trending/symbols.json').then(response => {
        this.trendingSymbols = response.body.symbols;
        }, response => {
      })
    },
    getINX: function () {
      this.$http.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=INX&interval=1min&apikey=" + localStorage.getItem("alphaVantageApiKey"))
          .then(response => {
              this.INX = response.data["Time Series (1min)"]          
          })      
    },
    getDJI: function () {
      this.$http.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DJI&interval=1min&apikey=" + localStorage.getItem("alphaVantageApiKey"))
          .then(response => {
              this.DJI = response.data["Time Series (1min)"]          
          })      
    },
    getIXIC: function () {
      this.$http.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IXIC&interval=1min&apikey=" + localStorage.getItem("alphaVantageApiKey"))
          .then(response => {
              this.IXIC = response.data["Time Series (1min)"]          
          })      
    },
    getCloseAtKey: function (timeSeries, key) {
        if (typeof timeSeries[Object.keys(timeSeries)[key]] === 'undefined' || typeof timeSeries[Object.keys(timeSeries)[key]]["4. close"] === 'undefined') {
            return 0;
        }
        return parseFloat(timeSeries[Object.keys(timeSeries)[key]]["4. close"]);
    }
  }, 
  mounted(){
    if(!localStorage.getItem("alphaVantageApiKey")){
        var key = prompt("Please enter your Alpha Vantage API Key");
        if(key!=null)
        {
          localStorage.setItem("alphaVantageApiKey", key);
         
        }
    }
    this.getTrendingSymbols();
    this.getINX();
    this.getDJI();
    this.getIXIC();
  }
}
</script>



