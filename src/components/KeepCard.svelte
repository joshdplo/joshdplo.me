<script lang="ts">
  import { formatDate } from "$lib/util";

  let { keep } = $props();
</script>

<a href="/keeps/{keep.slug}">
  <h3>{keep.title}</h3>
  <p>{keep.summary}</p>
  <div class="bottom">
    <small class="date">{formatDate(keep.updated || keep.date)}</small>
    {#each keep.tags as tag}<i>#{tag}</i>{/each}
  </div>
</a>

<style lang="scss">
  a {
    display: flex;
    flex-direction: column;
    border: 0.15em solid var(--c-quaternary);
    padding: 0.5rem;
    border-radius: 0.2em;
    font-size: 1rem;
    text-decoration: none;
    transition:
      color 0.2s ease,
      border-color 0.2s ease;

    &:hover,
    &:focus-visible {
      border-color: var(--font-color);
    }
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .bottom {
    margin-top: auto;
    border-top: 1px solid var(--c-gray);
    transition: border-color 0.2s ease;

    a:hover & {
      border-color: var(--c-quaternary);
    }
  }

  .date {
    margin-right: 0.5em;
  }

  i {
    display: inline-block;
    line-height: 1;
    font-size: 0.833rem;
    margin-right: 0.5em;
  }
</style>
