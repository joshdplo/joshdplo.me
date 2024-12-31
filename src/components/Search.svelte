<script>
  import debounce from "lodash-es/debounce";
  import {
    getCssClamp,
    getPageColorFromCategory,
    getEmojiFromCategory,
  } from "@util";

  let { url } = $props();
  let input;
  let searchDisabled = $state(false);
  let loading = $state(false);
  let results = $state([]);
  let currentPage = $state(1);
  let resultsShowing = $derived(results.length);
  let totalResults = $state(0);
  let query = $state("");
  let noResults = $state(false);
  let lastQuery = $state("");

  const size = 1.5;
  const clamp = getCssClamp(
    (Math.floor((size / 1.2) * 100) / 100) * 16,
    size * 16,
  );

  function clearSearch() {
    totalResults = 0;
    results = [];
    query = "";
    lastQuery = "";
    currentPage = 1;
    input.focus();
  }

  async function search(isLoadMore = false) {
    if (query !== "" && query.length > 2) {
      // do search fetch
      loading = true;
      const searchReq = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          page: currentPage,
        }),
      });
      const data = await searchReq.json();

      // update state & replace history
      totalResults = data.total;
      noResults = totalResults === 0;
      lastQuery = noResults ? query : "";
      isLoadMore === true
        ? (results = [...results, ...data.results])
        : (results = data.results);
      loading = false;
      window.history.replaceState(
        {},
        "",
        `${window.location.origin}${window.location.pathname}?search=${query.trim().toLowerCase()}&page=${currentPage}`,
      );
    } else {
      loading = false;
    }
  }
</script>

<section class="contain">
  <div class="search-box" style={`--search-size: ${clamp}`}>
    <input
      type="text"
      placeholder="Enter search term..."
      id="search"
      autofocus
      bind:this={input}
      bind:value={query}
      disabled={searchDisabled ? true : undefined}
      onkeyup={debounce((e) => search(e.target.value.trim()), 500)}
    />
  </div>
</section>
<section id="results" class="contain">
  <div class="loader" class:active={loading}></div>
  {#if totalResults > 0}
    <div class="head">
      {totalResults} Results
      <button onclick={() => clearSearch()} title="Clear search">clear</button>
    </div>
    <i class="spacer-1"></i>
  {/if}
  {#each results as r}
    <a href={`${r.path}?search=${r.id}&cat=${r.category}`}>
      <span class={`border-${getPageColorFromCategory(r.category)}`}
        >{r.category} {getEmojiFromCategory(r.category)}</span
      >
      {r.phrase}
    </a>
  {/each}
  {#if resultsShowing < totalResults}
    <button
      class="load-more"
      onclick={() => {
        currentPage++;
        search(true);
      }}>Load More</button
    >
  {/if}
  {#if noResults && query !== ""}
    <div class="no-results">No Results for {lastQuery}</div>
  {/if}
</section>

<style lang="scss">
  @use "@css/util";

  .search-box {
    position: relative;
    display: flex;
    justify-content: center;

    input {
      border-width: 0.2em;
      font-size: var(--search-size);
      border-radius: 2rem;
      padding: 0.4em 0.6em;
      width: 75%;

      @include util.mq(sm) {
        width: 55%;
      }
    }
  }

  #results {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1.5rem;

    .head {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;

      button {
        font-size: 0.7rem;
        font-weight: bold;
        line-height: 1;
        padding: 0.25em 0.5em;
        border: 0.1em solid var(--font-color);
        border-radius: 1rem;
        text-transform: uppercase;
      }
    }

    a {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.8em;
      padding: 0.2em 0;
      text-decoration: none;
      text-transform: capitalize;
      border-bottom: 1px solid var(--c-gray-dark);

      &:nth-child(odd) {
        background-color: var(--content-subtler);
      }
    }

    span {
      font-size: 0.7rem;
      font-weight: bold;
      text-transform: uppercase;
      padding: 0.3em 0.8em;
      border-style: solid;
      border-width: 0.25em;
      border-right: 0;
      border-top: 0;
      border-bottom: 0;
    }

    .load-more {
      margin: 1.8rem auto 0;
      padding: 0.35em 0.8em;
      border: 0.15em solid var(--font-color);
      border-radius: 2rem;
      line-height: 1;
    }
  }

  // pokeball loader (#20)
  // https://css-loaders.com/wobbling/
  .loader {
    --graphic-width: 60px;

    position: absolute;
    left: calc(50% - (var(--graphic-width) / 2));
    top: 0;
    height: var(--graphic-width);
    aspect-ratio: 1;
    margin: 2rem auto;
    pointer-events: none;
    opacity: 0;
    transform: scale(0);
    transition:
      opacity 2s ease,
      transform 1s ease;
    @include util.zindex(loader);

    &.active {
      opacity: 1;
      transform: scale(1);

      &::after {
        animation: l20 1s infinite cubic-bezier(0.5, 120, 0.5, -120);
      }
    }

    &::before {
      content: "Loading";
      position: absolute;
      top: 103%;
      left: -4px;
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      transform-origin: bottom;
      background:
        radial-gradient(at 75% 15%, #fffb, #0000 35%),
        radial-gradient(at 80% 40%, #0000, #0008),
        radial-gradient(circle 5px, #fff 94%, #0000),
        radial-gradient(circle 10px, #000 94%, #0000),
        linear-gradient(#f93318 0 0) top / 100% calc(50% - 5px),
        linear-gradient(#fff 0 0) bottom/100% calc(50% - 5px) #000;
      background-repeat: no-repeat;
    }
  }

  @keyframes l20 {
    30%,
    70% {
      transform: rotate(0deg);
    }
    49.99% {
      transform: rotate(0.2deg);
    }
    50% {
      transform: rotate(-0.2deg);
    }
  }
</style>
