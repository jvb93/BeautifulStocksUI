<template>
<div>
    <h1 class="font-oswald-light">{{item.latestPrice}}</h1>
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