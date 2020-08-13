<template>
  <section class="meet-devs" id="developers">
    <div class="title">
      <h1>Meet the Developers</h1>
    </div>
    <section class="developer">
      <div class="developer-image">
        <div class="circles">
          <div class="circle">
            <img src="@/assets/images/circle.svg" />
          </div>
          <div class="circle blue">
            <img src="@/assets/images/circle.svg" />
          </div>
        </div>
        <div class="profile">
          <img src="@/assets/images/girl.svg" />
        </div>
      </div>
      <p>
        <span>Allison Towey </span> is a Product Manager by day, political nerd
        by night. She graduated from the University of Notre Dame in 2019, where
        she majored in Political Science.
        <a href="#">Check out her website!</a>
      </p>
    </section>
    <section class="developer">
      <div class="developer-image">
        <div class="circles">
          <div class="circle">
            <img src="@/assets/images/circle.svg" />
          </div>
          <div class="circle blue">
            <img src="@/assets/images/circle.svg" />
          </div>
        </div>
        <div class="profile">
          <img src="@/assets/images/boy.svg" />
        </div>
      </div>
      <p>
        <span> Marcus Schimizzi </span> is a Software Developer. He graduated
        from the University of Notre Dame in 2019 with a degree in Computer
        Science. <a href="#">Find his website here.</a>
      </p>
    </section>
  </section>
</template>

<script>
export default {
  name: "MeetDevs"
};
</script>

<style lang="scss" scoped>
.meet-devs {
  width: 100%;
  position: relative;
  height: 100vh;
  padding-bottom: 120px;
}

section .title h1 {
  text-align: center;
  font-size: 48px;
  padding-top: 40px;
}

section .developer {
  display: flex;
  width: 100%;
  --padding-horizontal: 150px;
  --padding-vertical: 40px;
  padding: var(--padding-vertical) var(--padding-horizontal);
  width: calc(100% - (2 * var(--padding-horizontal)));
}

.developer p,
a {
  font-size: 16px;
}

.developer p {
  padding-top: 70px;
}

.developer-image {
  position: relative;
  display: flex;
  justify-content: center;
  width: 500px;
  height: 200px;
}

.developer .circles {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.developer .circle {
  position: absolute;
  top: 0;
  left: 0;
}

.developer img {
  max-width: 100%;
  max-height: 100%;
}

.developer p span {
  font-weight: 600;
  font-size: 20px;
}

.profile {
  position: relative;
  height: 100%;
}
</style>
