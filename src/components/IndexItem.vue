<template>
<div>
    <h3 :class="contextualClasses">{{symbol.symbol}} {{symbol.latestPrice}} <small>({{(symbol.changePercent *100 ).toFixed(2)}}%)</small></h3>  
</div>
</template>

<script>
export default{
    props:{
        symbol:{
            type:Object,
            required:true
        }
    
    },
    computed:{
        contextualClasses: function(){
            var toReturn = {
                'font-oswald-light' : true,
            }
            
            if(this.symbol.changePercent >= 0){
                toReturn['text-success'] = true;
            }
            else{
                toReturn['text-danger'] = true;
            }

            return toReturn;
        }
        
    }
}
</script>