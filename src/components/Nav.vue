<template>
  <nav>
    <div class="topnav">
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
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
    </div>
    <div class="sidenav">
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
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
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 10; /* Stay on top */
  top: 110px; /* Stay at the top */
  left: 0;
  background-color: var(--blue);
  overflow-x: hidden; 
}

$duration: 0.6s;
$distance: 6px;
$easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);

.sidenav a {
  padding: 6px 6px 6px 12px;
  text-decoration: none;
  font-size: 16px;
  color: #818181;
  display: block;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: 200;

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


.sidenav a:hover {
  color: #f1f1f1;
}


// side nav: meetdevs = user-friends, home = home, about = question-circle, map=
// globe-america, contact = comment-dots
</style>
