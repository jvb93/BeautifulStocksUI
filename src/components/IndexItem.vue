<template>
<div>
    <h1 :class="contextualClasses">{{item.last}} <small>({{changePercentage.toFixed(2)}}%)</small></h1>
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
    },
    computed:{
        contextualClasses: function(){
            var toReturn = {
                'display-3' : true,
                'font-oswald-light' : true,
            }

            if(this.item.hasOwnProperty('change_percentage'))
            {
                if(this.item.change_percentage < 0)
                {
                    toReturn['text-success'] = true;
                }
                else{
                    toReturn['text-danger'] = true;
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