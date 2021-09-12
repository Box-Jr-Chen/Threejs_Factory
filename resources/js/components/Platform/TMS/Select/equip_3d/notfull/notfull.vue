<template>
    <div class="notfull">
            <p>請保持全螢幕或視窗最大化</p>
    </div>
</template>
<style>
.notfull{
    width: 100%;
    height: 100%;
    background: rgb(136, 136, 136);
    position: relative;
    z-index: 9999;
}
.notfull  p{
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color:white;
  font-size: 2rem;
}
</style>
