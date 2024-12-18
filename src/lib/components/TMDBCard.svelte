<script>
  import { scale } from "svelte/transition";
  import { META } from "$lib/data";
  let { item, image, placeholder } = $props();

  // Helpers
  const isMovie = item.release_date;
  const genresMap = JSON.parse(
    META[0][isMovie ? "tmdbMovieGenres" : "tmdbTvGenres"],
  );

  // State
  let title = $derived(item.title || item.name);
  let released = $derived(
    (item.release_date || item.first_air_date).split("-")[0],
  );
  let favorite = $derived(item.rating !== null);
  let mega = $derived(item.mega);
</script>

<div class="card" class:placeholder class:mega class:favorite transition:scale>
  <enhanced:img src={image} alt="poster for {title}" loading="lazy" />
  <div class="info">
    <span class="title"
      >{title}<br />{` (${released}, ${item.original_language})`}</span
    >
    <div class="bottom">
      <a href="https://www.themoviedb.org/{isMovie ? 'movie' : 'tv'}/{item.id}"
        >View TMDB</a
      >
      <span class="genres">
        {#each JSON.parse(item.genre_ids) as i}
          <span>{genresMap[`${i}`]}</span>
        {/each}
      </span>
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/css/util";

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 130px;
    height: 195px;
    overflow: hidden;

    picture,
    img {
      height: 100%;
    }

    &:not(.placeholder):hover,
    &:not(.placeholder):focus-within {
      transform: scale(1.1);
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 1);
      z-index: 2;

      .info {
        z-index: 1;
      }

      img {
        filter: blur(4px);
      }
    }

    &.placeholder {
      width: 120px;
      height: 180px;
    }

    @include util.mq(sm) {
      width: 150px;
      height: 225px;

      &:not(.placeholder):hover,
      &:not(.placeholder):focus-within {
        transform: scale(1.15);
      }

      &.placeholder {
        width: 140px;
        height: 210px;
      }
    }
  }

  .info {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1;
    z-index: -1;
    background-color: var(--content-transparent);
    overflow-y: auto;

    .placeholder & {
      z-index: 1;
      background-color: var(--font-color-opposite);
      border-bottom: 0;
      border-left: 0;
    }

    .bottom {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: auto;
    }

    a {
      width: 100%;
      padding: 0.33rem 0 0.25rem;
      font-size: 0.8rem;
      text-align: center;
      border-radius: 1em;
      color: var(--c-black);
      background-color: var(--c-secondary);
      border: 0.1rem solid var(--font-color);
      text-decoration: none;
    }
  }

  .title {
    margin-bottom: 1em;
  }

  .genres {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.6rem;
    gap: 0.2rem;

    span {
      padding: 0.15rem 0.25rem 0.1rem;
      background-color: var(--font-color-opposite);
      border: 1px solid var(--font-color);
      border-radius: 1rem;
      font-weight: normal;
    }
  }

  .favorite::before,
  .favorite .info::before,
  .mega::before,
  .mega .info::before {
    content: "\2606";
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;
    font-size: 1.5rem;
    line-height: 1;
    color: var(--c-theme-gold);
    text-shadow: 0.03em 0.05em 0 var(--font-color);
  }
  .mega::before {
    content: "\2605";
  }
</style>
