<template>
  <div>
    <div class="row">
      <div class="col">    
       
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

export default {
  name: 'Home',
  data () {
    return {
      trendingSymbols: [],
    }
  },
  methods:{
    getTrendingSymbols(){
      this.$http.jsonp('https://api.stocktwits.com/api/2/trending/symbols.json').then(response => {
        this.trendingSymbols = response.body.symbols;
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
  }, 
  mounted: async function(){
    this.getTrendingSymbols();
  }
}
</script>



