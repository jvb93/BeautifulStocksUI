webpackJsonp([1],{0:function(t,s){},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("7+uW"),i={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]};var o=e("VU/8")({name:"App"},i,!1,function(t){e("qKSJ")},null,null).exports,n=e("/ocq"),l=e("Xxa5"),r=e.n(l),c=e("exGp"),u=e.n(c),d=e("//Fk"),v=e.n(d),_={props:{item:{type:Object,required:!0}}},p={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("h1",{class:{"display-3":!0,"font-oswald-light":!0,"text-danger":t.item.change_percentage<0,"text-success":t.item.change_percentage>=0}},[t._v(t._s(t.item.last)+" "),e("small",[t._v("("+t._s(t.item.change_percentage.toFixed(2))+"%)")])]),t._v(" "),e("p",[t._v(t._s(t.item.symbol))])])},staticRenderFns:[]},h=e("VU/8")(_,p,!1,null,null,null).exports,m=e("eODd"),g={props:{symbol:{type:String,required:!0}},data:function(){return{timeSeries:{},stockData:{},options:[],stockTwits:[]}},methods:{getStockData:function(){var t=this;this.$http.get("/iex/stock/"+this.symbol+"/batch?types=quote,news,chart&range=1d&last=10").then(function(s){t.stockData=s.data})},getOptions:function(){var t=this;this.$http.get("/tradier/markets/options/chains?symbol="+this.symbol+"&expiration="+this.getNextDayOfWeek(new Date,5)).then(function(s){t.options=s.data.options.option})},getStockTwits:function(){var t=this;this.$http.jsonp("https://api.stocktwits.com/api/2/streams/symbol/"+this.symbol+".json").then(function(s){t.stockTwits=s.body.messages},function(t){})},intToString:function(t){return(new m).abbreviate(t,2)},getNextDayOfWeek:function(t,s){var e=new Date(t.getTime());return e.setDate(t.getDate()+(7+s-t.getDay())%7),e}},computed:{chartData:function(){for(var t=[],s=this.stockData.chart,e=0;e<s.length;e++)s[e].marketAverage&&t.push([s[e].label,s[e].marketAverage]);return console.log(t),t},chartOptions:function(){return{title:{text:""},subtitle:{text:""},yAxis:{title:{text:""}},xAxis:{visible:!1},chart:{backgroundColor:"transparent"},colors:["#7289DA","FFF","#99AAB5"],plotOptions:{series:{label:{connectorAllowed:!1}}},legend:{enabled:!1},series:[{name:"Price",data:this.chartData}],responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]}}}},mounted:function(){this.getStockData(),this.getOptions(),this.getStockTwits()}},b={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"card",staticStyle:{"background-color":"#2C2F33",height:"100%"}},[e("div",{staticClass:"card-body"},[e("button",{staticClass:"close float-right",attrs:{type:"button","aria-label":"Close"},on:{click:function(s){t.$modal.hide("stock-modal")}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._v(" "),e("h1",{staticClass:"card-title text-center"},[t._v(t._s(t.symbol.toUpperCase()))]),t._v(" "),e("h6",{staticClass:"card-subtitle mb-2 text-muted text-center"},[t._v(t._s(t.stockData.quote.companyName))]),t._v(" "),e("h4",{staticClass:"card-text text-center"},[t._v("$"+t._s(t.stockData.quote.latestPrice))]),t._v(" "),e("hr"),t._v(" "),e("highcharts",{attrs:{options:t.chartOptions}}),t._v(" "),e("hr"),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h4",[t._v("Facts")]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h5",[t._v("Vol")]),t._v(" "),e("p",[t._v(t._s(t.intToString(t.stockData.quote.latestVolume)))])]),t._v(" "),e("div",{staticClass:"col"},[e("h5",[t._v("Avg. Vol")]),t._v(" "),e("p",[t._v(t._s(t.intToString(t.stockData.quote.avgTotalVolume)))])]),t._v(" "),e("div",{staticClass:"col"},[e("h5",[t._v("P/E")]),t._v(" "),e("p",[t._v(t._s(t.stockData.quote.peRatio))])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h5",[t._v("52wk. Hi")]),t._v(" "),e("p",[t._v(t._s(t.stockData.quote.week52High))])]),t._v(" "),e("div",{staticClass:"col"},[e("h5",[t._v("52wk. Lo")]),t._v(" "),e("p",[t._v(t._s(t.stockData.quote.week52Low))])]),t._v(" "),e("div",{staticClass:"col"},[e("h5",[t._v("Mkt. Cap")]),t._v(" "),e("p",[t._v(t._s(t.intToString(t.stockData.quote.marketCap)))])])])])]),t._v(" "),e("hr"),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"tab-content",attrs:{id:"myTabContent"}},[e("div",{staticClass:"tab-pane fade show active",attrs:{id:"news",role:"tabpanel","aria-labelledby":"news-tab"}},[e("ul",{staticClass:"list-group list-group-flush"},t._l(t.stockData.news,function(s,a){return e("li",{key:a,staticClass:"list-group-item"},[e("small",{staticClass:"text-muted"},[t._v("["),e("timeago",{attrs:{since:s.datetime}}),t._v("]")],1),t._v(" "),e("a",{staticClass:"text-light",attrs:{href:s.url,target:"_blank"}},[t._v(t._s(s.headline))])])}))]),t._v(" "),e("div",{staticClass:"tab-pane fade",attrs:{id:"options",role:"tabpanel","aria-labelledby":"options-tab"}},[e("table",{staticClass:"table"},[t._m(1),t._v(" "),e("tbody",t._l(t._.orderBy(t.options,["open_interest"],["desc"]),function(s,a){return e("tr",{key:a},[e("td",[t._v(t._s(s.expiration_date))]),t._v(" "),e("td",[t._v(t._s(s.strike))]),t._v(" "),e("td",[t._v(t._s(s.option_type))]),t._v(" "),e("td",[t._v(t._s(s.bid))]),t._v(" "),e("td",[t._v(t._s(s.ask))]),t._v(" "),e("td",[t._v(t._s(s.open_interest))])])}))])]),t._v(" "),e("div",{staticClass:"tab-pane fade show active",attrs:{id:"stock-twits",role:"tabpanel","aria-labelledby":"stock-twits-tab"}},[e("ul",{staticClass:"list-group list-group-flush"},t._l(t.stockTwits,function(s,a){return e("li",{key:a,staticClass:"list-group-item"},[e("small",{staticClass:"text-muted"},[t._v("["),e("timeago",{attrs:{since:s.created_at}}),t._v("]")],1),t._v(" "+t._s(s.body)+" - "+t._s(s.user.username))])}))])])],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("ul",{staticClass:"nav nav-tabs",attrs:{id:"myTab",role:"tablist"}},[s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link active",attrs:{id:"news-tab","data-toggle":"tab",href:"#news",role:"tab","aria-controls":"news","aria-selected":"true"}},[this._v("News")])]),this._v(" "),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{id:"options-tab","data-toggle":"tab",href:"#options",role:"tab","aria-controls":"options","aria-selected":"false"}},[this._v("Options")])]),this._v(" "),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{id:"stock-twits-tab","data-toggle":"tab",href:"#stock-twits",role:"tab","aria-controls":"stock-twits","aria-selected":"false"}},[this._v("StockTwits")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("tr",[e("th",[t._v("Expiration")]),t._v(" "),e("th",[t._v("Strike")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Bid")]),t._v(" "),e("th",[t._v("Ask")]),t._v(" "),e("th",[t._v("Open Interest")])])])}]},f={name:"Home",data:function(){return{trendingSymbols:[],SPY:{},QQQ:{},DIA:{},selectedSymbol:"",modalShown:!1}},components:{IndexItem:h,StockDisplay:e("VU/8")(g,b,!1,null,null,null).exports},methods:{showModal:function(t){this.selectedSymbol=t,this.$modal.show("stock-modal")},getTrendingSymbols:function(){var t=this;this.$http.jsonp("https://api.stocktwits.com/api/2/trending/symbols.json").then(function(s){t.trendingSymbols=s.body.symbols},function(t){})},getQuote:function(t){var s=this;return new v.a(function(e){s.$http.get("/tradier/markets/quotes?symbols="+t).then(function(t){e(t.body.quotes.quote)})})}},mounted:function(){var t=u()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.getTrendingSymbols(),t.next=3,this.getQuote("SPY");case 3:return this.SPY=t.sent,t.next=6,this.getQuote("QQQ");case 6:return this.QQQ=t.sent,t.next=9,this.getQuote("DIA");case 9:this.DIA=t.sent;case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},k={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h1",[t._v("Indices")]),t._v(" "),e("ul",{staticClass:"list-group list-group-flush"},[e("li",{staticClass:"list-group-item"},[e("index-item",{attrs:{item:t.SPY}})],1),t._v(" "),e("li",{staticClass:"list-group-item"},[e("index-item",{attrs:{item:t.QQQ}})],1),t._v(" "),e("li",{staticClass:"list-group-item"},[e("index-item",{attrs:{item:t.DIA}})],1)]),t._v(" "),t.modalShown?t._e():e("div",{staticClass:"fixed-bottom w-25"},[e("div",{staticClass:"input-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedSymbol,expression:"selectedSymbol"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.selectedSymbol},on:{keyup:function(s){if(!("button"in s)&&t._k(s.keyCode,"enter",13,s.key))return null;t.showModal(t.selectedSymbol)},input:function(s){s.target.composing||(t.selectedSymbol=s.target.value)}}}),t._v(" "),e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:function(s){t.showModal(t.selectedSymbol)}}},[t._v("Look Up")])])])])]),t._v(" "),e("div",{staticClass:"col"}),t._v(" "),e("div",{staticClass:"col"},[e("h1",[t._v("Trending")]),t._v(" "),e("ul",{staticClass:"list-group list-group-flush"},t._l(t.trendingSymbols,function(s,a){return e("li",{key:a,staticClass:"list-group-item ",on:{click:function(e){t.showModal(s.symbol)}}},[t._v(t._s(s.symbol))])}))])]),t._v(" "),e("modal",{attrs:{scrollable:!0,name:"stock-modal",height:"auto",adaptive:!0},on:{opened:function(s){t.modalShown=!0},closed:function(s){t.modalShown=!1}}},[e("stock-display",{attrs:{symbol:t.selectedSymbol}})],1)],1)},staticRenderFns:[]},y=e("VU/8")(f,k,!1,null,null,null).exports;a.a.use(n.a);var w=new n.a({routes:[{path:"/",name:"Home",component:y}]}),C=e("8+8L"),x=(e("K3J8"),e("qb6w"),e("rifk")),S=e.n(x),D=e("ajw3"),T=e("M4fF"),q=e.n(T),A=e("NETs"),Q=e.n(A),$=e("IPdH"),O=e.n($);a.a.use(O.a,{name:"timeago",locale:"en-US",locales:{"en-US":e("QDRa")}}),a.a.use(Q.a,q.a),a.a.use(D.a),a.a.use(S.a),a.a.config.productionTip=!1,a.a.use(C.a),new a.a({el:"#app",router:w,components:{App:o},template:"<App/>"})},QDRa:function(t,s){t.exports=["just now",["%s second ago","%s seconds ago"],["%s minute ago","%s minutes ago"],["%s hour ago","%s hours ago"],["%s day ago","%s days ago"],["%s week ago","%s weeks ago"],["%s month ago","%s months ago"],["%s year ago","%s years ago"]]},qKSJ:function(t,s){},qb6w:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.20f9b219be7b26f82086.js.map