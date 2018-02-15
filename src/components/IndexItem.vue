<template>
<div>
    <h1 class="font-oswald-light">{{current}}</h1>
    <p>{{symbol}}</p>
</div>
</template>

<script>
export default{
    props:{
        current:{
            type: Number,
            required: true
        },
        last:{
            type: Number,
            required: true
        },
        symbol:{
            type: String,
            required: true
        }
    }
}
</script>