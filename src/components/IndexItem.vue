<template>
<div>
    <h3 :class="contextualClasses">{{item.current.symbol}} {{item.current.lastSalePrice}} <small>({{changePercentage.toFixed(2)}}%)</small></h3>  
</div>
</template>

<script>
export default{
    props:{
        item:{
            type: Object,
            required: true
        },
    },
    computed:{
        contextualClasses: function(){
            var toReturn = {
                'font-oswald-light' : true,
            }
            
            if(this.item.current.lastSalePrice >= this.item.last.lastSalePrice){
                toReturn['text-success'] = true;
            }
            else{
                toReturn['text-danger'] = true;
            }

            return toReturn;
        },
        changePercentage:function()
        {
            var difference = this.item.current.lastSalePrice - this.item.last.lastSalePrice;
            return (difference / this.item.last.lastSalePrice) * 100;
        }
        
    }
}
</script>