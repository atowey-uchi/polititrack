<template>
  <div id="app">
    <Nav />
    <Header />
    <Map />
    <About />
    <MeetDevs />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import About from "./components/About.vue";
import MeetDevs from "./components/MeetDevs.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Nav,
    Map,
    About,
    MeetDevs,
    Contact,
    Footer
  }
};
</script>

<style lang="scss">
@import url("assets/theme.css");
</style>
