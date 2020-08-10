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
padding: 20px 30px;
}

nav .logo h1 span {
  font-family: LoveloLineLight;
  font-size: 24px;
}

nav .logo h1 {
  font-family: LoveloBlack;
  font-size: 25px;
  padding-right: 40px;
}

nav .links ul li {
  display: inline;
  padding: 0px 10px;
}

nav .links ul li a {
      text-transform: capitalize;
  font-weight: 200;
  text-decoration: none;
  color: black;
  font-size: 18px;
}
</style>
