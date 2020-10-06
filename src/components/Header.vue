<template>
  <section>
    <!-- <div class="gradient">
      <img src="@/assets/images/gradientback.png">
    </div> -->
    <section class="text">
      <h1 id="headline" class="banner-title">
        What are our presidential <br />
        candidates up to?
      </h1>
      <h2 id="subheadline">
        Tracking where they are, who they're with, <br />
        and who they're talking to
      </h2>
    </section>
    <div class="section-background-wrap isLoaded">
      <canvas
        id="gradient-canvas"
        data-js-darken-top=""
        data-transition-in=""
        width="686"
        height="600"
        class="isLoaded"
      ></canvas>
    </div>
    <div class="text-under text-under-overlay banner-title"><h1>What are our presidential <br /> candidates up to?</h1></div>
    <div class="text-under text-under-blended banner-title"><h1>What are our presidential <br /> candidates up to?</h1></div>
    <div class="graphic">
      <img
        src="@/assets/images/whitehouseroad-dm3.png"
        id="whitehouseroad-dm"
      />
      <img src="@/assets/images/whitehouseroad.png" id="whitehouseroad" />
    </div>
  </section>
</template>

<script>
// import * as gradient from "../lib/gradient";

export default {
  name: "Header",
  // created() {
  //   window.addEventListener("resize", this.resizeGradient);
  // },
  // destroyed() {
  //   window.removeEventListener("resize", this.resizeGradient);
  // },
  mounted() {
    // this.resizeGradient();
    let gradientScript = document.createElement("script");
    gradientScript.setAttribute("src", "/gradient.js");
    document.head.appendChild(gradientScript);
  },
  methods: {
    resizeGradient() {
      const gradient = document.querySelector(".gradient");
      const textTop =
        document.getElementById("subheadline").offsetTop +
        document.querySelector("section .text").offsetTop;
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
@import url("../assets/gradient.css");

section {
  position: relative;
  height: 100vh;
  padding-bottom: 120px;
  --text-left: 70px;
  --text-top: 300px;
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
  opacity: 0.83;
}

.gradient img {
  max-width: 100%;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
  box-shadow: rgba(0, 0, 0, 0.1);
}

section.text {
  position: absolute;
  left: var(--text-left);
  top: var(--text-top);
  height: min-content;
}

.banner-title h1,
h1.banner-title {
  font-size: 60px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

h2 {
  font-size: 28px;
  padding-top: 0px;
  color: var(--secondary-text);
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

.text-under {
  position: absolute;
  left: var(--text-left);
  top: var(--text-top);
}

.text-under-blended {
  mix-blend-mode: color-burn;
  color: var(--primary-text);
}

.text-under-overlay {
  opacity: 0.4;
  color: var(--primary-text);
}

.graphic {
  position: absolute;
  right: 7%;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

#whitehouseroad-dm {
  display: none;
}

#whitehouseroad {
  position: relative;
  width: 414px;
  opacity: 0.92;
  padding-bottom: 120px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

.dark-mode #whitehouseroad-dm {
  display: block;
  position: relative;
  width: 414px;
  opacity: 0.92;
  padding-bottom: 120px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

.dark-mode #whitehouseroad {
  display: none;
}
</style>
