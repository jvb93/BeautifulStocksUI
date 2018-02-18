webpackJsonp([1],{0:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"container-fluid"},[e("router-view")],1)])},staticRenderFns:[]};var i=s("VU/8")({name:"App"},o,!1,function(t){s("fxVt")},null,null).exports,n=s("/ocq"),l=s("Xxa5"),r=s.n(l),c=s("exGp"),u=s.n(c),d=s("//Fk"),v=s.n(d),h={props:{item:{type:Object,required:!0}},computed:{contextualClasses:function(){var t={"display-3":!0,"font-oswald-light":!0};return this.item.hasOwnProperty("change_percentage")&&(this.item.change_percentage<0?t["text-danger"]=!0:t["text-success"]=!0),t},changePercentage:function(){return this.item.hasOwnProperty("change_percentage")?this.item.change_percentage:0}}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h1",{class:t.contextualClasses},[t._v(t._s(t.item.last)+" "),s("small",[t._v("("+t._s(t.changePercentage.toFixed(2))+"%)")])]),t._v(" "),s("p",[t._v(t._s(t.item.symbol))])])},staticRenderFns:[]},_=s("VU/8")(h,p,!1,null,null,null).exports,m=s("eODd"),g={props:{symbol:{type:String,required:!0}},data:function(){return{timeSeries:{},stockData:{quote:{},chart:{}},companyInfo:{},options:[],stockTwits:[]}},methods:{getStockData:function(){var t=this;this.$http.get("/iex/stock/"+this.symbol+"/batch?types=quote,news,chart&range=1d&last=10").then(function(e){t.stockData=e.data})},getCompanyInfo:function(){var t=this;this.$http.get("/iex/stock/"+this.symbol+"/company").then(function(e){t.companyInfo=e.data})},getOptions:function(){var t=this;this.$http.get("/tradier/markets/options/chains?symbol="+this.symbol+"&expiration="+this.getNextDayOfWeek(new Date,5)).then(function(e){e.data.options&&(t.options=e.data.options.option)})},getStockTwits:function(){var t=this;this.$http.jsonp("https://api.stocktwits.com/api/2/streams/symbol/"+this.symbol+".json").then(function(e){t.stockTwits=e.body.messages},function(t){})},intToString:function(t){return(new m).abbreviate(t,2)},getNextDayOfWeek:function(t,e){var s=new Date(t.getTime());return s.setDate(t.getDate()+(7+e-t.getDay())%7),s}},computed:{chartData:function(){for(var t=[],e=this.stockData.chart,s=0;s<e.length;s++)e[s].marketAverage&&t.push([e[s].label,e[s].marketAverage]);return t},chartOptions:function(){return{title:{text:""},subtitle:{text:""},yAxis:{title:{text:""}},xAxis:{visible:!1},chart:{backgroundColor:"transparent"},colors:["#7289DA","FFF","#99AAB5"],plotOptions:{series:{label:{connectorAllowed:!1}}},legend:{enabled:!1},series:[{name:"Price",data:this.chartData}],responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]}}}},mounted:function(){this.getStockData(),this.getOptions(),this.getStockTwits(),this.getCompanyInfo()}},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card",staticStyle:{"background-color":"#2C2F33",height:"100%"}},[s("div",{staticClass:"card-body"},[s("button",{staticClass:"close float-right",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){t.$modal.hide("stock-modal")}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._v(" "),s("h1",{staticClass:"card-title text-center"},[t._v(t._s(t.symbol.toUpperCase()))]),t._v(" "),s("h6",{staticClass:"card-subtitle mb-2 text-muted text-center"},[t._v(t._s(t.stockData.quote.companyName))]),t._v(" "),s("h4",{staticClass:"card-text text-center"},[t._v("$"+t._s(t.stockData.quote.latestPrice)+" "),s("small",{class:{"text-success":t.stockData.quote.changePercent>=0,"text-danger":t.stockData.quote.changePercent<0}},[t._v("("+t._s((100*t.stockData.quote.changePercent).toFixed(2))+"%)")])]),t._v(" "),s("hr"),t._v(" "),s("highcharts",{attrs:{options:t.chartOptions}}),t._v(" "),s("hr"),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("h4",[t._v("Facts")]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("h5",[t._v("Vol")]),t._v(" "),s("p",[t._v(t._s(t.intToString(t.stockData.quote.latestVolume)))])]),t._v(" "),s("div",{staticClass:"col"},[s("h5",[t._v("Avg. Vol")]),t._v(" "),s("p",[t._v(t._s(t.intToString(t.stockData.quote.avgTotalVolume)))])]),t._v(" "),s("div",{staticClass:"col"},[s("h5",[t._v("P/E")]),t._v(" "),s("p",[t._v(t._s(t.stockData.quote.peRatio))])])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("h5",[t._v("52wk. Hi")]),t._v(" "),s("p",[t._v(t._s(t.stockData.quote.week52High))])]),t._v(" "),s("div",{staticClass:"col"},[s("h5",[t._v("52wk. Lo")]),t._v(" "),s("p",[t._v(t._s(t.stockData.quote.week52Low))])]),t._v(" "),s("div",{staticClass:"col"},[s("h5",[t._v("Mkt. Cap")]),t._v(" "),s("p",[t._v(t._s(t.intToString(t.stockData.quote.marketCap)))])])])])]),t._v(" "),s("hr"),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"tab-content",attrs:{id:"myTabContent"}},[s("div",{staticClass:"tab-pane fade show active",attrs:{id:"news",role:"tabpanel","aria-labelledby":"news-tab"}},[s("ul",{staticClass:"list-group list-group-flush"},t._l(t.stockData.news,function(e,a){return s("li",{key:a,staticClass:"list-group-item"},[s("small",{staticClass:"text-muted"},[t._v("["),s("timeago",{attrs:{since:e.datetime}}),t._v("]")],1),t._v(" "),s("a",{staticClass:"text-light",attrs:{href:e.url,target:"_blank"}},[t._v(t._s(e.headline))])])}))]),t._v(" "),s("div",{staticClass:"tab-pane fade",attrs:{id:"options",role:"tabpanel","aria-labelledby":"options-tab"}},[s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table table-dark table-striped table-bordered table-sm"},[t._m(1),t._v(" "),s("tbody",t._l(t._.orderBy(t.options,["open_interest"],["desc"]),function(e,a){return s("tr",{key:a},[s("td",[t._v(t._s(e.expiration_date))]),t._v(" "),s("td",[t._v("$"+t._s(e.strike.toFixed(2)))]),t._v(" "),s("td",[t._v(t._s(e.option_type))]),t._v(" "),s("td",[t._v("$"+t._s(e.bid.toFixed(2)))]),t._v(" "),s("td",[t._v("$"+t._s(e.ask.toFixed(2)))]),t._v(" "),s("td",[t._v(t._s(e.open_interest))])])}))])])]),t._v(" "),s("div",{staticClass:"tab-pane fade",attrs:{id:"stock-twits",role:"tabpanel","aria-labelledby":"stock-twits-tab"}},[s("ul",{staticClass:"list-group list-group-flush"},t._l(t.stockTwits,function(e,a){return s("li",{key:a,staticClass:"list-group-item"},[s("b",[t._v(t._s(e.user.username)+" ")]),s("small",{staticClass:"text-muted"},[t._v("["),s("timeago",{attrs:{since:e.created_at}}),t._v("]")],1),t._v(" "),s("br"),t._v(" "+t._s(e.body))])}))]),t._v(" "),s("div",{staticClass:"tab-pane fade",attrs:{id:"company-info",role:"tabpanel","aria-labelledby":"company-info-tab"}},[s("h2",[t._v(t._s(t.companyInfo.companyName))]),t._v(" "),s("p",[t._v(t._s(t.companyInfo.description))])])])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"nav nav-tabs",attrs:{id:"myTab",role:"tablist"}},[e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link active text-light",attrs:{id:"news-tab","data-toggle":"tab",href:"#news",role:"tab","aria-controls":"news","aria-selected":"true"}},[this._v("News")])]),this._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link text-light",attrs:{id:"company-info-tab","data-toggle":"tab",href:"#company-info",role:"tab","aria-controls":"company-info","aria-selected":"false"}},[this._v("Company Info")])]),this._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link text-light",attrs:{id:"options-tab","data-toggle":"tab",href:"#options",role:"tab","aria-controls":"options","aria-selected":"false"}},[this._v("Options")])]),this._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link text-light",attrs:{id:"stock-twits-tab","data-toggle":"tab",href:"#stock-twits",role:"tab","aria-controls":"stock-twits","aria-selected":"false"}},[this._v("StockTwits")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("Expiration")]),t._v(" "),s("th",[t._v("Strike")]),t._v(" "),s("th",[t._v("Type")]),t._v(" "),s("th",[t._v("Bid")]),t._v(" "),s("th",[t._v("Ask")]),t._v(" "),s("th",[t._v("Open Interest")])])])}]},f=s("VU/8")(g,b,!1,null,null,null).exports,k=s("7t+N"),y=s.n(k),w={name:"Home",data:function(){return{trendingSymbols:[],SPY:{},QQQ:{},DIA:{},selectedSymbol:"",lookupModalShown:!1,quoteModalShown:!1}},components:{IndexItem:_,StockDisplay:f},methods:{showModal:function(t){this.$modal.hide("lookup-modal"),this.selectedSymbol=t,this.$modal.show("stock-modal")},getTrendingSymbols:function(){var t=this;this.$http.jsonp("https://api.stocktwits.com/api/2/trending/symbols.json").then(function(e){t.trendingSymbols=e.body.symbols},function(t){})},getQuote:function(t){var e=this;return new v.a(function(s){e.$http.get("/tradier/markets/quotes?symbols="+t).then(function(t){s(t.body.quotes.quote)})})},focusOnQuoteLookup:function(){y()("#quoteLookupInput").focus()},showLookupModal:function(){this.selectedSymbol="",this.lookupModalShown=!0,this.$modal.show("lookup-modal")}},mounted:function(){var t=u()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.getTrendingSymbols(),t.next=3,this.getQuote("SPY");case 3:return this.SPY=t.sent,t.next=6,this.getQuote("QQQ");case 6:return this.QQQ=t.sent,t.next=9,this.getQuote("DIA");case 9:this.DIA=t.sent;case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("index-item",{attrs:{item:t.SPY}})],1),t._v(" "),s("div",{staticClass:"col"},[s("index-item",{attrs:{item:t.QQQ}})],1),t._v(" "),s("div",{staticClass:"col"},[s("index-item",{attrs:{item:t.DIA}})],1)]),t._v(" "),s("hr"),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[t.lookupModalShown||t.quoteModalShown?t._e():s("div",{staticClass:"fixed-bottom w-25"},[s("button",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","q"],expression:"['ctrl', 'q']"}],staticClass:"btn btn-secondary",on:{shortkey:function(e){t.showLookupModal()},click:function(e){t.showLookupModal()}}},[t._v("lookup")])])]),t._v(" "),s("div",{staticClass:"col"}),t._v(" "),s("div",{staticClass:"col"},[s("h1",[t._v("Trending")]),t._v(" "),s("div",{directives:[{name:"bar",rawName:"v-bar"}],staticStyle:{height:"70vh"}},[s("div",[s("ul",{staticClass:"list-group list-group-flush"},t._l(t.trendingSymbols,function(e,a){return s("li",{key:a,staticClass:"list-group-item",staticStyle:{cursor:"pointer"},on:{click:function(s){t.showModal(e.symbol)}}},[t._v(t._s(e.symbol))])}))])])])]),t._v(" "),s("modal",{attrs:{scrollable:!0,name:"stock-modal",height:"auto",width:"100%"},on:{opened:function(e){t.quoteModalShown=!0},closed:function(e){t.quoteModalShown=!1}}},[s("stock-display",{attrs:{symbol:t.selectedSymbol}})],1),t._v(" "),s("modal",{attrs:{scrollable:!0,name:"lookup-modal",height:"auto",width:"50%"},on:{opened:t.focusOnQuoteLookup,closed:function(e){t.lookupModalShown=!1}}},[s("div",{staticClass:"card",staticStyle:{"background-color":"#2C2F33"}},[s("div",{staticClass:"card-body"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedSymbol,expression:"selectedSymbol"}],staticClass:"form-control form-control-lg m5",attrs:{id:"quoteLookupInput",placeholder:"Symbol"},domProps:{value:t.selectedSymbol},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.showModal(t.selectedSymbol)},input:function(e){e.target.composing||(t.selectedSymbol=e.target.value)}}})])])])],1)},staticRenderFns:[]},x=s("VU/8")(w,C,!1,null,null,null).exports;a.a.use(n.a);var S=new n.a({routes:[{path:"/",name:"Home",component:x}]}),D=s("8+8L"),q=(s("K3J8"),s("qb6w"),s("rifk")),Q=s.n(q),T=s("ajw3"),$=s("M4fF"),A=s.n($),I=s("NETs"),F=s.n(I),M=s("IPdH"),O=s.n(M),P=s("m0IH"),N=s.n(P),L=s("CoJ8"),V=s.n(L);a.a.use(V.a),a.a.use(N.a),a.a.use(O.a,{name:"timeago",locale:"en-US",locales:{"en-US":s("QDRa")}}),a.a.use(F.a,A.a),a.a.use(T.a),a.a.use(Q.a),a.a.config.productionTip=!1,a.a.use(D.a),new a.a({el:"#app",router:S,components:{App:i},template:"<App/>"})},QDRa:function(t,e){t.exports=["just now",["%s second ago","%s seconds ago"],["%s minute ago","%s minutes ago"],["%s hour ago","%s hours ago"],["%s day ago","%s days ago"],["%s week ago","%s weeks ago"],["%s month ago","%s months ago"],["%s year ago","%s years ago"]]},fxVt:function(t,e){},qb6w:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c43f35429de87f5fda94.js.map