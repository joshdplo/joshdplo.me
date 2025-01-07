<script>
  import { onMount } from "svelte";
  import { debounce } from "lodash-es";
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

  let hasPreviousResults = $state(false);
  let lowestPageLoaded = $state(null);
  let highestPageLoaded = $state(null);
  let queryParamPage = $state(null);

  const size = 1.5;
  const clamp = getCssClamp(
    (Math.floor((size / 1.2) * 100) / 100) * 16,
    size * 16,
  );

  // Clear Search
  function clearSearch() {
    totalResults = 0;
    results = [];
    query = "";
    lastQuery = "";
    currentPage = 1;
    lowestPageLoaded = null;
    highestPageLoaded = null;
    queryParamPage = null;
    hasPreviousResults = false;
    input.focus();
    window.history.replaceState(
      {},
      "",
      `${window.location.origin}${window.location.pathname}`,
    );
  }

  // Do Search
  async function search(isLoadMore = false, isLoadPrevious = false) {
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
      if (!highestPageLoaded) highestPageLoaded = currentPage;

      if (isLoadMore === true) {
        results = [...results, ...data.results];
      } else if (isLoadPrevious === true) {
        results = [...data.results, ...results];
      } else {
        results = data.results;
      }

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

  // On Load
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.size > 0) {
      const queryVal = urlParams.get("search");
      const page = urlParams.get("page");
      if (queryVal && page && queryVal !== "") {
        query = queryVal;
        queryParamPage = parseInt(page, 10);
        hasPreviousResults = queryParamPage > 1;
        currentPage = queryParamPage;
        lowestPageLoaded = queryParamPage;

        search();
      }
    }
  });
</script>

<section class="contain">
  <div class="search-box" style={`--search-size: ${clamp}`}>
    <input
      type="text"
      placeholder="Enter search term..."
      id="search"
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
  {#if resultsShowing < totalResults && hasPreviousResults && lowestPageLoaded > 1}
    <button
      class="load-prev"
      onclick={() => {
        currentPage = lowestPageLoaded
          ? lowestPageLoaded - 1
          : queryParamPage - 1;
        lowestPageLoaded = currentPage;
        search(false, true);
      }}>Load Previous Page</button
    >
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
        if (queryParamPage) {
          currentPage = highestPageLoaded
            ? highestPageLoaded + 1
            : queryParamPage + 1;
          highestPageLoaded = currentPage;
        } else {
          currentPage++;
        }
        search(true, false);
      }}>Load Next Page</button
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
    margin: auto;
    width: 100%;

    @include util.mq(sm) {
      width: 70%;
    }

    input {
      border-width: 0.2em;
      font-size: var(--search-size);
      border-radius: 2rem;
      padding: 0.4em 0.6em;
      width: 100%;
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
      gap: 0.2em;
      padding: 0.35em 0;
      text-decoration: none;
      text-transform: capitalize;
      border-bottom: 1px solid var(--c-gray-dark);
      line-height: 1.2;

      &:nth-child(odd) {
        background-color: var(--content-subtler);
      }
    }

    span {
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
      padding: 0.3em 0.8em;
      border-style: solid;
      border-width: 0.25em;
      border-right: 0;
      border-top: 0;
      border-bottom: 0;
    }

    .load-more,
    .load-prev {
      margin: 1.8rem auto 0;
      padding: 0.35em 0.8em;
      border: 0.15em solid var(--font-color);
      border-radius: 2rem;
      line-height: 1;
    }

    .load-prev {
      margin: 0 auto 1.8rem;
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
