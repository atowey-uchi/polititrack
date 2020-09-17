<template>
  <footer>
    <div id="container">
      <div id="columns">
        <div id="block"></div>
        <div id="content">
          <ul>
            <li>
              <a href="#">Map</a>
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
        <div id="logo">
          <h1><span>Politi</span>Track</h1>
        </div>
      </div>
      <div id="copyright">
        <p>&#169; 2020. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
#container {
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 400px;
}

$duration: 0.6s;
$distance: 6px;
$easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);

div.footer {
  background-color: linear-gradient(to right, var(--blue), var(--red));
  font-family: "Poppins", sans-serif;
}

#columns {
  display: flex;
}

ul {
  list-style-type: none;
  margin: 0;
  text-align: center;
  margin-top: 10%;
  padding-top: 40px;
  padding-left: 300px;

  li {
    display: flex;
    margin: 0 20px;
  }
}
a {
  font-size: 35px;
  color: white;
  font-family: "Poppins";
  font-weight: 800;
  position: relative;
  text-decoration: none;
  padding-bottom: 8px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));

  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 0;
    right: 0;
    height: 6px;
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

#logo {
  padding-left: 350px;
  padding-top: 200px;
}

#logo h1 span {
  font-family: LoveloLineLight;
  font-size: 48px;
}

#logo h1 {
  font-family: LoveloBlack;
  font-size: 49px;
  padding-right: 40px;
  color: white;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

#copyright p {
  color: white;
  display: flex;
  justify-content: center;
  padding-top: 90px;
}

#block {
  background: linear-gradient(to right, var(--blue), var(--red));
  filter: alpha(opacity=83);
  /* IE */
  -moz-opacity: 0.83;
  /* Mozilla */
  opacity: 0.83;
  /* CSS3 */
  position: absolute;
  top: 0;
  left: 0;
  height: 130%;
  width: 100%;
  z-index: -1;
}
</style>
