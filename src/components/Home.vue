<template>
  <div>
    <div class="row">
      <div class="col">    
        <div class="row">
          <div class="col">
            <h3>Gainers</h3>
            <table class="table table-dark table-striped table-sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Symbol</th>
                  <th>Last Price</th>
                  <th>Change</th>
                  <th>Mkt. Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stock, index) in gainers" :key="index" @click="$emit('stockpopup', stock.symbol)">
                  <td>{{index+1}}</td>
                  <td>{{stock.symbol}}</td>
                  <td>{{stock.latestPrice}}</td>
                  <td class="text-success">{{(stock.changePercent * 100).toFixed(2)}}%</td>
                  <td>{{intToString(stock.marketCap,2)}}</td>
                </tr> 
              </tbody>
            </table>
            <h3>Losers</h3>
            <table class="table table-dark table-striped table-sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Symbol</th>
                  <th>Last Price</th>
                  <th>Change</th>
                   <th>Mkt. Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stock, index) in losers" :key="index" @click="$emit('stockpopup', stock.symbol)">
                  <td>{{index+1}}</td>
                  <td>{{stock.symbol}}</td>
                  <td>{{stock.latestPrice}}</td>
                  <td class="text-danger">{{(stock.changePercent * 100).toFixed(2)}}%</td>
                  <td>{{intToString(stock.marketCap,2)}}</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col">
      </div> 
      <div class="col">
        <h1>Trending</h1>   
        <div v-bar style="height:70vh;">
          <div>
            <ul class="list-group list-group-flush">
              <li @click="$emit('stockpopup', symbol.symbol)" class="list-group-item" style="cursor:pointer" v-for="(symbol, index) in trendingSymbols" :key="index">{{symbol.symbol}}</li>
            </ul>
          </div>    
        </div>
        
      </div> 
    </div>
  </div>
</template>
<script>
import StockDisplay from './StockDisplay'
import $ from 'jquery'
var NumAbbr = require('number-abbreviate')
export default {
  name: 'Home',
  data () {
    return {
      trendingSymbols: [],
      gainers:[],
      losers:[]
    }
  },
  methods:{
    getTrendingSymbols(){
      
      this.$http.jsonp('https://api.stocktwits.com/api/2/trending/symbols.json').then(response => {
        this.trendingSymbols = response.body.symbols;
        }, response => {
      })
    },
    getGainers(){
      this.$http.get('https://api.iextrading.com/1.0/stock/market/list/gainers').then(response => {
        this.gainers = response.body;
        }, response => {
      })
    },
     getLosers(){
      this.$http.get('https://api.iextrading.com/1.0/stock/market/list/losers').then(response => {
        this.losers = response.body;
        }, response => {
      })
    },
    getQuote: function (symbol) {
      return new Promise(resolve => {
        this.$http.get("/tradier/markets/quotes?symbols=" + symbol)
          .then(response => {
             resolve(response.body.quotes.quote);
          })      
      });
    
    },
    intToString:function(value) {
          var numAbbr = new NumAbbr()
          return numAbbr.abbreviate(value, 2);
      },
  }, 
  mounted: async function(){
    this.getTrendingSymbols();
    this.getGainers();
    this.getLosers();
  

  }
}
</script>



