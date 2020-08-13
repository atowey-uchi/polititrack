<template>
  <div id="app">
    <Nav />
    <Header />
    <About />
    <MeetDevs />
    <Contact />
    <Footercopy />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
import About from "./components/About.vue";
import MeetDevs from "./components/MeetDevs.vue";
import Contact from "./components/Contact.vue";
import Footercopy from "./components/Footer-copy.vue";

export default {
  name: "App",
  components: {
    Header,
    Nav,
    About,
    MeetDevs,
    Contact,
    Footercopy
  }
};
</script>

<style lang="scss">
@import url("assets/theme.css");
</style>
