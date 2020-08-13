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
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#developers">Team</a>
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
  padding: 30px 40px;
  position: absolute;
  top: 0;
  z-index: 5;
}

nav .logo h1 span {
  font-family: LoveloLineLight;
  font-size: 31px;
}

nav .logo h1 {
  font-family: LoveloBlack;
  font-size: 32px;
  padding-right: 40px;
  color: white;
}

nav .links ul li {
  display: inline;
  padding: 0px 20px;
}

nav .links ul li a {
  text-transform: capitalize;
  font-weight: 200;
  text-decoration: none;
  font-size: 16px;
  color: white;
}
// side nav: meetdevs = user-friends, home = home, about = question-circle, map=
// globe-america, contact = comment-dots
</style>
