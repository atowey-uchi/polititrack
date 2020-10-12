<template>
  <section class="contact" id="contact">
    <h1>Contact Us!</h1>

    <section class="contactform">
      <div class="container">
        <form action="action_page.php">
          <label for="fname">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            style="height:20px"
            placeholder="Enter your name"
          />

          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            style="height:20px"
            placeholder="Enter your email"
          />

          <label for="subject">Message</label>
          <textarea
            id="subject"
            name="subject"
            placeholder="Write us a message!"
            style="height:200px"
          ></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "Contact"
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 48px;
  padding-top: 60px;
  padding-bottom: 20px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

section.contactform {
  display: flex;
  justify-content: center;
  align-content: center;
  padding-left: 20%;
  padding-right: 20%;
  padding-bottom: 60px;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 20px;
  border: 1px solid var(--primary-text);
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  font-family: "Open Sans", sans-serif;
  background: linear-gradient(to right, var(--blue-trans), var(--red-trans));
  color: white;
}

input[type="submit"] {
  background-color: var(--blue);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Bai Jamjuree";
}

input[type="submit"]:hover {
  background-color: var(--darker-blue);
}

.container {
  border-radius: 5px;
  // background-color: var(--contact-back);
  background: transparent;
  // border: 1px solid var(--black-ish);
  padding: 40px 30px;
  padding-right: 150px;
  padding-left: 150px;
  width: 60%;
  position: relative;
  // filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

label {
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: 200;
  color: var(--secondary-text);
}

@media screen and (max-width: 834px) {
  .container {
    padding: 0;
    width: 100%;
  }
}

@media screen and (max-width: 414px) {
  section.contactform {
    padding-left: 50px;
    padding-right: 50px;
  }
}
</style>
