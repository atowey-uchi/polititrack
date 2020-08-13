<template>
  <section>
    <div class="gradient">
      <!-- <img src="@/assets/images/gradientback.png"> -->
    </div>
    <section class="text">
      <h1>
        What are our presidential <br />
        candidates up to?
      </h1>
      <h2>
        Tracking where they are, who they're with, <br />
        and who they're talking to
      </h2>
    </section>
    <div class="graphic">
      <img src="@/assets/images/whitehouseroad.png" id="whitehouseroad" />
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",
  created() {
    window.addEventListener("resize", this.resizeGradient);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeGradient);
  },
  mounted() {
    this.resizeGradient();
  },
  methods: {
    resizeGradient() {
      const gradient = document.querySelector(".gradient");
      const textTop = document.querySelector(".text p").offsetTop;
      const width = window.innerWidth;
      const triangleWidth = width * 0.9;
      const height = window.innerHeight;

      gradient.style.width = width + "px";
      gradient.style.height = height + "px";
      if (width > height) {
        gradient.style.setProperty(
          "clip-path",
          "polygon(0 0, " + triangleWidth + "px 0, 0 " + textTop + "px)"
        );
        gradient.style.setProperty(
          "-webkit-clip-path",
          "polygon(0 0, " + triangleWidth + "px 0, 0 " + textTop + "px)"
        );
      } else {
        gradient.style.setProperty(
          "-webkit-clip-path",
          "polygon(0 0, 100vw 0, 0 " + textTop + "px)"
        );
        gradient.style.setProperty(
          "clip-path",
          "polygon(0 0, 100vw 0, 0 " + textTop + "px)"
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  height: 100vh;
  padding-bottom: 120px;
}

.gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 85vw;
  height: 80vh;
  z-index: -1;
  background: linear-gradient(to right, var(--blue), var(--red));
  transform: rotate(0deg);
  clip-path: polygon(0 0, 100% 0, 0 93%);
  opacity: 0.74;
}

.gradient img {
  max-width: 100%;
}

section .text {
  padding-left: 70px;
  padding-top: 300px;
}

h1 {
  font-size: 60px;
}

h2 {
  font-size: 28px;
  padding-top: 0px;
}

.graphic {
  position: absolute;
  right: 7%;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

#whitehouseroad {
  position: relative;
  width: 414px;
  opacity: 0.92;
  padding-bottom: 120px;
}
</style>
