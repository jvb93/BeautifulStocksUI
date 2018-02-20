<template>
  <div id="app">
    <header>
      <!-- Fixed navbar -->
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Beautiful</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="mx-5" v-for="(key, value) in tops" :key="value">
              <index-item :item="key"></index-item>
            </li> 

          </ul>
          <form class="form-inline mt-2 mt-md-0">
            <input class="form-control mr-sm-2" placeholder="Symbol" aria-label="Search" type="text" v-on:keyup.enter="showModal(selectedSymbol)" v-model="selectedSymbol">
            <button class="btn btn-outline-primary my-2 my-sm-0" v-shortkey="['ctrl', 'q']" @shortkey="showLookupModal()" @click="showModal(selectedSymbol)" type="button">Lookup</button>
          </form>
        </div>
      </nav>
    </header>
    <main class="container-fluid">
        <router-view v-on:stockpopup="showModal"/>
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
    </main>
  </div>
</template>

<script>
import IndexItem from './components/IndexItem'
import StockDisplay from './components/StockDisplay'
import $ from 'jquery'
const url = 'https://ws-api.iextrading.com/1.0/tops'
const socket = require('socket.io-client')(url)



export default {
  name: 'App',
  data: function(){
      return {
        tops:{
          SPY:{
            current:{},
            last:{}
          },
          QQQ:{
            current:{},
            last:{}
          },
          DIA:{
            current:{},
            last:{}
          },
        },
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
    
    },
    showModal:function(symbol) 
    { 
      this.$modal.hide('lookup-modal'); 
      this.selectedSymbol = symbol; 
      this.$modal.show('stock-modal'); 
    }, 
  },
  mounted: async function(){
    //this.SPY = await this.getQuote("SPY");
   // this.QQQ = await this.getQuote("QQQ");
    //this.DIA = await this.getQuote("DIA");
    var indicesLastRef = this.indicesLast;
    var indicesRef = this.indices;
    socket.on('message', message => {
      var messageObj = JSON.parse(message);
      if(messageObj.symbol == 'SPY'){
        this.tops.SPY.last = this.tops.SPY.current;
        this.tops.SPY.current = messageObj;
      }
      else if(messageObj.symbol == 'DIA'){
        this.tops.DIA.last = this.tops.DIA.current;
        this.tops.DIA.current = messageObj;      
      }
      else if(messageObj.symbol == 'QQQ'){
        this.tops.QQQ.last = this.tops.QQQ.current
        this.tops.QQQ.current = messageObj;
      }

    })


    socket.on('connect', () => {
      socket.emit('subscribe', 'qqq,dia,spy');
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald:200,400|Roboto:100,300');
html, body{
  background-color: #23272A !important;
  color: white !important;
  font-family: 'Roboto', sans-serif !important;

}
.font-oswald{ 
    font-family: 'Oswald', sans-serif !important;
}

.font-oswald-light{ 
    font-family: 'Oswald', sans-serif !important;
    font-weight: 200 !important;
}

.font-roboto{
    font-family: 'Roboto', sans-serif !important;
}
.list-group-item{
  background-color: transparent !important;
}

.v--modal-overlay{
  background: rgba(0, 0, 0, 0.7) !important;
}
.nav-link.active,
.nav-link.active:hover
{
  color:#23272A !important;
}
.vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}

.card-dark{
    background-color: #23272A !important;
}

.v--modal{
    background-color:transparent!important;
}
</style>
