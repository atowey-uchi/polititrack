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
  name: "Nav",
  methods: {
    toggleSidenav() {
      const viewportHeight = window.innerHeight;
      const activeClass = "active";
      const sidenav = document.querySelector(".sidenav");
      const footerTop = document.querySelector("footer").offsetTop;

      if (
        window.scrollY > viewportHeight &&
        !(window.scrollY + viewportHeight > footerTop)
      ) {
        sidenav.classList.add(activeClass);
      } else {
        sidenav.classList.remove(activeClass);
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.toggleSidenav);
  },
  destroyed() {
    window.removeEventListener("scroll", this.toggleSidenav);
  }
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

nav .logo {
  display: flex;
  align-content: center;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
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

nav .topnav .links {
  display: flex;
  align-items: center;
}

nav .topnav .links ul li {
  display: inline;
  padding: 0px 20px;
}
$duration: 0.6s;
$distance: 6px;
$easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);

nav .topnav .links ul li a {
  text-transform: capitalize;
  font-weight: 200;
  text-decoration: none;
  font-size: 16px;
  color: white;
  position: relative;
  width: min-content;
  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
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

.sidenav {
  width: 130px;
  position: fixed;
  z-index: 10;
  top: 140px;
  left: -130px;
  background-color: var(--blue-60);
  overflow-x: hidden;
  transition: left 0.5s ease-in;
}

.sidenav.active {
  left: 0;
  transition: left 0.5s ease-out;
}

$duration: 0.6s;
$distance: 6px;
$easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);

.sidenav a {
  margin: 6px 6px 6px 12px;
  text-decoration: none;
  font-size: 16px;
  color: white;
  display: block;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: 200;
  position: relative;
  width: min-content;

  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
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
