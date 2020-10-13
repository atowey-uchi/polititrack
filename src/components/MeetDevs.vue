<template>
  <section class="meet-devs" id="developers">
    <div class="title">
      <h1>Meet the Developers</h1>
    </div>
    <section class="developer" id="allison">
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
      <div class="description">
      <p>
        <span>Allison Towey </span> is currently a Policy Analyst in the educational technology space by day, data nerd by night.
        She has previously worked as a Product Manager and interned in the US Senate. She graduated from the University of Notre Dame in 2019, where
        she studied Political Science.
        <a href="www.allisontowey.com">Check out her website!</a>
      </p>
      </div>
    </section>
    <section class="developer" id="marcus">
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
      <div class="description">
      <p>
        <span> Marcus Schimizzi </span> is a Software Developer. He graduated
        from the University of Notre Dame in 2019 with a degree in Computer
        Science. <a href="#">Find his website here.</a>
      </p>
      </div>
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
  width: 80%;
  margin: 0 auto;
  position: relative;
  height: 100vh;
  padding-bottom: 120px;
  width: 1280px;
}

section .title h1 {
  text-align: center;
  font-size: 48px;
  padding-top: 40px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

section .developer {
  display: flex;
  max-width: calc(1280px * 80%);
  justify-content: center;
  align-content: center;
}

.developer p,
a {
  font-size: 16px;
  font-weight: 400;
  color: var(--primary-text);
}

.developer p {
  padding-top: 70px;
}

.developer-image {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 200px;
  height: 200px;
  margin-left: 30px;
  margin-right: 30px;
}

.developer .circles {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
}

.developer .circle {
  position: absolute;
  top: 0;
  left: 0;
  filter: invert(15%) sepia(96%) saturate(5640%) hue-rotate(358deg) brightness(101%) contrast(85%);
  opacity: .6;
  }

.developer .blue{
  position: absolute;
  top: 10px;
  bottom: -10px;
  left: 20px;
  right: -20px;
  filter: invert(9%) sepia(71%) saturate(4423%) hue-rotate(228deg) brightness(107%) contrast(98%);

}

.developer img {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.description {
  width: 550px;
  margin-right:30px;
}

.developer p span {
  font-weight: 600;
  font-size: 20px;
  color: var(--primary-text);
}

.developer a {
  font-weight: 500;
}

.profile {
  position: relative;
  height: 100%;
}

.developer#marcus {
  display: -webkit-flex;
  -webkit-flex-direction: row-reverse;
  display: flex;
  flex-direction: row-reverse;
}

.developer#allison .description {
  margin-left: 60px;
}

.developer#marcus .description {
  margin-left: 60px;
}
</style>
