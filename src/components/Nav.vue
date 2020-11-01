<template>
  <nav>
    <div class="topnav">
      <div class="left">
        <div class="logo">
          <h1><span>politi</span>track</h1>
        </div>
        <div class="links">
          <ul>
            <li>
              <a href="#map">Map</a>
            </li>
            <li>
              <a href="#insights">Insights</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#developers">Team</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="dark-mode-slider">
        <font-awesome-icon :icon="['fas', 'sun']" />
        <label @click="toggleDarkMode($event)" class="switch">
          <input type="checkbox" checked />
          <span class="slider round"></span>
        </label>
        <font-awesome-icon :icon="['fas', 'moon']" />
      </div>
    </div>
    <div class="sidenav">
      <ul>
        <li>
          <a href="#map">
            <span>
              <font-awesome-icon icon="map" />
            </span>
            <div class="link-name">Map</div>
          </a>
        </li>
        <!-- <li>
          <a href="#insights">
            <span>
              <font-awesome-icon icon="chart-line" />
            </span>
            <div class="link-name">Insights</div>
          </a>
        </li> -->
        <li>
          <a href="#about">
            <span>
              <font-awesome-icon icon="info-circle" />
            </span>
            <div class="link-name">About</div>
          </a>
        </li>
        <li>
          <a href="#developers">
            <span>
              <font-awesome-icon icon="users" />
            </span>
            <div class="link-name">Developers</div>
          </a>
        </li>
        <li>
          <a href="#contact">
            <span>
              <font-awesome-icon icon="envelope" />
            </span>
            <div class="link-name">Contact Us</div>
          </a>
        </li>
        <li>
          <a href="#">
            <span>
              <font-awesome-icon icon="arrow-up" />
            </span>
            <div class="link-name">Scroll To Top</div>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  methods: {
    toggleSidenav() {
      const viewportHeight = window.innerHeight;
      const activeClass = "active";
      const sidenav = document.querySelector(".sidenav");
      const footerTop = document.querySelector("footer").offsetTop;
      const offset = 150;

      if (
        window.scrollY > viewportHeight - offset &&
        !(window.scrollY + viewportHeight > footerTop)
      ) {
        sidenav.classList.add(activeClass);
      } else {
        sidenav.classList.remove(activeClass);
      }
    },
    toggleDarkMode(event) {
      let checkbox = event.target;
      var element = document.body;
      if (checkbox.checked) {
        element.classList.add("dark-mode");
      } else {
        element.classList.remove("dark-mode");
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.toggleSidenav);
  },
  destroyed() {
    window.removeEventListener("scroll", this.toggleSidenav);
  },
  mounted() {
    // turn on dark mode by default
    document.body.classList.add("dark-mode");
  }
};
</script>

<style lang="scss" scoped>
.topnav {
  display: flex;
  padding: 30px 40px;
  position: absolute;
  top: 0;
  z-index: 5;
  padding-left: 70px;
  width: calc(100% - 110px);
  justify-content: space-between;
}

.left {
  display: flex;
  position: relative;
  justify-content: space-between;
}

.topnav .logo {
  padding-top: 10px;
}

.logo {
  display: flex;
  align-content: center;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
}

nav .topnav .logo h1 span {
  font-family: LoveloLineLight;
  font-size: 34px;
}

nav .topnav .logo h1 {
  font-family: LoveloBlack;
  font-size: 35px;
  padding-right: 40px;
  color: white;
}

nav .topnav .links {
  display: flex;
  align-items: center;
}

nav .topnav .links ul li {
  display: inline;
  padding: 0px 20px;
}
$duration: 0.6s;
$distance: 6px;
$easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);

nav .topnav .links ul li a {
  text-transform: capitalize;
  font-weight: 300;
  text-decoration: none;
  font-size: 16px;
  color: white;
  position: relative;
  width: min-content;
  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--blue);
  }
  &:before {
    opacity: 0;
    transform: translateY(-$distance);
    transition: transform 0s $easeOutBack, opacity 0s;
  }
  &:after {
    opacity: 0;
    transform: translateY($distance/2);
    transition: transform $duration $easeOutBack, opacity $duration;
  }
  &:hover,
  &:focus {
    &:before,
    &:after {
      opacity: 1;
      transform: translateY(0);
    }
    &:before {
      transition: transform $duration $easeOutBack, opacity $duration;
    }
    &:after {
      transition: transform 0s $duration $easeOutBack, opacity 0s $duration;
    }
  }
}

.sidenav {
  position: fixed;
  z-index: 10;
  left: -150px;
  top: 150px;
  background: var(--primary-text);
  opacity: 0.8;
  transition: left 0.5s ease-in;
}

.sidenav.active {
  left: 0;
  transition: left 0.5s ease-out;
}

.sidenav li {
  position: relative;
}

.sidenav li a {
  display: block;
}

.sidenav .link-name {
  position: absolute;
  top: 0;
  left: -200px;
  height: 100%;
  width: max-content;
  z-index: -1;
  background: var(--primary-text);
  color: var(--background);
  font-weight: 400;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.5s ease-in;
}

.sidenav li:hover .link-name {
  left: 100%;
  transition: left 0.5s ease-out;
}

.sidenav span {
  padding: 13px 10px;
  font-size: 1.5em;
  display: flex;
  align-content: center;
  justify-content: center;
  color: var(--background);
  box-shadow: 1px 0 1px rgba(0, 0, 0, 0.2);
}

.sidenav span svg {
  transition: 0.2s ease;
}

.sidenav span:hover svg {
  transform: scale(1.1);
}

.sidenav li:nth-child(1) span {
  background: #ed2939;
}

.sidenav li:nth-child(2) span {
  background: #b43252;
}

.sidenav li:nth-child(3) span {
  background: #7b3b6c;
}

.sidenav li:nth-child(4) span {
  background: #424385;
}

.sidenav li:nth-child(5) span {
  background: #094c9e;
}

.sidenav li:nth-child(1) .link-name {
  background: #ed2939;
}

.sidenav li:nth-child(2) .link-name {
  background: #b43252;
}

.sidenav li:nth-child(3) .link-name {
  background: #7b3b6c;
}

.sidenav li:nth-child(4) .link-name {
  background: #424385;
}

.sidenav li:nth-child(5) .link-name {
  background: #094c9e;
}

.dark-mode-slider {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 160px;
  position: relative;
}

.dark-mode-slider svg {
  color: var(--primary-text);
  font-size: 1.4rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gray);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--blue);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--gray);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 36px;
  height: 28px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
