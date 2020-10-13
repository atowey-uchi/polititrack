<template>
  <section class="about" id="about">
    <div class="gradient-swoosh">
      <img src="@/assets/images/brush1.svg" />
    </div>
    <div class="title">
      <h1>
        About <span class="politi">POLITI</span><span class="track">TRACK</span>
      </h1>
    </div>
    <section class="about-info">
      <h2>
        PolitiTrack was created in 2020 as a tool for wonks and casual political
        consumers alike. Our candidate tracking map compiles campaign events
        from the two major party candidates, their immediate family members, and
        their vice presidential nominees. We track where, when, and who is
        involved in these events throughout the campaign cycle so you can stay
        informed about campaign strategies and how they evolve during the
        season.
      </h2>
    </section>
    <section class="faq">
      <h1>FAQ</h1>
      <div class="question">
        <p>What are you tracking?</p>
      </div>
      <div class="answer">
        <p>
          We are tracking campaign events involving the two major party
          candidates (Donald J. Trump and Joseph R. Biden Jr.) in the 2020
          general election. We compile date and location data, as well as any
          audience, subject matter, and guests present data available for each
          of these campaign events.
        </p>
      </div>
      <div class="question">
        <p>Which events are included?</p>
      </div>
      <div class="answer">
        <p>
          We include campaign events tied to specific locations (i.e. not open
          virtual events) attended by a) the presidential candidate, b) their
          immediate family members , c)their vice presidential candidate and
          their immediate family members.
        </p>
      </div>
      <div class="question">
        <p>What defines a "campaign event"?</p>
      </div>
      <div class="answer">
        <p>
          We define a campaign event as an in-person public event in which a
          candidate or candidate's representives (such as a vice presidential
          nominee or immediate family member) and prospective voters are
          present. This includes events such as rallies, speeches, townhalls,
          fundraisers, tours, visits, and parades. At this time, we do not
          consider media interviews, social media livestreams, virtual-only
          events, or official government business as campaign events for the
          purpose of this tracker.
        </p>
      </div>

      <div class="question">
        <p>When did you start tracking campaign events?</p>
      </div>
      <div class="answer">
        <p>
          Our data begins June 1, 2020. We track campaign events for the general
          election and do not include primary campaign events.
        </p>
      </div>
      <div class="question">
        <p>
          You are missing <i>X</i> campaign event, and I think it should be
          included. What do I do?
        </p>
      </div>

      <div class="answer">
        <p>
          Contact us! We are constantly looking to improve and correct our data.
          Please send us the name and any information on the campaign event you
          have. We will take a look and update our tracker as soon as possible
          if necessary.
        </p>
      </div>
      <div class="question">
        <p>Where do you get the data?</p>
      </div>
      <div class="answer">
        <p>
          We source our information primarily from the candidates' websites,
          campaign social media accounts, and news coverage.
        </p>
      </div>
      <div class="question">
        <p>
          I have another question not answered above.
        </p>
      </div>
      <div class="answer">
        <p>
          Shoot us a message. We would be happy to chat! &#9786;
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
.about {
  min-height: 100vh;
  position: relative;
  padding-top: 40px;
  padding-bottom: 120px;
  width: 1280px;
  margin: 0 auto;
}

.gradient-swoosh {
  position: absolute;
  top: 20px;
  left: -150px;
  z-index: -1;
  opacity: 0.3;
  // padding: 0;
  overflow: hidden;
}

.gradient-swoosh img {
  transform: rotate(180deg);
  width: 250vh;
  // -webkit-filter-mask: linear-gradient(to right, var(--blue), var(--red));
}

div .title h1 {
  text-align: center;
  font-size: 48px;
  padding-top: 60px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

.title h1 span.politi {
  font-family: "LoveloLineBold";
}

.title h1 span.track {
  font-family: "LoveloBlack";
}

.about-info {
  padding-left: 250px;
  padding-right: 250px;
  padding-bottom: 60px;
  padding-top: 20px;
}

.about-info h2 {
  font-size: 20px;
  font-weight: 400;
}

.faq {
  padding-left: 250px;
  padding-right: 250px;
}

.faq h1 {
  font-size: 30px;
  padding-bottom: 20px;
}

.faq div.question p {
  font-family: "Bai Jamjuree";
  font-weight: 600;
  font-size: 18px;
  padding-bottom: 12px;
  color: var(--primary-text);
}

.faq div.answer {
  padding-bottom: 36px;
}

.faq div.answer p {
  color: var(--secondary-text);
  font-weight: 300;
}
</style>
