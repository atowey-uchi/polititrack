<template>
  <div id="app">
    <Loading v-show="!loaded" />
    <Nav />
    <Header />
    <Map />
    <Insights />
    <About />
    <MeetDevs />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Loading from "./components/Loading.vue";
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import Insights from "./components/Insights.vue";
import About from "./components/About.vue";
import MeetDevs from "./components/MeetDevs.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Loading,
    Header,
    Nav,
    Map,
    Insights,
    About,
    MeetDevs,
    Contact,
    Footer
  },
  data() {
    return {
      loaded: false
    };
  },
  methods: {
    activateAnimation() {
      const bodyTop = document.querySelector("body").getBoundingClientRect()
        .top;
      const entries = document.querySelectorAll(
        ".fade-up-and-in, .pop-in, .slide-in-left, .slide-in-right"
      );
      const windowScroll = window.scrollY + window.innerHeight;
      entries.forEach(entry => {
        const top = entry.getBoundingClientRect().top - bodyTop;
        if (windowScroll >= top) {
          entry.classList.add("in-view");
        } else {
          entry.classList.remove("in-view");
        }
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.activateAnimation);
    this.activateAnimation();
    setTimeout(() => {
      this.loaded = true;
    }, 600);
  },
  destroyed() {
    window.removeEventListener("scroll", this.activateAnimation);
  }
};
</script>

<style lang="scss">
@import url("assets/theme.css");
</style>
