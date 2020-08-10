<template>
  <section>
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
