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
  background-color: #23272A;
  color: white;
  font-family: 'Roboto', sans-serif;

}
.font-oswald{ 
    font-family: 'Oswald', sans-serif;
}

.font-oswald-light{ 
    font-family: 'Oswald', sans-serif;
    font-weight: 200;
}

.font-roboto{
    font-family: 'Roboto', sans-serif;
}
.list-group-item{
  background-color: transparent;
}

</style>
