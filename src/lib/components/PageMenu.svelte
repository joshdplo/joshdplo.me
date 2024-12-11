<script>
  import { page } from "$app/stores";

  let { links } = $props();
</script>

<div class="page-menu">
  <ul>
    {#each links as l}
      <li>
        <a href={l.path} class:active={$page.url.pathname === l.path}
          >{l.title}{l.amount ? ` (${l.amount})` : ""}</a
        >
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .page-menu {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .page-menu ul {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
  }

  li,
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    padding: 0.3rem 1rem;
    color: var(--font-color);
    background-color: var(--font-color-opposite);
    border: 0.35rem double var(--c-secondary);
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    transition:
      color 0.2s ease,
      background-color 0.2s ease;

    &:not(.active):hover,
    &:not(.active):focus-within {
      background-color: var(--c-accent);
      color: var(--c-black);
    }
  }

  .active {
    color: var(--c-black);
    background-color: var(--c-secondary);
  }
</style>
