<template>
  <div id="app">
    <div class="container-fluid">
      <router-view/>
    </div>
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

.v--modal-overlay{
  background: rgba(0, 0, 0, 0.7);
}
.nav-link.active,
.nav-link.active:hover
{
  color:#23272A !important;
}
.vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}

.card-dark{
    background-color: #23272A !important;
}

.v--modal{
    background-color:transparent!important;
}
</style>
