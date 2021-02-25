<template>
  <div class="progress-bar" />
</template>

<script>
export default {
  name: "ProgressBar",
  data() {
    return {
      progress: 0
    };
  },
  mounted() {
    this.updateScroll();
    window.addEventListener("scroll", this.updateScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      this.progress = this.computeProgress();
      console.info(this.progress);
      document
        .querySelector(".progress-bar")
        .style.setProperty("--progress", `${this.progress}%`);
    },
    computeProgress() {
      const bottom = document.body.scrollHeight - window.innerHeight;
      let progress = bottom > 0 ? window.scrollY / bottom : 1;

      // Set bounds to 0 and 1 to prevent impossible values on devices with momentum scrolling
      if (progress > 1) {
        progress = 1;
      }
      if (progress < 0) {
        progress = 0;
      }

      return progress * 100;
    }
  }
};
</script>

<style scoped>
.progress-bar {
  backface-visibility: hidden;
  height: 4px;
  position: fixed;
  top: 0;
  transform: translate3d(0, 0, 0);
  width: 100%;
  z-index: 100;
  --progress: 0%;
  background-image: linear-gradient(
    to right,
    var(--blue) 0,
    var(--red) var(--progress),
    transparent 0
  );
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
}
</style>
