<template>
  <section>
    <div class="gradient">
      <!-- <img src="@/assets/images/gradientback.png"> -->
      </div>
    <section class="text">
      <h1>
        What are the <br />
        candidates up to?
      </h1>
      <p>
        Tracking where they are, who they're with, <br />
        and who they're talking to
      </p>
    </section>
    <div class="graphic">
      <img src="@/assets/images/whitehouseroad.png" id="whitehouseroad" />
    </div>
  </section>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  height: 100vh;
}

.gradient {
  position: absolute;
  top: -40%;
  left: -16%;
  width: 80vw;
  height: 80vh;
  z-index: -1;
  background: linear-gradient(to right, var(--blue), var(--red));
  transform: rotate(-30deg);
  opacity: .8;
}

.gradient img {
  max-width: 100%;
}

section .text {
  padding-left: 70px;
  padding-top: 300px;
}

h1 {
  font-size: 72px;
  letter-spacing: 2px;
}

p {
  font-size: 32px;
  padding-top: 20px;
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
  width: 400px;
}
</style>
