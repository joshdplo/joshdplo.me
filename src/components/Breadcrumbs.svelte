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
    s[s.length - 1].length === 1 ? `Page ${s[s.length - 1]}` : s[s.length - 1];
  const breadcrumbs = getBreadcrumbs().reverse();
  const currentPageTitle = s[s.length - 1];
</script>

{#if breadcrumbs.length}
  <ul>
    {#each breadcrumbs as b, i}
      <li>
        <a href={b}>{b.split("/").pop()}</a> ˒
        {#if i === breadcrumbs.length - 1}<span>{currentTitle}</span>{/if}
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  @use "@css/util";

  ul {
    font-size: 0.75rem;
    line-height: 1;
    position: relative;
    display: none;
    margin: auto;
    height: 100%;
    align-items: center;

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
    pointer-events: none;
    opacity: 0.5;
  }
</style>
