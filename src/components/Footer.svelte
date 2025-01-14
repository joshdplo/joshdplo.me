<script>
  import { NAV_LINKS, SITE } from "@constants";
  import HeroText from "@components/HeroText.svelte";
  import SVG from "@components/SVG.svelte";
</script>

<footer id="footer-main" class="contain">
  <i class="top"></i>
  <nav id="footer-nav">
    <ul class="left">
      {#each NAV_LINKS as l}
        <li><a href={l.path}>{l.title}</a></li>
      {/each}
    </ul>
  </nav>
  <div class="right">
    <HeroText text={SITE.TITLE} size={5} link="/" alt={true} />
    <small>&copy; 2025 {SITE.TITLE}</small>
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
    border-top: 0.1em dashed var(--content-subtle);
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

    :global(a) {
      text-decoration: none;
      margin-bottom: 0;
    }

    :global(svg) {
      height: 1rem;
    }
  }
</style>
