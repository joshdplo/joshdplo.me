<script>
  import { MOVIES, SHOWS } from "$lib/data";
  import placeholderImg from "$lib/images/TMDBplaceholder.jpg?enhanced";
  import TmdbCard from "$lib/components/TMDBCard.svelte";

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

  // State
  let showImages = $state(false);
  let showMovies = $state(true);
  let showTv = $state(true);
  let movies = $state(MOVIES);
  let shows = $state(SHOWS);

  // Rated (favorites)
  function filterRatedMovies() {
    movies = movies.filter((m) => m.rating !== null);
  }

  function filterRatedShows() {
    shows = shows.filter((s) => s.rating !== null);
  }

  // Mega
  function filterMegaMovies() {
    movies = movies.filter((m) => m.mega !== null);
  }

  function filterMegaShows() {
    shows = shows.filter((s) => s.mega !== null);
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="A list of the movies, tv shows, and videos I've watched"
  />
</svelte:head>

<section class="filters">
  <button
    class="filter"
    aria-label="Toggle Images"
    data-active={showImages}
    onclick={() => (showImages = !showImages)}
  >
    <span>Images</span>
    <i></i>
  </button>

  <button
    class="filter"
    aria-label="Toggle Movies"
    data-active={showMovies}
    onclick={() => (showMovies = !showMovies)}
  >
    <span>Movies</span>
    <i></i>
  </button>
</section>

<section class="contain">
  {#if showMovies}
    <h2>Movies</h2>
    <div class="list movies">
      {#each movies as movie}
        <TmdbCard
          item={movie}
          image={showImages ? tmdbImages[movie.id] : placeholderImg}
        />
      {/each}
    </div>
  {/if}

  {#if showTv}
    <h2>Shows</h2>
    <div class="list shows">
      {#each shows as show}
        <TmdbCard
          item={show}
          image={showImages ? tmdbImages[show.id] : placeholderImg}
        />
      {/each}
    </div>
  {/if}
</section>

<style lang="scss">
  @use "$lib/css/util";

  .filters {
    position: sticky;
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    line-height: 1;
    gap: 0.5rem;
    @include util.zindex(pageSticky);
  }

  .filter {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background);
    padding: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    font-size: 0.85rem;

    span {
      margin-bottom: 2px;
    }

    i {
      position: relative;
      width: 2.5rem;
      height: calc(1rem + 4px);
      border-radius: 1rem;
      border: 1px solid var(--font-color);

      &::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;
        width: 1rem;
        height: 1rem;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        background-color: var(--c-gray-dark);
        transition: 0.2s ease;
      }
    }

    &[data-active="true"] {
      i::before {
        background-color: var(--c-status-success);
        left: calc(100% - (1rem + 1px));
      }
    }
  }

  .list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, 150px);
    justify-content: center;
  }
</style>
