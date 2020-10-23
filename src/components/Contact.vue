<template>
  <section class="contact" id="contact">
    <h1>Contact Us!</h1>

    <section class="contactform" v-if="!messageSent">
      <div class="container">
        <label for="fname">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          style="height:20px"
          placeholder="Enter your name"
          v-model="name"
        />

        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          style="height:20px"
          placeholder="Enter your email"
          v-model="email"
        />
        <label for="type">Why are you contacting us?</label>
        <select id="type" name="type" v-model="type">
          <option value="inquiry">Inquiry</option>
          <option value="data">Submit Missing/Erroneous Data</option>
          <option value="suggestion">Suggestion</option>
          <option value="other">Other</option>
        </select>
        <label for="subject">Message</label>
        <textarea
          id="subject"
          name="subject"
          placeholder="Write us a message!"
          style="height:200px"
          v-model="message"
        ></textarea>

        <button class="submit-btn" @click="submitForm()">Submit</button>
      </div>
    </section>
    <div v-else class="sent-message">
      <h3>Thanks for the feedback!</h3>
      <button @click="messageSent = !messageSent">
        More feedback to give?
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      name: "",
      email: "",
      type: "inquiry",
      message: "",
      messageSent: false
    };
  },
  methods: {
    submitForm() {
      let body = {
        name: this.name,
        email: this.email,
        type: this.type,
        message: this.message
      };

      let xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.polititrack.us/contact");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(body));
      this.messageSent = true;
    }
  }
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

.sent-message {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding-bottom: 50px;
}

.sent-message button {
  background: linear-gradient(to right, var(--blue-trans), var(--red-trans));
  padding: 20px;
  border: 1px solid var(--primary-text);
  border-radius: 4px;
  color: white;
  font-family: "Bai Jamjuree", sans-serif;
  transition: all 0.5s linear;
  cursor: pointer;
}

.sent-message button:hover {
  background: linear-gradient(to left, var(--blue-trans), var(--red-trans));
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
  color: var(--primary-text);
  font-size: 14px;
}

.submit-btn {
  background-color: var(--blue);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Bai Jamjuree";
}

.submit-btn:hover {
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
  font-weight: 300;
  color: var(--secondary-text);
  font-size: 16px;
}
/* Style The Dropdown Button */
.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

option {
  font-family: "Open Sans";
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
