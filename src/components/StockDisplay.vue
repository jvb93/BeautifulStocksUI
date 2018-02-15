<template>
    <div class="card" style="background-color: #2C2F33; height:100%;">
         <div class="card-body">
            <h1 class="card-title text-center">{{symbol.symbol}}</h1>
            <h6 class="card-subtitle mb-2 text-muted text-center">{{symbol.title}}</h6>
            <h4 class="card-text text-center">${{stockData.quote.latestPrice}}</h4>
            <highcharts :options="chartOptions"></highcharts>
            <hr/>
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
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(news, index) in stockData.news" :key="index">{{news.headline}}</li>
            </ul>
                        
        </div>
    </div>
</template>

<script>
var NumAbbr = require('number-abbreviate')
export default{
    props:{
        symbol:{
            type: Object,
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
        getTimeSeries: function () {
            this.$http.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+this.symbol.symbol+"&interval=1min&apikey=" + localStorage.getItem("alphaVantageApiKey"))
                .then(response => {
                    this.timeSeries = response.data["Time Series (1min)"]      
                     
                })      
        },
        getStockData:function(){
            this.$http.get("https://api.iextrading.com/1.0/stock/"+this.symbol.symbol+"/batch?types=quote,news,chart&range=1d&last=10")
                .then(response => {
                    this.stockData = response.data;      
                     
                })      
        },
        getCloseAtKey: function (timeSeries, key) {
            if (typeof timeSeries[Object.keys(timeSeries)[key]] === 'undefined' || typeof timeSeries[Object.keys(timeSeries)[key]]["4. close"] === 'undefined') {
                return 0;
            }
            return parseFloat(timeSeries[Object.keys(timeSeries)[key]]["4. close"]);
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