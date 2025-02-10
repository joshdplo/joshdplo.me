<script>
  import SVG from "./SVG.svelte";

  let { url } = $props();

  let name = $state("");
  let text = $state("");

  let error = $state("");
  let loading = $state(false);
  let success = $state(false);

  // Clear Search
  function clearMessage() {
    error = "";
    name = "";
    text = "";
    loading = false;
  }

  // Form Validation
  function validate() {
    error = "";
    if (name.trim() === "") error += " Name cannot be empty.";
    if (text.trim() === "") error += " Message cannot be empty.";
  }

  // Success Event
  function onSuccess() {
    success = true;
    setTimeout(() => {
      success = false;
      clearMessage();
    }, 5000);
  }

  // Submit Message
  async function submit(e) {
    e.preventDefault();
    validate();

    if (error === "") {
      // fetch
      loading = true;
      const messageReq = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          text,
        }),
      }).catch((err) => {
        error = err;
        loading = false;
      });

      const data = await messageReq.json();

      if (data.error) {
        error = data.error;
      } else {
        onSuccess();
      }

      loading = false;
    } else {
      loading = false;
    }
  }
</script>

<section class="contain contact">
  <form class="inputs" onsubmit={submit} class:success>
    <fieldset>
      <label for="name" class="required">Name</label>
      <input
        type="text"
        id="name"
        bind:value={name}
        onkeydown={() => (error = "")}
        disabled={loading ? true : undefined}
      />
    </fieldset>
    <fieldset>
      <label for="text">Message</label>
      <textarea
        id="text"
        bind:value={text}
        onkeydown={() => (error = "")}
        disabled={loading ? true : undefined}
      ></textarea>
    </fieldset>
    {#if error !== ""}
      <div class="error">{error}</div>
    {/if}
    <button
      disabled={loading ? true : undefined}
      title="Send Message"
      aria-label="Send Message"><SVG name="message" /> Send</button
    >
  </form>

  <p class="h2 bg border-primary-darker text-center" class:success>
    Your message has been sent! I look forward to hearing what you wrote and
    will take a look at it as soon as I'm able.
  </p>
  <div class="loader" class:active={loading}></div>
</section>

<style lang="scss">
  @use "@css/util";

  .contact {
    position: relative;
  }

  [disabled] {
    opacity: 0.35;
    cursor: not-allowed !important;
  }

  form {
    transition: opacity 0.4s ease-in-out;

    &.success {
      opacity: 0.1;
      pointer-events: none;
    }

    @include util.mq(sm) {
      max-width: 500px;
      margin: 1rem auto 0;
    }
  }

  fieldset {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto 1rem;
  }

  input,
  textarea,
  button {
    width: 100%;
    border: 0;
    border-radius: 0;
    border: 8px double var(--c-primary-darker);
    padding: 0.35em;
    font-size: 1rem;
    background-color: var(--content-subtler);
    transition: opacity 0.4s ease-in-out;
  }

  textarea {
    min-height: 150px;
  }

  .error {
    display: block;
    text-align: right;
    padding: 0 0.7rem;
    border-right: 8px solid red;
    margin: 0 0 1rem auto;
    font-style: italic;
  }

  button {
    display: flex;
    align-items: center;
    width: auto;
    margin: auto;
    padding: 0.5rem 2.75rem;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--font-color-opposite);
    background-color: var(--font-color);
    cursor: pointer;
    border-radius: 0.5em;
    border: 8px double var(--c-primary-darker);

    :global(svg) {
      width: 1.25rem;
      margin-right: 0.4em;
      fill: var(--font-color-opposite);
    }

    &:not([disabled]):hover {
      text-decoration: underline;
    }

    &:focus-visible {
      color: var(--font-color);

      :global(svg) {
        fill: var(--font-color);
      }
    }
  }

  p {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease-in-out;

    &.success {
      opacity: 1;
    }
  }

  @include util.mq(sm) {
    fieldset {
      margin: 0 auto 1.5rem;
    }

    input,
    textarea {
      padding: 0.55em;
    }

    textarea {
      min-height: 250px;
    }

    button {
      flex-direction: column;
      justify-content: center;
      margin: 0 0 0 auto;
      font-size: 1.2rem;
      padding-bottom: 0.2rem;

      :global(svg) {
        width: 2.2rem;
        margin: 0;
      }
    }
  }

  // pokeball loader (#20)
  // https://css-loaders.com/wobbling/
  .loader {
    --graphic-width: 60px;

    position: absolute;
    left: calc(50% - (var(--graphic-width) / 2));
    top: calc(30%);
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
      content: "Sending...";
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
