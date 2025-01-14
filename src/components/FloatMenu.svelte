<script lang="ts">
  import { NAV_LINKS } from "@constants";
  import SVG from "@components/SVG.svelte";
  import Breadcrumbs from "@components/Breadcrumbs.svelte";

  let { currentPage, noBreadcrumbs } = $props();
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

<div class="contain">
  <nav>
    <button
      id="hamburger"
      title="Menu"
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
    <a
      href="/"
      title="Home"
      class="button home"
      class:active={currentPage === "/"}
    >
      <span class="sr-only">Home</span>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        ><path
          d="M13 23l-9.983-.014v-9.979l8.974-7.995c1.124.999 2.25 1.998 3.378 2.998l2.255 1.999c1.127.999 2.252 1.992 3.376 2.991v10l-5.993-.014-.007-4.986h-2v5zm6-2l.019-7.121-7.028-6.193-6.991 6.218v7.096h6v-5h6v5h2zm-10-5v3h-2v-3h2zm3-15l12 10.654-1.328 1.494-10.672-9.488-10.672 9.488-1.328-1.494 12-10.654z"
        /></svg
      ></a
    >
    <a
      href="/search"
      title="Search"
      class="button search"
      class:active={currentPage === "/search"}
    >
      <span class="sr-only">Search</span>
      <SVG name="search" />
    </a>
    {#if noBreadcrumbs !== true}<Breadcrumbs {currentPage} />{/if}
    <button
      class="theme"
      aria-label="Switch Theme"
      title="Switch Theme"
      onclick={themeClick}
    >
      <SVG name="sun" />
      <SVG name="moon" />
    </button>
  </nav>
</div>

<style lang="scss">
  @use "@css/util";

  .contain {
    position: fixed;
    display: flex;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    // background-color: var(--background);
    transition: background-color 0.2s ease-in;
    @include util.zindex(nav);
  }

  nav {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;

    :global(svg) {
      position: relative;
      width: 1.7rem;
      pointer-events: none;
    }

    :global(svg path) {
      fill: var(--font-color);
    }

    .theme {
      margin-left: auto;
    }
  }

  .button,
  button {
    padding: 0.5rem 0.6rem;
    background-color: var(--background);

    &:focus-visible {
      background-color: var(--c-accent);

      :global(svg path) {
        fill: var(--c-black);
      }
    }
  }

  .button.active {
    :global(svg path) {
      fill: var(--page-color);
    }
  }

  #hamburger {
    padding: 0.25rem 0.4rem 0.25rem 0.2rem;
    cursor: pointer;

    :global(svg) {
      width: 2.7rem;
      border-radius: 0.5rem;
    }
  }

  #hamburger:focus-visible,
  .theme:focus-visible {
    background-color: var(--c-accent);
  }

  .home svg {
    bottom: 2px;
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
        right: 0.75rem;
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
      padding-right: 2.25em;
      color: var(--font-color-opposite);
      background-color: var(--font-color);

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
