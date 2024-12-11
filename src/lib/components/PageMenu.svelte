<script>
  import { page } from "$app/stores";

  let { links, color = "secondary" } = $props();
  let hasDarkBg = color === "primary-darker" || color === "primary-dark"; // @TODO $derived? idk what im doing
</script>

<div class="page-menu" style="--main-color: var(--c-{color})">
  <ul>
    {#each links as l}
      <li>
        <a
          href={l.path}
          class:active={$page?.url?.pathname === l.path}
          class:darkBg={hasDarkBg}>{l.title}</a
        >
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .page-menu {
    --main-color: var(--font-color);

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
    border: 0.35rem double var(--main-color);
    border-radius: 1.5rem;
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
    background-color: var(--main-color);

    &.darkBg {
      color: var(--c-white);
    }
  }
</style>
