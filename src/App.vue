<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald:200,400|Roboto:100,300');
html, body{
  background-color: #23272A !important;
  color: white !important;
  font-family: 'Roboto', sans-serif !important;

}
.font-oswald{ 
    font-family: 'Oswald', sans-serif !important;
}

.font-oswald-light{ 
    font-family: 'Oswald', sans-serif !important;
    font-weight: 200 !important;
}

.font-roboto{
    font-family: 'Roboto', sans-serif !important;
}
.list-group-item{
  background-color: transparent !important;
}

</style>
