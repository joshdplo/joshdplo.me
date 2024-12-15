<script>
  import { getCssClamp } from "$lib/util";

  let {
    text = "Null",
    subtext = null,
    size = 10,
    color = "secondary",
    link = null,
    alt = false,
    hasDescenders = false,
    capitalize = false,
  } = $props();

  const fontSize = $derived(
    getCssClamp(
      (Math.floor((size / (size > 12 ? 2.7 : 2.3)) * 100) / 100) * 16,
      size * 16,
    ),
  );
  const subtextSize = $derived(
    getCssClamp(
      (Math.floor((size / 10) * 100) / 100) * 16,
      (Math.floor((size / 5) * 100) / 100) * 16,
    ),
    // getCssClamp(Math.floor(size / 8) * 16, Math.floor(size / 5) * 16),
  );
  const styleString = $derived(
    `--font-size: ${fontSize};--text-shadow-color: var(--c-${color});`,
  );
  const subStyleString = $derived(
    `--subtext-size: ${subtextSize}; --subtext-color: var(--c-${color})`,
  );
</script>

<div class="wrapper">
  {#if link}
    <a href={link} style={styleString} class:alt class:hasDescenders>
      {#each text as t, i}
        <span
          style="z-index: {text.length - i};{i === 0 && capitalize
            ? 'text-transform: uppercase'
            : ''}">{t}</span
        >
      {/each}
    </a>
    {#if subtext}
      <i class="subtext" style={subStyleString}>{subtext}</i>
    {/if}
  {:else}
    <h1 style={styleString} class:alt class:hasDescenders>
      {#each text as t, i}
        <span
          style="z-index: {text.length - i};{i === 0 && capitalize
            ? 'text-transform: uppercase'
            : ''}">{t}</span
        >
      {/each}
    </h1>
    {#if subtext}
      <i class="subtext" style={subStyleString}>{subtext}</i>
    {/if}
  {/if}
</div>

<style lang="scss">
  @use "$lib/css/util";

  .wrapper {
    position: relative;
  }

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
    margin: 0 0 1rem;
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
    line-height: 1.25;
    margin-top: -0.1em;
  }

  a.alt span,
  h1.alt span {
    text-shadow: 0.03em 0.03em 0 var(--c-gray-dark);
  }

  a:not(.alt):hover {
    span:not(:nth-child(1)) {
      padding: 0 0.03em;
    }

    span:nth-child(1) {
      padding-right: 0.03em;
    }
  }

  .subtext {
    --subtext-size: 7rem;
    --subtext-color: var(--c-primary);

    position: absolute;
    right: -2em;
    bottom: 1.6em;
    font-style: normal;
    font-weight: bold;
    font-size: var(--subtext-size);
    line-height: 1;
    transform: rotate(-3deg);
    padding: 0.1em 0.2em;
    text-shadow: 0.03em 0.03em 0 var(--font-color-opposite);
    backdrop-filter: blur(0.2em);
    border: 0.07em dashed var(--font-color);
    z-index: 14;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--subtext-color);
      z-index: -1;
      opacity: 0.8;
    }

    @include util.mq(sm) {
      bottom: 1.3em;
    }
  }
</style>
