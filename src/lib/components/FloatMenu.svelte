<script lang="ts">
  import { page } from "$app/stores";

  let { links, color } = $props();
  let hamburgerEl: HTMLElement;
  let isOpen = $state(false);

  // theme is handled through a small script in app.html
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
      hamburgerEl.focus();
    }
  }}
  onclick={(e) => {
    if (
      isOpen &&
      e.target !== hamburgerEl &&
      !e?.target?.classList.contains("active")
    ) {
      isOpen = false;
      hamburgerEl.focus();
    }
  }}
/>

<!-- @TODO: implement noscript !!! -->
<!-- <noscript>
  <a href="#footer-nav" title="Jump to footer navigation">
    <span class="sr-only">Go to navigation</span>
    <svg
      aria-hidden="true"
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M13 16.745a.75.75 0 0 0-.75-.75h-9.5a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 .75-.75zm9-5a.75.75 0 0 0-.75-.75H2.75a.75.75 0 0 0 0 1.5h18.5a.75.75 0 0 0 .75-.75zm-4-5a.75.75 0 0 0-.75-.75H2.75a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 .75-.75z"
        fill-rule="nonzero"
      /></svg
    >
  </a>
</noscript> -->
<div class="wrapper contain" style="--menu-color: var(--c-{color})">
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
      <svg
        aria-hidden="true"
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M13 16.745a.75.75 0 0 0-.75-.75h-9.5a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 .75-.75zm9-5a.75.75 0 0 0-.75-.75H2.75a.75.75 0 0 0 0 1.5h18.5a.75.75 0 0 0 .75-.75zm-4-5a.75.75 0 0 0-.75-.75H2.75a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 .75-.75z"
          fill-rule="nonzero"
        /></svg
      >
    </button>
    <ul id="float-menu">
      {#each links as l, i}
        {@const active =
          $page.url.pathname === l.path ||
          $page.url.pathname.split("/")[1] === l.path.split("/")[1]}
        <li>
          <a
            href={l.path}
            class:active
            onclick={() => {
              if (!active) isOpen = false;
            }}
            onfocus={() => (isOpen = true)}
            onblur={() => {
              i + 1 === links.length ? (isOpen = false) : null;
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
      <svg
        class="show-dark"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.0943L21.1923 4.22183L19.7781 2.80762L16.9056 5.6801C17.4338 6.09071 17.9092 6.56608 18.3198 7.0943Z"
          fill="currentColor"
        />
      </svg>
      <svg
        class="show-light"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.2256 2.00253C9.59172 1.94346 6.93894 2.9189 4.92893 4.92891C1.02369 8.83415 1.02369 15.1658 4.92893 19.071C8.83418 22.9763 15.1658 22.9763 19.0711 19.071C21.0811 17.061 22.0565 14.4082 21.9975 11.7743C21.9796 10.9772 21.8669 10.1818 21.6595 9.40643C21.0933 9.9488 20.5078 10.4276 19.9163 10.8425C18.5649 11.7906 17.1826 12.4053 15.9301 12.6837C14.0241 13.1072 12.7156 12.7156 12 12C11.2844 11.2844 10.8928 9.97588 11.3163 8.0699C11.5947 6.81738 12.2094 5.43511 13.1575 4.08368C13.5724 3.49221 14.0512 2.90664 14.5935 2.34046C13.8182 2.13305 13.0228 2.02041 12.2256 2.00253ZM17.6569 17.6568C18.9081 16.4056 19.6582 14.8431 19.9072 13.2186C16.3611 15.2643 12.638 15.4664 10.5858 13.4142C8.53361 11.362 8.73568 7.63895 10.7814 4.09281C9.1569 4.34184 7.59434 5.09193 6.34315 6.34313C3.21895 9.46732 3.21895 14.5326 6.34315 17.6568C9.46734 20.781 14.5327 20.781 17.6569 17.6568Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</div>

<style lang="scss">
  @use "$lib/css/util";

  .wrapper {
    --menu-color: var(--c-primary);

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

  svg {
    position: relative;
    width: 1.7rem;
    pointer-events: none;
  }

  svg path {
    fill: var(--font-color);
  }

  button {
    padding: 0.5rem 0.6rem;
    background-color: var(--background);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;

    &:focus-visible {
      background-color: var(--c-accent);

      svg path {
        fill: var(--c-black);
      }
    }
  }

  #hamburger {
    padding: 0.25rem 0.4rem;
    cursor: pointer;

    svg {
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
    border: 0.8em double var(--menu-color);
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
        color 0.2s ease,
        border 0.2s ease;

      &:after {
        content: "\21AA";
        position: absolute;
        right: -2.25rem;
        top: -0.01rem;
        font-size: 1.5em;
        color: var(--font-color-opposite);
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      &:not(.active):hover,
      &:not(.active):focus-within {
        color: var(--c-black);
        background-color: var(--c-accent);
      }
    }

    .active {
      border-right-width: 2.5rem;
      cursor: default;

      &:after {
        opacity: 1;
        transition-delay: 0.2s;
      }
    }
  }

  #hamburger[aria-expanded="true"] {
    svg path {
      fill: var(--menu-color);
    }

    + #float-menu {
      transform: scale(1);
    }
  }

  // Media Queries
  // @include util.mq(sm) {
  // }
</style>
