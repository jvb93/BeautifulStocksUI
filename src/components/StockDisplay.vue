<template>
    <div class="card" style="background-color: #2C2F33; height:100%;">
         <div class="card-body">
            <h1 class="card-title text-center">{{symbol.toUpperCase()}}</h1>
            <h6 class="card-subtitle mb-2 text-muted text-center">{{stockData.quote.companyName}}</h6>
            <h4 class="card-text text-center">${{stockData.quote.latestPrice}}</h4>
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
            <h4>News</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(news, index) in stockData.news" :key="index"><small class="text-muted">[<timeago :since="news.datetime"></timeago>]</small> <a class="text-light" :href="news.url" target="_blank">{{news.headline}}</a></li>
            </ul>
            
                        
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
            stockData:{},
            
        }
    },
    methods:{
        getStockData:function(){
            this.$http.get("https://api.iextrading.com/1.0/stock/"+this.symbol+"/batch?types=quote,news,chart&range=1d&last=10")
                .then(response => {
                    this.stockData = response.data;      
                     
                })      
        },
        intToString:function(value) {
            var numAbbr = new NumAbbr()
            return numAbbr.abbreviate(value, 2);
        }
    },
    computed:{
        chartData:function(){
           
            var toReturn =[]
            var stockDataChartRef = this.stockData.chart;
            for(var x = 0; x < stockDataChartRef.length; x++)
            {
                toReturn.push([stockDataChartRef[x].label, stockDataChartRef[x].marketAverage])
            }
            console.log(toReturn);
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
    }
}
</script>