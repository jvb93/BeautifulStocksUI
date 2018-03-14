<template>
    <div class="card" style="background-color: #2C2F33; height:100%;">
        
      
         <div class="card-body">
            <button type="button" @click="$modal.hide('stock-modal')" class="close float-right" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h1 class="card-title text-center">{{symbol.toUpperCase()}}</h1>
            <h6 class="card-subtitle mb-2 text-muted text-center">{{stockData.quote.companyName}}</h6>
            <h4 class="card-text text-center font-oswald-light">{{formatMoney(stockData.quote.latestPrice,2)}} <small :class="{'text-success' : stockData.quote.changePercent >=0, 'text-danger' : stockData.quote.changePercent < 0 }" > <br/>{{formatMoney(stockData.quote.change,2)}} ({{(stockData.quote.changePercent*100).toFixed(2)}}%)</small> </h4>
            <hr/>
            <div class="row">
                <div class="col text-center">
                    <highcharts :options="chartOptions"></highcharts>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" @click="getChart('1d')">1D</button>
                        <button type="button" class="btn btn-secondary" @click="getChart('1m')">1M</button>
                        <button type="button" class="btn btn-secondary" @click="getChart('3m')">3M</button>
                        <button type="button" class="btn btn-secondary" @click="getChart('1y')">1Y</button>
                        <button type="button" class="btn btn-secondary" @click="getChart('5y')">5Y</button>                     
                    </div>
                </div>
            </div>

            <hr/>
            <div class="row">
                <div class="col">
                    <h4>Facts</h4>
                    <div class="row">
                        <div class="col">
                            <h5>Vol</h5>
                            <p class="font-oswald-light">{{abbreviateNumber(stockData.quote.latestVolume,2)}}</p>
                        </div>
                        <div class="col">
                            <h5>Avg. Vol</h5>
                            <p class="font-oswald-light">{{abbreviateNumber(stockData.quote.avgTotalVolume,2)}}</p>
                        </div>
                        <div class="col">
                            <h5>P/E</h5>
                            <p class="font-oswald-light">{{stockData.quote.peRatio}}</p>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="col">
                            <h5>52wk. Hi</h5>
                            <p class="font-oswald-light">{{formatMoney(stockData.quote.week52High,2)}}</p>
                        </div>
                        <div class="col">
                            <h5>52wk. Lo</h5>
                            <p class="font-oswald-light">{{formatMoney(stockData.quote.week52Low,2)}}</p>
                        </div>
                        <div class="col">
                            <h5>Mkt. Cap</h5>
                            <p class="font-oswald-light">${{abbreviateNumber(stockData.quote.marketCap,2)}}</p>
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
                    <div class="card card-dark">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-for="(news, index) in stockData.news" :key="index"><small class="text-muted">[<timeago :since="news.datetime"></timeago>]</small> <a class="text-light" :href="news.url" target="_blank">{{news.headline}}</a></li>
                        </ul>
                    </div>
                </div>
                <div class="tab-pane fade" id="options" role="tabpanel" aria-labelledby="options-tab" >
                    <div class="card card-dark">
                        <div class="card-header">Options Chain</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div>
                                        <div class="form-row">
                                            <div class="form-group col">
                                                <label>Expiration Start</label>
                                                <input type="date" :min="today" :max="maxStartDate" class="form-control" v-model="expirationStartDate"/>
                                            </div>
                                            <div class="form-group col">
                                                <label>Expiration End</label>
                                                <input type="date" :min="minEndDate" class="form-control" v-model="expirationEndDate"/>
                                            </div>
                                          
                                        </div>  
                                       
                                        <div class="form-row">
                                            <div class="form-group col">
                                                <button class="btn btn-primary form-control" @click="getOptions()">Get Options</button>
                                            </div>
                                        </div>                               
                                    </div>
                                </div>
                                <div class="col text-center" v-if="options && options.length">
                                    <highcharts :options="optionsChartOptions"></highcharts>
                                    <label>Strike Range</label>
                                    <vue-slider ref="slider" :lazy="true" :interval="1" :min="strikeMin" :max="strikeMax" v-model="strikeRange"></vue-slider>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                     <div class="table-responsive">
                                        <v-client-table :data="optionsFilteredByStrikeRange" :columns="optionsColumns" :options="optionsTableOptions"></v-client-table>
                                    </div>    
                                </div>
                            </div>
                           
                        </div>
                    </div> 
                                  
                </div>
                <div class="tab-pane fade" id="stock-twits" role="tabpanel" aria-labelledby="stock-twits-tab">
                    <div class="card card-dark">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-for="(message, index) in stockTwits" :key="index"> <b>{{message.user.username}} </b><small class="text-muted">[<timeago :since="message.created_at"></timeago>]</small> <br/> {{message.body}}</li>
                        </ul>
                    </div>        
                </div>
                 <div class="tab-pane fade" id="company-info" role="tabpanel" aria-labelledby="company-info-tab">
                     <div class="card card-dark">
                        <div class="card-header">{{companyInfo.companyName}}</div>
                        <div class="card-body">
                            <h3>Bio</h3>
                            <p>{{companyInfo.description}}</p>
                            <h3>Website</h3>
                            <a :href="companyInfo.website" target="_blank">{{companyInfo.website}}</a>
                            <h3>Industry</h3>
                            <p>{{companyInfo.industry}}</p>
                            <h3>CEO</h3>
                            <p>{{companyInfo.CEO}}</p>
                        </div>
                        
                     </div>
                   
                </div>
            
            </div>
            
            
                        
        </div>
    </div>
</template>

<script>
var NumAbbr = require('number-abbreviate')
var accounting = require('accounting-js')
import VueSlider from 'vue-slider-component'
import Vue from 'vue'
export default{
    props:{
        symbol:{
            type: String,
            required: true
        }
    },
    components:{
        VueSlider
    },
    data: function(){    
        return {
            timeSeries:{},
            stockData:{
                quote:{},
                
            },
            
            chart:{},
            companyInfo:{},
            options:[],
            optionsColumns:['expiration_date', 'strike', 'option_type','open_interest', 'bid', 'ask'],
            stockTwits:[],
            expirationStartDate:"",
            expirationEndDate:"",
          
            strikeRange:[],
            optionsTableOptions:{
                orderBy:{
                   column: 'open_interest',
                   ascending: false
                },
                skin:"table table-dark table-striped table-bordered table-sm",
                templates: {
                    strike: function (h, row, index) {
                        if(row.strike)
                        {
                            return accounting.formatMoney(row.strike);
                        }

                        return '-'
                       
                    },
                    bid: function (h, row, index) {
                        if(row.bid)
                        {
                            return accounting.formatMoney(row.bid);
                        }

                        return '-'
                       
                    },
                    ask: function (h, row, index) {
                        if(row.ask)
                        {
                            return accounting.formatMoney(row.ask);
                        }

                        return '-'
                       
                    },
                    open_interest: function (h, row, index) {
                        if(row.open_interest)
                        {
                            return accounting.formatNumber(row.open_interest, {
                                precision : 0        
                            });
                        }

                        return '-'
                       
                    }

                }
            }
            
        }
    },
    methods:{
        getStockData:function(){
            this.$http.get("https://api.iextrading.com/1.0/stock/"+this.symbol+"/batch?types=quote,news&range=1d&last=10")
                .then(response => {
                    this.stockData = response.data;      
                     
                })      
        },
        getCompanyInfo:function(){
            this.$http.get("https://api.iextrading.com/1.0/stock/"+this.symbol+"/company")
                .then(response => {
                    this.companyInfo = response.data;      
                     
                })      
        },
        getChart:function(period)
        {
            this.$http.get("https://api.iextrading.com/1.0/stock/"+this.symbol+"/batch?types=chart&range=" + period)
                .then(response => {
                    this.chart = response.data.chart;      
                     
                })      
        },
        abbreviateNumber: function(value, decimals)
        {
            var numAbbr = new NumAbbr()
            return numAbbr.abbreviate(value, decimals)
        },
        getOptions:function(){
            var dates = this.allFridaysBetweenDates;      
            this.options = [];
            for(var x = 0; x < dates.length; x++)
            {
                this.$http.get("/tradier/markets/options/chains?symbol="+this.symbol+"&expiration=" + dates[x])
                    .then(response => {
                        if(response.data.options)
                        {
                            this.options = this.options.concat(response.data.options.option);
                           
                         
                            var vm = this;
                            Vue.nextTick()
                            .then(function () {
                                var min = vm.strikeMin;
                                var max = vm.strikeMax;
                                if(min && max)
                                {
                                    vm.strikeRange.push(min);
                                    vm.strikeRange.push(max);
                                    vm.$forceUpdate();
                                    vm.$refs.slider.refresh();
                                    
                                }
                            })
                        }
                            
                    });      
            }
           
           
          
            
        },
        formatNumber: function(value, decimals)
        {
            return accounting.formatNumber(value, { precision : decimals  });
        },
        formatMoney: function(value, decimals)
        {
            return accounting.formatMoney(value, { precision : decimals  });
        },
        getStockTwits:function(){        
           this.$http.jsonp('https://api.stocktwits.com/api/2/streams/symbol/'+this.symbol+'.json').then(response => {
                this.stockTwits = response.body.messages;
                }, response => {
            })
        },
       
        getNextDayOfWeek: function(date, dayOfWeek) {
            
            var resultDate = new Date(date.getTime());
            resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
            return this.$moment(resultDate).format("YYYY-MM-DD");
        },
       
    },
    computed:{
        strikeMin: function(){
            if(this.options && this.options.length)
            {
                var minStrike =  this._.minBy(this.options, function(option){
                    return option.strike;
                });
                if(minStrike && minStrike.strike)
                {
                    return minStrike.strike;
                }
            }
            return 0;
        },
        strikeMax: function(){
            if(this.options && this.options.length)
            {
                var maxStrike =  this._.maxBy(this.options, function(option){
                    return option.strike;
                });

                if(maxStrike && maxStrike.strike)
                {
                    return maxStrike.strike;
                }
            }
            return 0;
        },
        chartData:function(){        
            var toReturn =[]
            var stockDataChartRef = this.chart;
            for(var x = 0; x < stockDataChartRef.length; x++)
            {
                if(stockDataChartRef[x].marketAverage)
                {
                    toReturn.push([stockDataChartRef[x].label, stockDataChartRef[x].marketAverage])
                }
                else if(stockDataChartRef[x].close)
                {
                    toReturn.push([stockDataChartRef[x].label, stockDataChartRef[x].close])
                }
            }
            return toReturn;
        },
        callCount:function(){
            if(!this.optionsFilteredByStrikeRange || !this.optionsFilteredByStrikeRange.length)
            {
                return 0
            }
            return this._.sumBy(this.optionsFilteredByStrikeRange, i => (i.option_type.toLowerCase() === 'call' ? i.open_interest : 0));
        },
        today: function()
        {
            return this.$moment().format("YYYY-MM-DD");
        },
        maxStartDate: function()
        {
            return this.$moment(this.expirationEndDate).format("YYYY-MM-DD");
        },
        minEndDate: function()
        {
            return this.$moment(this.expirationStartDate).format("YYYY-MM-DD");
        },
        putCount:function(){
            if(!this.optionsFilteredByStrikeRange || !this.optionsFilteredByStrikeRange.length)
            {
                return 0
            }
            return this._.sumBy(this.optionsFilteredByStrikeRange, i => (i.option_type.toLowerCase() === 'put' ? i.open_interest : 0));
        },    
        callPercentage:function(){
            var calls = this.callCount;
            var total = calls + this.putCount;

            if(total > 0 )
            {
                return (calls/total) * 100
            }

            return 0;
        },
        putPercentage:function(){
            var puts = this.putCount;
            var total = puts + this.callCount;

            if(total > 0 )
            {
                return (puts/total) * 100
            }

            return 0;
        },
        allFridaysBetweenDates:function()
        {
            var start = this.$moment(this.expirationStartDate),
            end   = this.$moment(this.expirationEndDate), 
            day   = 5;  

            var result = [];
            var current = start.clone();

            if(current.day() == day)
            {
                result.push(current.clone().format("YYYY-MM-DD"));
            }
            while (current.day(7 + day).isBefore(end)) {
                result.push(current.clone().format("YYYY-MM-DD"));
            }

            if(end.day() == day && !end.isSame(start)) {
                result.push(end.clone().format("YYYY-MM-DD"));
            }

            return result;
        },
        optionsFilteredByStrikeRange: function(){
            if(this.strikeRange.length)
            {
                var min = this.strikeRange[0];
                var max = this.strikeRange[1];
                return this._.filter(this.options, function(option){
                    return option.strike >= min && option.strike <= max;
                })
            }
            return this.options;
        },
        chartOptions: function(){
            var formatMoneyRef = this.formatMoney;
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
                        backgroundColor:'transparent',
                        style:{
                            'font-family': "'Oswald', sans-serif"
                        }
                        
                    },
                    colors:["#7289DA", "FFF", "#99AAB5"],
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        
                        }
                    },
                    tooltip:{
                        
                        formatter: function () {
                            return '<b>' + formatMoneyRef(this.y,2)+ '</b> <br/><small>' + this.key +'</small>';
                            
                        },
                        style:{
                            fontSize :'20px'
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
            },
        optionsChartOptions: function(){
            var formatMoneyRef = this.formatMoney;
            return {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    backgroundColor:'transparent',
                    style:{
                        'font-family': "sans-serif"
                    },
                    height: 228
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                colors:["#28a745", "#dc3545", "#99AAB5"],
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        borderWidth: 0, 
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                fontSize:"14px"
                            },
                            color: "white"
                        }
                    }
                },
                series: [{
                    name: 'Open Interest',
                    colorByPoint: true,
                    data: [{
                            name: 'Calls',
                            y: this.callCount
                        }, {
                            name: 'Puts',
                            y: this.putCount
                        }]
                    }]
            }
        }
    },
    mounted(){
        this.expirationStartDate = this.getNextDayOfWeek(new Date(), 5);
        this.expirationEndDate = this.expirationStartDate;
        this.getStockData();
        this.getChart('1d');
        this.getOptions();
        this.getStockTwits();
        this.getCompanyInfo();
       
    },
    updated() {
        var vm = this;
        this.$nextTick(function () {
          vm.$refs.slider.refresh()
        })
    }
}
</script>