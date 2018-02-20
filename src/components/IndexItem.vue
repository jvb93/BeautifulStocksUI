<template>
<div>
    <h3 :class="contextualClasses">{{symbol}} {{current}} <small>({{changePercentage.toFixed(2)}}%)</small></h3>  
</div>
</template>

<script>
export default{
    props:{
        current:{
            type: Number,
            required: true
        },
        open:{
            type:Number,
            required:true
        },
        symbol:{
            type:String,
            required:true
        }
    
    },
    computed:{
        contextualClasses: function(){
            var toReturn = {
                'font-oswald-light' : true,
            }
            
            if(this.current >= this.open){
                toReturn['text-success'] = true;
            }
            else{
                toReturn['text-danger'] = true;
            }

            return toReturn;
        },
        changePercentage:function()
        {
            if(!this.open)
            {
                return 0;
            }
            var difference = this.current - this.open;
            return (difference / this.open) * 100;
        }
        
    }
}
</script>