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

<style>
  .list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
  }
</style>
