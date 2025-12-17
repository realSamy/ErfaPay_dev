<script lang="ts" setup>
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<template>
  <Transition name="fade">
    <div
        v-if="loading"
        id="preloading"
        class="w-screen h-screen fixed bg-white z-1000 flex flex-col gap-30 justify-center font-[Poppins] items-center"
        dir="ltr"
    >
      <div class="boxes">
        <div class="box" v-for="i in 4" :key="i">
          <div v-for="j in 4" :key="j"></div>
        </div>
      </div>
      <div class="text">
        <span v-for="(c, i) in 'ErfaPay'" :style="`--c: ${i}`" :key="i">{{c}}</span>
      </div>
    </div>
  </Transition>
</template>

<style>
body:has(div#preloading), html:has(div#preloading), div#preloading {
  overflow: hidden;
  user-select: none;
  pointer-events: none;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>


<style scoped>
@import "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";



.boxes {
  height: 32px;
  width: 32px;
  position: relative;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  margin-left: -32px;
}

.boxes .box {
  width: 32px;
  height: 32px;
  top: 0;
  left: 0;
  position: absolute;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}


.boxes .box:nth-child(1) {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  -webkit-animation: box1 1s linear infinite;
  animation: box1 1s linear infinite;
}

.boxes .box:nth-child(2) {
  -webkit-transform: translate(0, 100%);
  transform: translate(0, 100%);
  -webkit-animation: box2 1s linear infinite;
  animation: box2 1s linear infinite;
}

.boxes .box:nth-child(3) {
  -webkit-transform: translate(100%, 100%);
  transform: translate(100%, 100%);
  -webkit-animation: box3 1s linear infinite;
  animation: box3 1s linear infinite;
}

.boxes .box:nth-child(4) {
  -webkit-transform: translate(200%, 0);
  transform: translate(200%, 0);
  -webkit-animation: box4 1s linear infinite;
  animation: box4 1s linear infinite;
}


.boxes .box > div {
  background: #5C8DF6;
  --translateZ: 15.5px;
  --rotateY: 0deg;
  --rotateX: 0deg;
  position: absolute;
  width: 100%;
  height: 100%;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  -webkit-transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
  transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
}

.boxes .box > div:nth-child(1) {
  top: 0;
  left: 0;
  background: #5C8DF6;
}

.boxes .box > div:nth-child(2) {
  background: #145af2;
  right: 0;
  --rotateY: 90deg;
}

.boxes .box > div:nth-child(3) {
  background: #447cf5;
  --rotateX: -90deg;
}

.boxes .box > div:nth-child(4) {
  background: #DBE3F4;
  top: 0;
  left: 0;
  --translateZ: -90px;
}

.text {
  font-size: clamp(1.5rem, 2.5vw, 1.4rem);
  letter-spacing: 5px;
  font-weight: bold;
}

.text span {
  display: inline-block;
  animation: pop 0.4s ease-in-out;
  color: #000;
}

.text span {
  animation-delay: calc(.3s + .1s * var(--i));
}
.text span:nth-child(n) {
  /*noinspection CssUnresolvedCustomProperty*/
  --i: calc(var(--c) - 1);
}


@keyframes box1 {
  0%,
  50% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(200%, 0);
  }
}

@keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}

@keyframes box3 {
  0%,
  50% {
    transform: translate(100%, 100%);
  }
  100% {
    transform: translate(0, 100%);
  }
}

@keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }
  50% {
    transform: translate(200%, 100%);
  }
  100% {
    transform: translate(100%, 100%);
  }
}

@keyframes pop {
  0% {
    transform: scale(1);
     //opacity: 0;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

</style>
