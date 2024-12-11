<script>
  import { page } from "$app/stores";

  let { links, color = "secondary", teeny = false, center = true } = $props();
  let hasDarkBg = color === "primary-darker" || color === "primary-dark"; // @TODO $derived? idk what im doing
</script>

<div
  class="page-menu"
  class:teeny
  class:center
  style="--main-color: var(--c-{color})"
>
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
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 0.1em dashed var(--font-color);

    &.teeny {
      border-bottom: 0;
      padding-bottom: 0;
      margin-bottom: 1rem;
    }

    &.center {
      justify-content: center;
    }
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

  .teeny a {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
  }

  .teeny ul {
    gap: 0.5em;
  }
</style>
