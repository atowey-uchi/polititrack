<template>
  <div id="app">
    <Nav />
    <Header />
    <MeetDevs />
    <About />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
import MeetDevs from "./components/MeetDevs.vue";
import About from "./components/About.vue";

export default {
  name: "App",
  components: {
    Header,
    Nav,
    MeetDevs,
    About
  }
};
</script>

<style lang="scss">
@import url("assets/theme.css");
</style>
