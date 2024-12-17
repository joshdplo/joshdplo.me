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
      >{title}{` (${released}, ${item.original_language})`}</span
    >
    <span class="genres">
      {#each genresMap as m}
        {item.genre_ids.indexOf(m.id) && m.name}
      {/each}
    </span>
    <div class="overview"></div>
    <div class="bottom">
      <a href="https://www.themoviedb.org/{isMovie ? 'movie' : 'tv'}/{item.id}"
        >Go To TMDB</a
      >
    </div>
  </div>
</div>

<style lang="scss">
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 150px;

    &:hover,
    &:focus-within {
      transform: scale(1.7);
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 1);
      z-index: 2;

      .info {
        z-index: 1;
        border: 0;
      }

      img {
        filter: blur(3px);
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
    font-size: 0.7rem;
    line-height: 1;
    z-index: -1;
    background-color: var(--content-transparent);
    overflow-y: auto;

    .placeholder & {
      z-index: 1;
      background-color: var(--font-color-opposite);
      border: 1px dotted var(--font-color);
      border-bottom: 0;
      border-left: 0;
    }

    .bottom {
      margin-top: auto;
    }
  }

  .title {
    margin-bottom: 1em;
  }

  .favorite::before,
  .mega::before {
    content: "\2606";
    position: absolute;
    top: 0.15rem;
    right: 0.3rem;
    font-size: 1rem;
  }
  .mega::before {
    content: "\2605";
  }
</style>
