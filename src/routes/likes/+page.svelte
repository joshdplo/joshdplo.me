<script>
  import { globalState } from "$lib/state.svelte";
  import {
    NUM_MOVIES,
    NUM_SHOWS,
    NUM_STEAM_GAMES,
    NUM_SPOTIFY_SONGS,
    NUM_SPOTIFY_ALBUMS,
    NUM_SPOTIFY_ARTISTS,
    NUM_SPOTIFY_SHOWS,
  } from "$lib/data";

  import CountUp from "$lib/components/CountUp.svelte";

  // Global State
  globalState.pageColor = "secondary";
</script>

<svelte:head>
  <meta name="description" content="A summary of the things Josh likes" />
</svelte:head>

<section class="wrapper contain">
  <div class="counters">
    <div class="counter movies">
      <span class="title">Movies: </span>
      <CountUp value={NUM_MOVIES} />
    </div>

    <div class="counter shows">
      <span class="title">Shows: </span>
      <CountUp value={NUM_SHOWS} />
    </div>

    <div class="counter games">
      <span class="title">Games: </span>
      <CountUp value={NUM_STEAM_GAMES} />
    </div>

    <div class="counter songs">
      <span class="title">Songs: </span>
      <CountUp value={NUM_SPOTIFY_SONGS} />
    </div>

    <div class="counter albums">
      <span class="title">Albums: </span>
      <CountUp value={NUM_SPOTIFY_ALBUMS} />
    </div>

    <div class="counter artists">
      <span class="title">Artists: </span>
      <CountUp value={NUM_SPOTIFY_ARTISTS} />
    </div>

    <div class="counter podcasts">
      <span class="title">Podcasts: </span>
      <CountUp value={NUM_SPOTIFY_SHOWS} />
    </div>
  </div>
  <div class="content"></div>
</section>

<style lang="scss">
  @use "$lib/css/util";

  .wrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .counters {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;
  }

  .counter {
    position: relative;
    font-size: 0.8rem;
  }

  // Responsive
  @include util.mq(md) {
    .wrapper {
      justify-content: flex-start;
    }
    .counters {
      flex-direction: column;
      font-size: 1rem;
      margin-top: 3rem;
    }
  }
</style>
