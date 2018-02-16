<template>
  <div>
    <div class="row">
      <div class="col">
        <index-item :item="SPY"></index-item>
      </div>
      <div class="col">
        <index-item :item="QQQ"></index-item>
      </div>
      <div class="col">
        <index-item :item="DIA"></index-item>
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="col">    
        <div v-if="!lookupModalShown && !quoteModalShown" class="fixed-bottom w-25">
          <button v-shortkey="['ctrl', 'q']"  @shortkey="showLookupModal()" @click="showLookupModal()" class="btn btn-secondary">lookup</button>         
        </div>
      </div>
      <div class="col">
      </div> 
      <div class="col">
        <h1>Trending</h1>   
        <div v-bar style="height:70vh;">
          <div>
            <ul class="list-group list-group-flush">
              <li @click="showModal(symbol.symbol)" class="list-group-item" style="cursor:pointer" v-for="(symbol, index) in trendingSymbols" :key="index">{{symbol.symbol}}</li>
            </ul>
          </div>    
        </div>
        
      </div> 
    </div>
    <modal :scrollable="true"  name="stock-modal" :height="'auto'" :width="'100%'" @opened="quoteModalShown = true" @closed="quoteModalShown = false">
      <stock-display :symbol="selectedSymbol"></stock-display>
    </modal>
     <modal :scrollable="true" name="lookup-modal" :height="'auto'" :width="'50%'" @opened="focusOnQuoteLookup" @closed="lookupModalShown = false">
       <div class="card" style="background-color:#2C2F33;">
         <div class="card-body">
            <input class="form-control form-control-lg m5" id="quoteLookupInput" placeholder="Symbol" v-model="selectedSymbol" v-on:keyup.enter="showModal(selectedSymbol)" />
         </div>
         
       </div>
     
    </modal>
  </div>
</template>
<script>
import IndexItem from './IndexItem'
import StockDisplay from './StockDisplay'
import $ from 'jquery'

export default {
  name: 'Home',
  data () {
    return {
      trendingSymbols: [],
      SPY:{},
      QQQ:{},
      DIA:{},
      selectedSymbol:"",
      lookupModalShown:false,
      quoteModalShown:false,

    }
  },
  components:{
    IndexItem,
    StockDisplay
  },
  methods:{
    showModal:function(symbol)
    {
      this.$modal.hide('lookup-modal');
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
        this.$http.get("/tradier/markets/quotes?symbols=" + symbol)
          .then(response => {
             resolve(response.body.quotes.quote);
          })      
      });
    
    },
    focusOnQuoteLookup:function(){
      $('#quoteLookupInput').focus()
    },
    showLookupModal:function()
    {
      this.selectedSymbol = "",
      this.lookupModalShown = true;
      this.$modal.show('lookup-modal');
    
    }
  }, 
  mounted: async function(){
    this.getTrendingSymbols();
    
    this.SPY = await this.getQuote("SPY");
    this.QQQ = await this.getQuote("QQQ");
    this.DIA = await this.getQuote("DIA");
  

  }
}
</script>



