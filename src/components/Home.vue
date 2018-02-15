<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Indices</h1>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><index-item :item="SPY"></index-item></li>
            <li class="list-group-item"><index-item :item="QQQ"></index-item></li>
            <li class="list-group-item"><index-item :item="DIA"></index-item></li>
        
        </ul>
        <div v-if="!modalShown" class="fixed-bottom w-25">
          <div class="input-group">
            <input type="text" class="form-control" v-on:keyup.enter="showModal(selectedSymbol)" v-model="selectedSymbol">
            <div class="input-group-append">
              <button class="btn btn-secondary" @click="showModal(selectedSymbol)" type="button">Look Up</button>
            </div>
          </div>
           
            
        </div>
    
      </div>
      <div class="col">
      </div> 
      <div class="col">
        <h1>Trending</h1>
        <ul class="list-group list-group-flush">
            <li @click="showModal(symbol.symbol)" class="list-group-item " v-for="(symbol, index) in trendingSymbols" :key="index">{{symbol.symbol}}</li>
        </ul>
      </div> 
    </div>
    <modal :scrollable="true" name="stock-modal" :height="'auto'" :width="'60%'" @opened="modalShown = true" @closed="modalShown = false">
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
     SPY:{},
     QQQ:{},
     DIA:{},
     selectedSymbol:"",
     modalShown:false
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
    getQuote: function (symbol) {
      return new Promise(resolve => {
        this.$http.get("https://api.iextrading.com/1.0/stock/"+symbol+"/batch?types=quote&range=1d&last=10")
          .then(response => {
             resolve(response.body.quote);
          })      
      });
    
    },
  }, 
  mounted: async function(){
    this.getTrendingSymbols();
    
    this.SPY = await this.getQuote("SPY");
    this.QQQ = await this.getQuote("QQQ");
    this.DIA = await this.getQuote("DIA");
  

  }
}
</script>



