<template>
  <section class="contactform">
    <div class="container">
      <form action="action_page.php">
        <label for="fname">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          style="height:20px"
          placeholder="Your name here..."
        />

        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          style="height:20px"
          placeholder="Your email here..."
        />

        <label for="subject">Message</label>
        <textarea
          id="subject"
          name="subject"
          placeholder="Write us a msessage!"
          style="height:200px"
        ></textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Contact"
};
</script>

<style lang="scss" scoped>
input[type="text"],
select,
textarea {
  width: 100%;
  padding: 20px;
  border: 5px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  padding-right: 150px;
  padding-left: 150px;
}
</style>
