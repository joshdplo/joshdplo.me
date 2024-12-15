<script>
  import HeroText from "$lib/components/HeroText.svelte";

  let { links } = $props();
</script>

<footer id="footer-main" class="contain">
  <i class="top"></i>
  <nav id="footer-nav">
    <ul class="left">
      {#each links as l}
        <li><a href={l.path}>{l.title}</a></li>
      {/each}
    </ul>
  </nav>
  <div class="right">
    <HeroText text="JOSH" size={5} link="/" alt={true} />
    <a
      href="https://github.com/joshdplo/joshdplo.me"
      title="View Code on Github"
      aria-label="View Code on Github"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          fill="currentColor"
        />
      </svg>
      <small>View on Github</small>
    </a>
    <small>&copy; 2024 joshdplo.me</small>
  </div>
</footer>

<style lang="scss">
  #footer-main {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 4em;
    padding-bottom: 2rem;
  }

  .top {
    position: absolute;
    top: 0;
    left: var(--site-padding);
    width: calc(100% - var(--site-padding) * 2);
    height: 0.1em;
    border-top: 0.1em dashed var(--font-color);
  }

  .left,
  .right {
    padding-top: 2rem;
    position: relative;
    display: flex;
  }

  .left {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .right {
    flex-direction: column;
    align-items: flex-end;

    :global a {
      text-decoration: none;
      margin-bottom: 0;
    }

    svg {
      height: 1rem;
    }
  }
</style>
