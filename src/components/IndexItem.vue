<template>
<div>
    <h3 :class="contextualClasses">{{item.symbol}} {{item.last}} <small>({{changePercentage.toFixed(2)}}%)</small></h3>
    
</div>
</template>

<script>
export default{
    props:{
        item:{
            type: Object,
            required: true
        }
    },
    computed:{
        contextualClasses: function(){
            var toReturn = {
                'font-oswald-light' : true,
            }

            if(this.item.hasOwnProperty('change_percentage'))
            {
                if(this.item.change_percentage < 0)
                {
                    toReturn['text-danger'] = true;
                }
                else{
                    toReturn['text-success'] = true;
                }
            }

            return toReturn;
        },
        changePercentage:function(){
            if(!this.item.hasOwnProperty('change_percentage'))
            {
                return 0;
            }

            return this.item.change_percentage;

        }
    }
}
</script>