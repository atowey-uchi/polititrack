<template>
  <div id="app">
    <Nav />
    <Header />
    <About />
    <MeetDevs />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
import About from "./components/About.vue";
import MeetDevs from "./components/MeetDevs.vue";

export default {
  name: "App",
  components: {
    Header,
    Nav,
    About,
    MeetDevs
  }
};
</script>

<style lang="scss">
@import url("assets/theme.css");
</style>
