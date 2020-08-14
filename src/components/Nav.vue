<template>
  <nav>
    <div class="topnav">
    <div class="logo">
      <h1><span>politi</span>track</h1>
    </div>
    <div class="links">
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
    </div>
    <div class="sidenav">
  <a href="#">Map</a>
  <a href="#about">About</a>
  <a href="#developers">Team</a>
  <a href="#contact">Contact</a>
  <a href="#" id="top"><i>To Top</i></a>
</div>
  </nav>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style lang="scss" scoped>
nav .topnav {
  display: flex;
  padding: 30px 40px;
  position: absolute;
  top: 0;
  z-index: 5;
  padding-left: 70px;
}

nav .topnav .logo {
  padding-top: 10px;
}

nav .topnav .logo h1 span {
  font-family: LoveloLineLight;
  font-size: 34px;
}

nav .topnav .logo h1 {
  font-family: LoveloBlack;
  font-size: 35px;
  padding-right: 40px;
  color: white;
}

nav .topnav .links ul li {
  display: inline;
  padding: 0px 20px;
}

nav .topnav .links ul li a {
  text-transform: capitalize;
  font-weight: 200;
  text-decoration: none;
  font-size: 16px;
  color: white;
}

.sidenav {
  width: 130px;
  position: fixed;
  z-index: 10; 
  top: 140px; 
  left: 0;
  background-color: var(--blue);
  overflow-x: hidden; 
  opacity: .7;
}

$duration: 0.6s;
$distance: 6px;
$easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);

.sidenav a { //want a way to make the text not transparent but the background opacity .6/.7//
  padding: 6px 6px 6px 12px;
  text-decoration: none;
  font-size: 16px;
  color: white;
  display: block;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: 200;
  position: relative;

    &:before, //for some reason the underline spans the entire menu. only want the underline to affect the length of the word//
  &:after {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--red);
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

#top {
  padding-top: 40px;
  padding-left: 70px;
}



// side nav: meetdevs = user-friends, home = home, about = question-circle, map=
// globe-america, contact = comment-dots
</style>
