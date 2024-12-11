<script>
  import { getCssClamp } from "$lib/util";

  let {
    text = "JOSH",
    size = 12,
    color = "secondary",
    link = null,
    alt = false,
    hasDescenders = false,
  } = $props();

  const fontSize = getCssClamp(
    (Math.floor((size / (size > 12 ? 2.7 : 2.3)) * 100) / 100) * 16,
    size * 16,
  );
</script>

{#if link}
  <a
    href={link}
    style="--font-size: {fontSize}; --text-shadow-color: var(--c-{color});"
    class:alt
    class:hasDescenders
  >
    {#each text as t, i}
      <span style="z-index: {text.length - i}">{t}</span>
    {/each}
  </a>
{:else}
  <h1
    style="--font-size: {fontSize}; --text-shadow-color: var(--c-{color});"
    class:alt
    class:hasDescenders
  >
    {#each text as t, i}
      <span style="z-index: {text.length - i}">{t}</span>
    {/each}
  </h1>
{/if}

<style lang="scss">
  @use "$lib/css/util";

  a,
  h1 {
    --font-size: 15rem;
    --text-shadow-color: var(--c-primary);

    position: relative;
    display: block;
    font-family: var(--ff-brand);
    line-height: 1;
    letter-spacing: -0.05em;
    font-size: var(--font-size);
    color: var(--font-color);
    padding: 0 0.1em;
    margin: 1rem 0;
    text-decoration: none;
    overflow: hidden;
  }

  span {
    position: relative;
    display: inline-block;
    text-shadow: 0.03em 0.03em 0 var(--text-shadow-color);
    transition: padding 0.2s ease;
    backface-visibility: hidden;
  }

  a.hasDescenders,
  h1.hasDescenders {
    line-height: 1.5;
    margin-top: -0.1em;
  }

  a.alt span,
  h1.alt span {
    text-shadow: 0.03em 0.03em 0 var(--c-gray-dark);
  }

  a:hover {
    span:not(:nth-child(1)) {
      padding: 0 0.03em;
    }

    span:nth-child(1) {
      padding-right: 0.03em;
    }
  }
</style>
