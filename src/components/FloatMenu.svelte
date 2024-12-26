<script lang="ts">
  import { NAV_LINKS } from "@constants";
  import SVG from "@components/SVG.svelte";

  let { currentPage } = $props();
  let hamburgerEl: HTMLElement;
  let isOpen = $state(false);

  // theme is set up through a small script in BaseLayout.astro
  // we just update the class + localStorage value here
  function themeClick() {
    const htmlEl = document.documentElement;
    const newTheme = htmlEl.classList.contains("theme-dark") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);

    htmlEl.classList.remove("theme-dark", "theme-light");
    htmlEl.classList.add(`theme-${newTheme}`);
  }
</script>

<svelte:document
  onkeydown={(e) => {
    if (e.key === "Escape" && isOpen) {
      isOpen = false;
    }
  }}
  onclick={(e) => {
    if (isOpen && e.target !== hamburgerEl) {
      isOpen = false;
    }
  }}
/>

<div class="wrapper contain">
  <div class="left">
    <button
      id="hamburger"
      aria-label="toggle visual navigation or continue tabbing"
      aria-controls="float-menu"
      aria-expanded={isOpen}
      bind:this={hamburgerEl}
      onclick={() => (isOpen = !isOpen)}
      onfocus={() => (isOpen ? (isOpen = false) : null)}
    >
      <SVG name="hamburger" />
    </button>
    <ul id="float-menu">
      {#each NAV_LINKS as l, i}
        {@const active =
          currentPage === l.path ||
          currentPage.split("/")[1] === l.path.split("/")[1]}
        <li>
          <a
            href={l.path}
            class:active
            onclick={() => {
              if (!active) isOpen = false;
            }}
            onfocus={() => (isOpen = true)}
            onblur={() => {
              i + 1 === NAV_LINKS.length ? (isOpen = false) : null;
            }}
            >{l.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="right">
    <button
      class="theme"
      aria-label="Switch Theme"
      title="Switch Theme"
      onclick={themeClick}
    >
      <SVG name="sun" />
      <SVG name="moon" />
    </button>
  </div>
</div>

<style lang="scss">
  @use "@css/util";

  .wrapper {
    position: fixed;
    display: flex;
    left: 50%;
    justify-content: space-between;
    width: 100%;
    transform: translateX(-50%);
  }

  .left,
  .right {
    position: relative;
    display: flex;
  }

  :global(svg) {
    position: relative;
    width: 1.7rem;
    pointer-events: none;
  }

  :global(svg path) {
    fill: var(--font-color);
  }

  button {
    padding: 0.5rem 0.6rem;
    background-color: var(--background);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;

    &:focus-visible {
      background-color: var(--c-accent);

      :global(svg path) {
        fill: var(--c-black);
      }
    }
  }

  #hamburger {
    padding: 0.25rem 0.4rem;
    cursor: pointer;

    :global(svg) {
      width: 2.7rem;
      border-radius: 0.5rem;
    }
  }

  #float-menu {
    position: absolute;
    left: 0.8rem;
    top: 88%;
    width: 15.625rem;
    height: auto;
    border: 0.8em double var(--page-color);
    border-radius: 0.75rem;
    border-top-left-radius: 0;
    color: var(--font-color);
    background-color: var(--font-color-opposite);
    font-size: 1.4rem;
    font-weight: bold;
    transform: scale(0);
    transform-origin: top left;
    transition: transform 0.22s ease;

    li + li a {
      border-top: 0;
    }

    a {
      position: relative;
      display: flex;
      padding: 0.25rem 1rem;
      text-decoration: none;
      border: 0.2em solid var(--font-color);
      background-color: transparent;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;

      &:after {
        content: "\21D1";
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%) rotate(90deg);
        font-size: 1.5em;
        color: var(--font-color-opposite);
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      &:not(.active):hover,
      &:focus-within {
        color: var(--c-black);
        background-color: var(--c-accent);
      }
    }

    .active {
      color: var(--font-color-opposite);
      background-color: var(--font-color);
      cursor: default;

      &:after {
        opacity: 1;
        transition-delay: 0.2s;
      }
    }
  }

  #hamburger[aria-expanded="true"] {
    :global(svg path) {
      fill: var(--page-color);
    }

    + #float-menu {
      transform: scale(1);
    }
  }
</style>
