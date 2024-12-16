<script>
  import { page } from "$app/stores";

  let { links, color = "secondary", center = true } = $props();
  let hasDarkBg = color === "primary-darker" || color === "primary-dark"; // @TODO $derived? idk what im doing
</script>

<div class="page-menu" class:center style="--main-color: var(--c-{color})">
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
  @use "$lib/css/util";

  .page-menu {
    --main-color: var(--font-color);

    display: flex;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 0.1em dashed var(--c-gray);
    z-index: 12;

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
    background-color: var(--font-color-opposite);
    border: 0.3em double var(--main-color);
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
    padding: 0.2rem 0.75rem;
    color: var(--font-color);
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

  @include util.mq(sm) {
    .page-menu ul {
      border-radius: 1.5em;

      li:first-child a {
        border-top-left-radius: 1.5em;
        border-bottom-left-radius: 1.5em;
      }

      li:last-child a {
        border-top-right-radius: 1.5em;
        border-bottom-right-radius: 1.5em;
      }
    }
  }
</style>
