<script>
  import debounce from "lodash-es/debounce";
  import { getCssClamp } from "@util";

  let { url } = $props();
  let results = $state([]);
  let loading = $state(false);
  let searchDisabled = $state(false);

  const size = 1.5;
  const clamp = getCssClamp(
    (Math.floor((size / 1.2) * 100) / 100) * 16,
    size * 16,
  );

  // const searchFetchOpts = {
  //   method: "POST",
  // };

  async function search(term) {
    if (term !== "") {
      loading = true;
      console.log(`searching for "${term}"`);
      const searchReq = await fetch(url);
      const result = await searchReq.json();
      console.log(result);
      loading = false;
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
      disabled={searchDisabled ? true : undefined}
      onkeyup={debounce((e) => search(e.target.value.trim()), 500)}
    />
  </div>
</section>
<section id="results">
  {#each results as r}
    <div>RESULT HERE</div>
  {/each}
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
</style>
