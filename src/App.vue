<template>
  <div id="app">
    <Nav />
    <Header />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
    Nav
  }
};
</script>

<style lang="scss">
@import url("assets/theme.css");
</style>
