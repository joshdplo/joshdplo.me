<script>
  // breadcrumbs by gideon maina
  // https://medium.com/@gmainapro/creating-breadcrumbs-in-astro-4c7280d599fa
  let { currentPage } = $props();
  const s = currentPage.split("/");

  function getBreadcrumbs() {
    if (currentPage.endsWith("/")) s.pop();

    let breadcrumbs = [];

    while (s.length > 2) {
      s.pop();
      breadcrumbs.push(s.join("/"));
    }
    return breadcrumbs;
  }

  const currentTitle =
    s[s.length - 1].length < 4 ? `Page ${s[s.length - 1]}` : s[s.length - 1];
  const breadcrumbs = getBreadcrumbs().reverse();
  const currentPageTitle = s[s.length - 1];
</script>

{#if breadcrumbs.length}
  <div class="breadcrumbs">
    <ul>
      {#each breadcrumbs as b, i}
        <li>
          <a href={b}>{b.split("/").pop()}</a> ˒
        </li>
        {#if i === breadcrumbs.length - 1}<li>
            <span>{currentTitle}</span>
          </li>{/if}
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  @use "@css/util";

  .breadcrumbs {
    margin-left: auto;
    background-color: var(--background);
    padding: 0 0.5em;
  }

  ul {
    font-size: 0.75rem;
    line-height: 1;
    position: relative;
    display: none;
    margin: auto;
    height: 100%;
    align-items: center;
    gap: 0.4rem;

    @include util.mq(sm) {
      display: flex;
    }
  }

  a,
  span {
    font-size: 0.75rem;
    line-height: 1;
    text-transform: uppercase;
    text-decoration: none;
  }

  a {
    padding-left: 0.3em;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    padding-left: 0.3em;
    pointer-events: none;
    opacity: 0.5;
  }
</style>
