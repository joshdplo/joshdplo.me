<script>
  const defaultFontSize = "clamp(6.25rem, 34.4vw - 4.5rem, 17rem)";

  let {
    text = "JOSH",
    size = 15,
    link = null,
    header = true,
    alt = false,
  } = $props();
  const fontSize = header ? defaultFontSize : `${size}rem`;
</script>

{#if link}
  <a href={link} style="--font-size: {fontSize}" class:alt>
    {#each text as t, i}
      <span style="z-index: {text.length - i}">{t}</span>
    {/each}
  </a>
{:else}
  <h1 style="--font-size: {fontSize}" class:alt>
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

    position: relative;
    display: block;
    font-family: var(--ff-brand);
    line-height: 1;
    letter-spacing: -0.05em;
    font-size: var(--font-size);
    color: var(--font-color);
    padding-right: 0.1em;
    margin: 1rem 0;
    text-decoration: none;
    overflow: hidden;
  }

  span {
    position: relative;
    display: inline-block;
    text-shadow: 0.03em 0.03em 0 var(--c-primary);
    transition: padding 0.2s ease;
    backface-visibility: hidden;
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
