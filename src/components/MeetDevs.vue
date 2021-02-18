<template>
  <section class="meet-devs fade-up-and-in" id="developers">
    <div class="content-wrapper">
      <div class="title">
        <h1>Meet the Developers</h1>
      </div>
      <div class="developer allison slide-in-right">
        <div class="gradient">
          <img src="@/assets/images/brush3color.svg" id="topbar" />
        </div>
        <div class="developer-content">
          <div class="developer-image">
            <img src="@/assets/images/circle.svg" class="circle blue" />
            <img src="@/assets/images/circle.svg" class="circle red" />
            <img src="@/assets/images/girl.svg" class="profile" />
          </div>
          <div class="bio">
            <p>
              <span>Allison Towey</span> is a policy analyst working in the
              educational technology space. She has experience as a Product
              Manager and intern in the US Senate. She graduated from the
              University of Notre Dame in 2019, majoring in Political Science.
              <br />
              &#8594;
              <a href="https://www.allisontowey.com">Check out her website!</a>
            </p>
          </div>
        </div>
      </div>
      <div class="developer marcus slide-in-left">
        <div class="gradient">
          <img src="@/assets/images/brush3color.svg" id="topbar" />
        </div>
        <div class="developer-content">
          <div class="bio">
            <p>
              <span>Marcus Schimizzi</span> is a software engineer by trade and
              a policy wonk by passion. He graduated from the University of
              Notre Dame in 2019, where he majored in Computer Science. <br />
              &#8594; <a href="https://schimizzi.io">Check out his website!</a>
            </p>
          </div>
          <div class="developer-image">
            <img src="@/assets/images/circle.svg" class="circle blue" />
            <img src="@/assets/images/circle.svg" class="circle red" />
            <img src="@/assets/images/boy.svg" class="profile" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MeetDevs"
};
</script>

<style lang="scss" scoped>
.meet-devs {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}

.content-wrapper {
  position: relative;
  width: 80%;
}

.title h1 {
  text-align: center;
  font-size: 48px;
  padding-top: 40px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

.developer {
  position: relative;
  width: 100%;
  height: 300px;
}

.gradient {
  position: absolute;
  top: 50%;
  left: 0;
  transform: scale(1.5, 1.2) translateY(-50%);
  opacity: 0.4;
  z-index: -1;
}

.marcus .gradient {
  transform: scale(1.5, 1.2) translateY(-50%) rotate(180deg);
}

.developer p {
  font-size: 16px;
  font-weight: 300;
  color: var(--primary-text);
}

.developer p span {
  font-family: "Bai Jamjuree";
  font-weight: 600;
  font-size: 22px;
  color: var(--primary-text);
}

.developer a {
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
  font-family: "Bai Jamjuree";
}

.developer-content {
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  height: 100%;
}

.developer-image {
  position: relative;
  width: 300px;
}

.developer-image img {
  position: absolute;
  max-width: 100%;
}

.developer-image img.profile {
  width: 180px;
}

.developer-image img.profile,
.developer-image img.circle {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.marcus .developer-image img.profile {
  width: 150px;
}

.allison .developer-image img.circle.blue {
  transform: translate(-50%, -50%) rotate(180deg) translate(-5px, -5px);
  filter: invert(16%) sepia(38%) saturate(5232%) hue-rotate(224deg)
    brightness(84%) contrast(111%) opacity(0.4);
}

.allison .developer-image img.circle.red {
  filter: invert(18%) sepia(64%) saturate(3709%) hue-rotate(350deg)
    brightness(109%) contrast(103%) opacity(0.4);
}

.marcus .developer-image img.circle.blue {
  filter: invert(16%) sepia(38%) saturate(5232%) hue-rotate(224deg)
    brightness(84%) contrast(111%) opacity(0.4);
}

.marcus .developer-image img.circle.red {
  transform: translate(-50%, -50%) rotate(180deg) translate(-5px, -5px);
  filter: invert(18%) sepia(64%) saturate(3709%) hue-rotate(350deg)
    brightness(109%) contrast(103%) opacity(0.4);
}

.developer-content .bio {
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.developer-content .bio p {
  width: 80%;
}

@media screen and (max-width: 1024px) {
  .developer-image {
    width: 200px;
  }

  .developer-image img.profile {
    width: 115px;
  }

  .marcus .developer-image img.profile {
    width: 100px;
  }
}

@media screen and (max-width: 834px) {
  .developer-content .bio {
    max-width: 400px;
  }
}

@media screen and (max-width: 414px) {
  .gradient {
    transform: scale(1.5, 1.5) translateY(-35%);
  }

  .developer p,
  .developer a {
    font-size: 13px;
  }

  .developer-content .bio {
    max-width: 200px;
  }

  .developer-content .bio p {
    width: 92%;
  }

  .developer-image img.profile {
    width: 75px;
  }

  .marcus .developer-image img.profile {
    width: 60px;
  }
}

.developer#allison .description {
  margin-left: 60px;
}

.developer#marcus .description {
  margin-left: 60px;
}

.allison {
  animation-delay: 0.3s;
}

.marcus {
  animation-delay: 0.6s;
}
</style>
