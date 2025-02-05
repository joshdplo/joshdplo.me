<script>
  import { FOOTER_LINKS, META } from "@constants";
  import { formatDate } from "@util";
  import HeroText from "@components/HeroText.svelte";
  import SVG from "@components/SVG.svelte";
</script>

<footer id="footer-main" class="contain">
  <i class="top contain"></i>
  <nav id="footer-nav">
    {#each FOOTER_LINKS as parent}
      <ul>
        {#if parent.heading}<li class="heading">{parent.heading}</li>{/if}
        {#each parent.links as link}
          <li><a href={link.path}>{link.title}</a></li>
        {/each}
      </ul>
    {/each}
  </nav>
  <div class="copy">
    <HeroText text="JOSH" size={5} link="/" alt={true} />
    <div class="copy_links">
      <span>&copy; 2025 joshdplo.me</span>
      <a
        href="https://github.com/joshdplo/joshdplo.me"
        title="View Code on Github"
        aria-label="View Code on Github"
      >
        <SVG name="github" />
        View on Github
      </a>

      <span
        >Last built {formatDate(
          "" + new Date(META.buildHistory.dates[0]),
        )}</span
      >
    </div>
  </div>
</footer>

<style lang="scss">
  @use "@css/util";

  #footer-main {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    margin-top: 3em;
    padding-bottom: 2rem;

    @include util.mq(sm) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  .top {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    border-top: 0.1em dashed var(--content-subtle);
  }

  #footer-nav {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-top: 1.75rem;
    line-height: 1.2;

    .heading {
      font-weight: bold;
      padding-bottom: 0.2em;
      border-bottom: 1px dotted var(--content-subtle);
    }

    a,
    li {
      font-size: 1.1rem;
      display: block;
      text-align: center;
    }

    a {
      padding: 0.2em 0;
      text-decoration: none;
      border-bottom: 1px solid var(--content-subtler);

      &:hover {
        text-decoration: underline;
      }
    }

    @include util.mq(sm) {
      flex-direction: row;
      flex-wrap: wrap;

      .heading {
        border: none;
      }

      a,
      li {
        text-align: left;
      }

      a {
        text-decoration: underline;
        border: none;
      }
    }
  }

  .copy {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding-top: 1.75rem;

    &_links {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.45rem;
      margin-top: 0.5rem;
      font-size: 1rem;
      line-height: 1;
    }

    :global(a) {
      text-decoration: none;
      margin-bottom: 0;
      line-height: 1;
    }

    a[aria-label] {
      display: block;
      font-size: 1rem;
    }

    :global(svg) {
      position: relative;
      top: -1px;
      height: 0.9rem;
      margin-right: 2px;
    }

    @include util.mq(sm) {
      margin-left: auto;
      align-items: flex-end;
      padding-top: 1.3rem;

      &_links {
        margin-top: auto;
      }
    }
  }
</style>
