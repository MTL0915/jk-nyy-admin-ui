<template>
    <div class='bgDiv' :class='{ complete : isComplete }'>
        <div class='div'>LOADING({{ rate + "%" }})</div>
    </div>
</template>

<script>
export default {
    props: {
        rate: {
            type: Number,
            default: 0
        },
        isComplete: {
            type: Boolean,
            default: false
        }
    },
    mounted (){

    },
    methods: {

    }
}
</script>

<style scoped>

.bgDiv.complete {
    animation: hidden ease-in 2s;
    animation-fill-mode: forwards;
}

.bgDiv {
    position: absolute;
    top:0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #20293a;
}

.div, .div::after, .div::before {
  box-sizing: inherit;
}

.div, .div:before, .div:after {
  box-sizing: border-box;
  outline: none;
}


.div {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-color: #20293a;
  color: #20293a;
  border-radius: 50%;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  animation: text 10s ease infinite;
}
.div:after {
  position: absolute;
  content: "";
  top: -5%;
  left: -5%;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(0.85);
  filter: blur(5vw);
  background: linear-gradient(270deg, #00fcbd, #7400f9);
  background-size: 150% 150%;
  border-radius: 50%;
  animation: g 10s linear infinite;
}

@keyframes hidden {
    0% {
        opacity: 1;
    }
    99% {
        opacity: 0;
    }
    100% {
        opacity: 0;
        display: none;
    }
}

@keyframes g {
  0% {
    top: -3%;
    left: -3%;
    background-position: 0% 50%;
    background-size: 150% 150%;
  }
  12.5% {
    top: -3%;
    left: 0;
    background-size: 70% 30%;
  }
  25% {
    top: -3%;
    left: 3%;
    background-size: 100% 50%;
  }
  37.5% {
    top: 0;
    left: 3%;
    background-size: 70% 30%;
  }
  50% {
    top: 3%;
    left: 3%;
    background-position: 100% 50%;
    background-size: 30% 30%;
  }
  62.5% {
    top: 3%;
    left: 0;
    background-size: 30% 70%;
  }
  75% {
    top: 3%;
    left: -3%;
    background-size: 50% 100%;
  }
  87.5% {
    top: 0;
    left: -3%;
    background-size: 30% 70%;
  }
  100% {
    top: -3%;
    left: -3%;
    background-position: 0% 50%;
    background-size: 150% 150%;
  }
}
@keyframes text {
  0% {
    color: #7400f9;
  }
  50% {
    color: #00fcbd;
  }
  100% {
    color: #7400f9;
  }
}
</style>