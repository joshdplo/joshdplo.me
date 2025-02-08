<script>
  import { getCssClamp } from "@util";

  let { url } = $props();

  let nameInput;
  let name = $state("");
  let emailInput;
  let email = $state("");
  let textInput;
  let text = $state("");
  let disabled = $state(false);
  let loading = $state(false);
  let hasError = $state(false);

  const size = 1.5;
  const clamp = getCssClamp(
    (Math.floor((size / 1.2) * 100) / 100) * 16,
    size * 16,
  );

  // Clear Search
  function clearMessage() {}

  // Send Message
  async function search(isLoadMore = false, isLoadPrevious = false) {
    if (query !== "" && query.length > 1) {
      // fetch
      loading = true;
      const messageReq = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          page: currentPage,
        }),
      }).catch((err) => {
        hasError = true;
        loading = false;
      });
      const data = await messageReq.json();
      console.log(data);

      hasError = false;
      loading = false;
    } else {
      loading = false;
    }
  }
</script>

<section class="contain contact">
  <form class="inputs" style={`--search-size: ${clamp}`}>
    <fieldset>
      <label for="name" class="required">Name</label>
      <input
        type="text"
        id="name"
        bind:this={nameInput}
        bind:value={name}
        disabled={disabled ? true : undefined}
      />
    </fieldset>
    <fieldset>
      <label for="email">Email Address</label>
      <input
        type="text"
        id="email"
        bind:this={emailInput}
        bind:value={email}
        disabled={disabled ? true : undefined}
      />
    </fieldset>
    <fieldset>
      <label for="text">Message</label>
      <textarea
        id="text"
        bind:this={textInput}
        bind:value={text}
        disabled={disabled ? true : undefined}
      ></textarea>
    </fieldset>
  </form>
  {#if hasError}
    <div class="center-full">Error searching - please try again later.</div>
  {/if}
  <div class="loader" class:active={loading}></div>
</section>

<style lang="scss">
  @use "@css/util";

  fieldset {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto 1.5rem;

    label {
      font-size: 1.5rem;
      padding-left: 0.5em;
    }

    input,
    textarea {
      border-width: 0.24em;
      font-size: var(--search-size);
      border-radius: 3rem;
      padding: 0.55em 1em;
      width: 100%;
    }

    textarea {
      min-height: 250px;
    }
  }

  // pokeball loader (#20)
  // https://css-loaders.com/wobbling/
  .loader {
    --graphic-width: 60px;

    position: absolute;
    left: calc(50% - (var(--graphic-width) / 2));
    top: 0;
    height: var(--graphic-width);
    aspect-ratio: 1;
    margin: 2rem auto;
    pointer-events: none;
    opacity: 0;
    transform: scale(0);
    transition:
      opacity 2s ease,
      transform 1s ease;
    @include util.zindex(loader);

    &.active {
      opacity: 1;
      transform: scale(1);

      &::after {
        animation: l20 1s infinite cubic-bezier(0.5, 120, 0.5, -120);
      }
    }

    &::before {
      content: "Loading";
      position: absolute;
      top: 103%;
      left: -4px;
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      transform-origin: bottom;
      background:
        radial-gradient(at 75% 15%, #fffb, #0000 35%),
        radial-gradient(at 80% 40%, #0000, #0008),
        radial-gradient(circle 5px, #fff 94%, #0000),
        radial-gradient(circle 10px, #000 94%, #0000),
        linear-gradient(#f93318 0 0) top / 100% calc(50% - 5px),
        linear-gradient(#fff 0 0) bottom/100% calc(50% - 5px) #000;
      background-repeat: no-repeat;
    }
  }

  @keyframes l20 {
    30%,
    70% {
      transform: rotate(0deg);
    }
    49.99% {
      transform: rotate(0.2deg);
    }
    50% {
      transform: rotate(-0.2deg);
    }
  }
</style>
