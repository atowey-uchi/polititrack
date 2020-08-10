<template>
  <nav>
    <div class="logo">
      <h1><span>politi</span>track</h1>
    </div>
    <div class="links">
      <ul>
        <li>
          <a href="#">map</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">FAQ</a>
        </li>
        <li>
          <a href="#">Team</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: center;
}

nav .logo h1 span {
  font-family: LoveloLineLight;
  font-size: 18px;
}

nav .logo h1 {
  font-family: LoveloBlack;
  font-size: 19px;
}

nav .links ul li {
  display: inline;
  padding: 5px 10px;
  text-transform: capitalize;
}
</style>
