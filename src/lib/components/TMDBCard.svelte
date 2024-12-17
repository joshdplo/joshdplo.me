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
    <a href="https://www.themoviedb.org/{isMovie ? 'movie' : 'tv'}/{item.id}"
      >Go To TMDB</a
    >
    <span class="genres">
      {#each JSON.parse(item.genre_ids) as i}
        <span>{genresMap[`${i}`]}</span>
      {/each}
    </span>
  </div>
</div>

<style lang="scss">
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 225px;
    overflow: hidden;

    &:hover,
    &:focus-within {
      transform: scale(1.5);
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

    &.placeholder {
      width: 140px;
      height: 210px;
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
  }

  .title {
    margin-bottom: 1em;
  }

  .genres {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-top: auto;
    font-size: 0.8rem;
    gap: 0.2rem;

    span {
      padding: 0.15rem 0.2rem;
      background-color: var(--content-subtle);
    }
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
