<template>
<section class="about">
  <div class="title">
    <h1>
      About <span class="politi">POLITI</span><span class="track">TRACK</span>
    </h1>
  </div>
  <section class="about-info">
    <p>
      The PolitiTrack candidate tracking map compiles campaign data from the two
      major party candidates so you blah blah blah blah. We displa
    </p>
  </section>
  <section class="faq">
    <div class="question">
      <p>Where do you get the data?</p>
    </div>
    <div class="answer">
      <p>
        We source our information primarily from the candidates' websites and
        social media accounts.
      </p>
    </div>
  </section>
  </section>
</template>

<script>
export default {
  name: "About"
};
</script>

<style scoped lang="scss">
div .title h1 {
  text-align: center;
  font-size: 48px;
  padding-top: 80px;
}

.title h1 span.politi {
  font-family: "LoveloLineBold";
}

.title h1 span.track {
  font-family: "LoveloBlack";
}

.faq div.question {
  font-weight: bold;
  font-style: italic;
}
</style>
