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
        consumers alike. Our campaign tracking map compiles campaign events from
        the two major party candidates, their immediate family members, and
        their vice presidential nominees. We track where and when these events
        take place and who is involved throughout the campaign cycle so you can
        stay informed about campaign strategies and how they evolve during the
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
          United States general election. We compile date and location data, as
          well as any pertinent data available about the audience, subject
          matter, and guests present for each of these events.
        </p>
      </div>
      <div class="question">
        <p>Which events are included?</p>
      </div>
      <div class="answer">
        <p>
          We include campaign events tied to specific locations (i.e. not open,
          national virtual events) attended by a) the presidential candidate, b)
          their immediate family members, c) their vice presidential candidate
          and immediate family members. To see events attended by the candidates
          themselves only, click the settings button and select "Candidates
          Only".
        </p>
      </div>
      <div class="question">
        <p>What is a "campaign event"?</p>
      </div>
      <div class="answer">
        <p>
          We define a campaign event as a public event in which a candidate or
          candidate's representives (such as a vice presidential nominee or
          immediate family member) and prospective voters are present. This
          includes events such as rallies, speeches, townhalls, roundtable
          converssations, tours, visits, and parades. At this time, we do not
          consider media interviews, social media livestreams, national
          virtual-only events, or official government business as campaign
          events for the purpose of this tracker.
        </p>
      </div>
      <div class="question">
        <p>When did you start tracking campaign events?</p>
      </div>
      <div class="answer">
        <p>
          Our data begins June 1, 2020 and continues through the end of the 2020
          general election cycle (November 3, 2020). We track campaign events
          for the general election and do not include primary campaign events.
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
          Please send us any information on the campaign event in question, and
          we will take a look as soon as possible.
        </p>
      </div>
      <div class="question">
        <p>Where do you get the campaign stop data?</p>
      </div>
      <div class="answer">
        <p>
          We source our campaign information primarily from the candidates'
          campaign websites, social media accounts, and locaal and national news
          coverage.
        </p>
      </div>
      <div class="question">
        <p>What do the colors on the map mean?</p>
      </div>
      <div class="answer">
        <p>
          The colors denote "Likeliness to Win" polling data. You can see what
          each color means by looking at the key next to the map. To enable high
          contrast colors, click the settings button and find "High Contrast
          Colors".
        </p>
      </div>
      <div class="question">
        <p>Where do you get the "Likeliness to Win" polling data?</p>
      </div>
      <div class="answer">
        <p>
          We source this data from FiveThirtyEight. We use the "Chance of
          Winning" data from their 2020 General Election Forecast, which is
          shown as a percentage for each candidate. You can find their forecast
          <a href="https://projects.fivethirtyeight.com/2020-election-forecast/"
            >here</a
          >.<br /><br /><i
            >Please note that the percentages we are using in the map are each
            candidate's likeliness to win that state, not their expected popular
            vote result.</i
          >
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
  max-width: 1280px;
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
  font-size: 16px;
}

.faq a {
  text-decoration: underline;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .about-info,
  .faq {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
