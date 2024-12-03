<script>
  const defaultFontSize = "clamp(4.375rem, 38.55vw - 7.672rem, 17rem)";

  let { text = "JOSH", size = 15, link = null } = $props();
  const fontSize = link ? defaultFontSize : `${size}rem`;
</script>

{#if link}
  <a href={link} style="--font-size: {fontSize}">
    {#each text as t}
      <span>{t}</span>
    {/each}
  </a>
{:else}
  <div style="--font-size: {size}rem">
    {#each text as t}
      <span>{t}</span>
    {/each}
  </div>
{/if}

<style lang="scss">
  @use "$lib/css/util";

  a,
  div {
    --font-size: 15rem;

    position: relative;
    display: block;
    font-family: var(--ff-brand);
    line-height: 1;
    letter-spacing: -0.05em;
    font-size: var(--font-size);
    color: var(--font-color);
    padding-right: 0.15em;
    margin: 1rem 0;
    text-decoration: none;
    overflow: hidden;
  }

  span {
    position: relative;
    display: inline-block;
    text-shadow: 0.04em 0.04em 0 var(--c-primary);
    transition: padding 0.2s ease;
    backface-visibility: hidden;

    @include util.mq(md) {
      text-shadow: 0.03em 0.03em 0 var(--c-primary);
    }
  }

  a:hover {
    span:not(:nth-child(1)) {
      padding: 0 0.03em;
    }

    span:nth-child(1) {
      padding-right: 0.03em;
    }
  }

  /**
   * Logo Helpers
   */
  $letters: 4;

  // span z-indexes
  @for $i from $letters through 1 {
    .logo span:nth-child(#{$i}) {
      z-index: #{$letters - $i};
    }
  }
</style>
