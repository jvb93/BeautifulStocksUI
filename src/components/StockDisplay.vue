<template>
    <div class="card" style="background-color: #2C2F33; height:100%;">
        
      
         <div class="card-body">
            <button type="button" @click="$modal.hide('stock-modal')" class="close float-right" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h1 class="card-title text-center">{{symbol.toUpperCase()}}</h1>
            <h6 class="card-subtitle mb-2 text-muted text-center">{{stockData.quote.companyName}}</h6>
            <h4 class="card-text text-center">${{stockData.quote.latestPrice}} <small :class="{'text-success' : stockData.quote.changePercent >=0, 'text-danger' : stockData.quote.changePercent < 0 }" >({{(stockData.quote.changePercent*100).toFixed(2)}}%)</small> </h4>
            <hr/>
            <highcharts :options="chartOptions"></highcharts>
            <hr/>
            <div class="row">
                <div class="col">
                    <h4>Facts</h4>
                    <div class="row">
                        <div class="col">
                            <h5>Vol</h5>
                            <p>{{intToString(stockData.quote.latestVolume)}}</p>
                        </div>
                        <div class="col">
                            <h5>Avg. Vol</h5>
                            <p>{{intToString(stockData.quote.avgTotalVolume)}}</p>
                        </div>
                        <div class="col">
                            <h5>P/E</h5>
                            <p>{{stockData.quote.peRatio}}</p>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="col">
                            <h5>52wk. Hi</h5>
                            <p>{{stockData.quote.week52High}}</p>
                        </div>
                        <div class="col">
                            <h5>52wk. Lo</h5>
                            <p>{{stockData.quote.week52Low}}</p>
                        </div>
                        <div class="col">
                            <h5>Mkt. Cap</h5>
                            <p>{{intToString(stockData.quote.marketCap)}}</p>
                        </div>
                    </div>
                   
                        
                </div>
            </div>
            <hr/>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active text-light" id="news-tab" data-toggle="tab" href="#news" role="tab" aria-controls="news" aria-selected="true">News</a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link text-light" id="company-info-tab" data-toggle="tab" href="#company-info" role="tab" aria-controls="company-info" aria-selected="false">Company Info</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" id="options-tab" data-toggle="tab" href="#options" role="tab" aria-controls="options" aria-selected="false">Options</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" id="stock-twits-tab" data-toggle="tab" href="#stock-twits" role="tab" aria-controls="stock-twits" aria-selected="false">StockTwits</a>
                </li>
               
               
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="news" role="tabpanel" aria-labelledby="news-tab">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(news, index) in stockData.news" :key="index"><small class="text-muted">[<timeago :since="news.datetime"></timeago>]</small> <a class="text-light" :href="news.url" target="_blank">{{news.headline}}</a></li>
                    </ul>
                </div>
                <div class="tab-pane fade" id="options" role="tabpanel" aria-labelledby="options-tab" >
                    <div class="table-responsive">
                        <table class="table table-dark table-striped table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>Expiration</th>
                                    <th>Strike</th>
                                    <th>Type</th>
                                    <th>Bid</th>
                                    <th>Ask</th>
                                    <th>Open Interest</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="(option, index) in _.orderBy(options, ['open_interest'], ['desc'])" :key="index">
                                    <td>{{option.expiration_date}}</td>
                                    <td>${{option.strike.toFixed(2)}}</td>
                                    <td>{{option.option_type}}</td>
                                    <td>${{option.bid.toFixed(2)}}</td>
                                    <td>${{option.ask.toFixed(2)}}</td>
                                    <td>{{option.open_interest}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>                  
                </div>
                <div class="tab-pane fade" id="stock-twits" role="tabpanel" aria-labelledby="stock-twits-tab">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(message, index) in stockTwits" :key="index"> <b>{{message.user.username}} </b><small class="text-muted">[<timeago :since="message.created_at"></timeago>]</small> <br/> {{message.body}}</li>
                    </ul>
                </div>
                 <div class="tab-pane fade" id="company-info" role="tabpanel" aria-labelledby="company-info-tab">
                    <h2>{{companyInfo.companyName}}</h2>
                    <p>{{companyInfo.description}}</p>
                </div>
            
            </div>
            
            
                        
        </div>
    </div>
</template>

<script>
var NumAbbr = require('number-abbreviate')
export default{
    props:{
        symbol:{
            type: String,
            required: true
        }
    },
    data: function(){    
        return {
            timeSeries:{},
            stockData:{
                quote:{},
                chart:{}
            },
            companyInfo:{},
            options:[],
            stockTwits:[]
            
        }
    },
    methods:{
        getStockData:function(){
            this.$http.get("/iex/stock/"+this.symbol+"/batch?types=quote,news,chart&range=1d&last=10")
                .then(response => {
                    this.stockData = response.data;      
                     
                })      
        },
        getCompanyInfo:function(){
            this.$http.get("/iex/stock/"+this.symbol+"/company")
                .then(response => {
                    this.companyInfo = response.data;      
                     
                })      
        },
         getOptions:function(){        
            this.$http.get("/tradier/markets/options/chains?symbol="+this.symbol+"&expiration=" + this.getNextDayOfWeek(new Date(), 5))
                .then(response => {
                    if(response.data.options)
                    {
                        this.options = response.data.options.option;
                    }
                     
                })      
        },
        getStockTwits:function(){        
           this.$http.jsonp('https://api.stocktwits.com/api/2/streams/symbol/'+this.symbol+'.json').then(response => {
                this.stockTwits = response.body.messages;
                }, response => {
            })
        },
        intToString:function(value) {
            var numAbbr = new NumAbbr()
            return numAbbr.abbreviate(value, 2);
        },
        getNextDayOfWeek: function(date, dayOfWeek) {
            
            var resultDate = new Date(date.getTime());
            resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
            return resultDate;
        }
    },
    computed:{
        chartData:function(){
           
            var toReturn =[]
            var stockDataChartRef = this.stockData.chart;
            for(var x = 0; x < stockDataChartRef.length; x++)
            {
                if(stockDataChartRef[x].marketAverage)
                {
                    toReturn.push([stockDataChartRef[x].label, stockDataChartRef[x].marketAverage])
                }
            }
            return toReturn;
        },
        chartOptions: function(){
            return {
                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },

                yAxis: {
                    title: {
                        text: ''
                    }
                },
                xAxis: {
                    visible:false
                },
                chart:{
                    backgroundColor:'transparent'
                    
                },
                colors:["#7289DA", "FFF", "#99AAB5"],
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                     
                    }
                },
                legend:{
                    enabled:false
                },
                series: [{
                    name: 'Price',
                    data:  this.chartData
                },],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            }
        }
    },
    mounted(){
        this.getStockData();
        this.getOptions();
        this.getStockTwits();
        this.getCompanyInfo();
    }
}
</script>