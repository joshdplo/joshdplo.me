<script>
  import { MOVIES, SHOWS } from "$lib/data";

  // Glob import images for svelte enhanced images
  // https://svelte.dev/docs/kit/images#sveltejs-enhanced-img-Dynamically-choosing-an-image
  const tmdbImages = {};
  const tmdbRawImages = import.meta.glob(
    "slurpiImages/tmdb/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}",
    {
      eager: true,
      query: {
        enhanced: true,
      },
    },
  );
  for (let [_path, module] of Object.entries(tmdbRawImages)) {
    const id = _path
      .split("/")
      [_path.split("/").length - 1].replace(".jpg", "");
    tmdbImages[id] = module.default;
  }

  let showMovies = $state(true);
  let showTv = $state(true);
  let showSpotifySongs = $state(true);
  let showSpotifyArtists = $state(true);
  let showGames = $state(true);
</script>

<svelte:head>
  <meta name="description" content="A summary of the things Josh likes" />
</svelte:head>

<section class="mega-likes">
  {#if showMovies}
    <div class="category movies">
      {#each MOVIES as movie}
        {#if movie.mega}
          <div class="box">
            <enhanced:img
              src={tmdbImages[movie.id]}
              alt="movie poster for {movie.title}"
              loading="lazy"
            />
            <div class="info">
              <div class="title">{movie.title} ({movie.release_date})</div>
              <div class="released"></div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/if}

  {#if showTv}
    <div class="category shows">
      {#each SHOWS as show}
        {#if show.rating}
          <div class="box">
            <enhanced:img
              src={tmdbImages[show.id]}
              alt="movie poster for {show.name}"
              loading="lazy"
            />
            <div class="info">
              <div class="title">{show.name} ({show.first_air_date})</div>
              <div class="released"></div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</section>

<style lang="scss">
  .mega-likes {
    padding: 0 var(--site-padding);
  }

  .category {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    gap: 0;
    justify-content: center;
    align-items: center;
  }

  .box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  picture {
    position: relative;
    transition: 0.1s ease;
  }

  .info {
    position: absolute;
    width: 150px;
    height: 100%;
    padding: 0.5rem;
    font-size: 0.8rem;
    background: var(--background);
    color: var(--font-color);
    border: 0.2em solid var(--font-color);
    opacity: 0;
    transform: scale(1);
    backface-visibility: hidden;
    transition: 0.1s ease;
    z-index: 2;
  }

  .box:hover {
    picture {
      filter: blur(4px);
    }

    .info {
      opacity: 0.9;
      transform: scale(1.2);
    }
  }

  .title {
    font-weight: bold;
    line-height: 1.1;
    margin-bottom: 0.15rem;
  }
</style>
