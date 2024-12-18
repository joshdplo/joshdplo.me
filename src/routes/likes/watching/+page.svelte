<script lang="ts">
  import debounce from "lodash-es/debounce";
  import { slide } from "svelte/transition";
  import { globalState } from "$lib/state.svelte";
  import { MOVIES, SHOWS } from "$lib/data";
  import placeholderImg from "$lib/images/TMDBplaceholder.jpg?enhanced";
  import TmdbCard from "$lib/components/TMDBCard.svelte";

  // Glob import images for svelte enhanced images
  // https://svelte.dev/docs/kit/images#sveltejs-enhanced-img-Dynamically-choosing-an-image
  // @TODO: Use svelte-inview package to lazy load these better!!!
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
  let rawSearchTerm = $state("");
  let searchTerm = $state("");
  let movieFilter: string = $state("all");
  let showFilter: string = $state("all");
  let filteredMovies = $derived(filterMovies());
  let filteredShows = $derived(filterShows());

  // Show Images
  $effect(() => {
    const showImagesLS = localStorage.getItem("likesImages");
    if (showImagesLS && (showImagesLS === "true" || showImagesLS === "false"))
      showImages = JSON.parse(showImagesLS);
  });
  const updateShowImages = () => {
    showImages = !showImages;
    localStorage.setItem("likesImages", JSON.stringify(showImages));
  };

  // Searching
  const debouncedSearch = debounce((v) => {
    searchTerm = v;
  }, 450);
  $effect(() => {
    debouncedSearch(rawSearchTerm);
  });
  $effect(() => {
    if (searchTerm.trim() !== "" && searchTerm.trim().length >= 2) {
      movieFilter = "search";
      showFilter = "search";
    } else {
      movieFilter = "all";
      showFilter = "all";
    }
  });

  // Movie Filtering
  function setMovieFilter(newFilter: string) {
    movieFilter = newFilter;
  }

  function filterMovies() {
    switch (movieFilter) {
      case "all":
        return movies;
      case "favorite":
        return movies.filter((m) => m.rating !== null && !m.mega);
      case "mega":
        return movies.filter((m) => m.mega);
      case "search":
        return movies.filter(
          (m) => m.title.toLowerCase().indexOf(searchTerm) > -1,
        );
      default:
        return movies;
    }
  }

  // Show Filtering
  function setShowFilter(newFilter: string) {
    showFilter = newFilter;
  }

  function filterShows() {
    switch (showFilter) {
      case "all":
        return shows;
      case "favorite":
        return shows.filter((m) => m.rating !== null && !m.mega);
      case "mega":
        return shows.filter((m) => m.mega);
      case "search":
        return shows.filter(
          (m) => m.name.toLowerCase().indexOf(searchTerm) > -1,
        );
      default:
        return shows;
    }
  }

  // Global State
  globalState.pageColor = "secondary";
</script>

<svelte:head>
  <meta
    name="description"
    content="A list of the movies, tv shows, and videos I've watched"
  />
</svelte:head>

<section class="filters main center contain">
  <div class="filter-group">
    <input
      type="text"
      name="search-watching"
      id="search-watching"
      placeholder="Search..."
      bind:value={rawSearchTerm}
    />
  </div>
  <div class="filter-group">
    <button
      class="filter"
      aria-label="Toggle Images"
      data-active={showImages}
      onclick={() => updateShowImages()}
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

    <button
      class="filter"
      aria-label="Toggle Shows"
      data-active={showTv}
      onclick={() => (showTv = !showTv)}
    >
      <span>Shows</span>
      <i></i>
    </button>
  </div>
</section>

<section class="list-wrapper contain {!showImages ? 'placeholders' : ''}">
  {#if showMovies}
    <div transition:slide>
      <h2>Movies ({filteredMovies.length})</h2>
      <div class="filters push">
        <button
          class="filter"
          aria-label="Toggle Favorite Movies"
          data-active={movieFilter === "favorite"}
          onclick={() =>
            setMovieFilter(movieFilter === "favorite" ? "all" : "favorite")}
        >
          <span>Favorite</span>
          <i></i>
        </button>
        <button
          class="filter"
          aria-label="Toggle Mega Movies"
          data-active={movieFilter === "mega"}
          onclick={() =>
            setMovieFilter(movieFilter === "mega" ? "all" : "mega")}
        >
          <span>Mega</span>
          <i></i>
        </button>
      </div>
      <div class="list movies">
        {#each filteredMovies as movie}
          <TmdbCard
            item={movie}
            image={showImages ? tmdbImages[movie.id] : placeholderImg}
            placeholder={!showImages}
          />
        {/each}
      </div>
    </div>
  {/if}

  {#if showMovies && showTv}
    <div class="spacer-2"></div>
  {/if}

  {#if showTv}
    <div transition:slide>
      <h2>Shows ({filteredShows.length})</h2>
      <div class="filters push">
        <button
          class="filter"
          aria-label="Toggle Favorite Shows"
          data-active={showFilter === "favorite"}
          onclick={() =>
            setShowFilter(showFilter === "favorite" ? "all" : "favorite")}
        >
          <span>Favorite</span>
          <i></i>
        </button>
        <button
          class="filter"
          aria-label="Toggle Mega Shows"
          data-active={showFilter === "mega"}
          onclick={() => setShowFilter(showFilter === "mega" ? "all" : "mega")}
        >
          <span>Mega</span>
          <i></i>
        </button>
      </div>
      <div class="list shows">
        {#each filteredShows as show}
          <TmdbCard
            item={show}
            image={showImages ? tmdbImages[show.id] : placeholderImg}
            placeholder={!showImages}
          />
        {/each}
      </div>
    </div>
  {/if}

  {#if !showMovies && !showTv}
    <div class="spacer-3"></div>
    <h2 class="center-full">You turned it all off!</h2>
  {/if}
</section>

<style lang="scss">
  @use "$lib/css/util";

  .list-wrapper {
    position: relative;
    transition: 0.2s ease;
  }

  h2 {
    margin-bottom: 0.25rem;
  }

  // Filter Containers
  .filters {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    line-height: 1;
    gap: 1rem;

    &.main {
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }

    &.center {
      justify-content: center;
      align-items: center;
    }

    &.push {
      margin-bottom: 1rem;
    }

    @include util.mq(md) {
      flex-direction: row;
    }
  }

  .filter-group {
    position: relative;
    display: flex;
    gap: 1rem;
  }

  // Toggle Filter
  .filter {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    color: var(--font-color);
    font-size: 0.8rem;

    span {
      margin-bottom: 0.25rem;
    }

    i {
      position: relative;
      width: 100%;
      height: calc(0.7rem + 4px);
      border-radius: 1rem;
      border: 2px solid var(--font-color);

      &::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;
        width: 1rem;
        height: calc(100% - 2px);
        border-radius: 0.7rem;
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

  // List Container
  .list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);

    .placeholders & {
      gap: 12px;
      grid-template-columns: repeat(auto-fill, 140px);
    }
  }
</style>
