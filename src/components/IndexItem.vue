<template>
<div>
    <h1  :class="{'display-3' : true, 'font-oswald-light' : true, 'text-danger': item.change_percentage < 0, 'text-success' : item.change_percentage >=0 }">{{item.last}} <small>({{item.change_percentage.toFixed(2)}}%)</small></h1>
    <p>{{item.symbol}}</p>
</div>
</template>

<script>
export default{
    props:{
        item:{
            type: Object,
            required: true
        }
    }
}
</script>