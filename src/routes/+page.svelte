<script>
  import HeroText from "$lib/components/HeroText.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <meta name="description" content="The personal website of Josh" />
</svelte:head>

<section class="contain">
  <div class="center-full">
    <HeroText text="JOSH" size={17} color="primary" link="/" />
  </div>

  <div class="h1 bg-accent border">
    Hi - this is my sweet website.
    <span class="bg no-pad">Hope you like it. Have a groovy day.</span>
  </div>
</section>

<section>
  <div class="spacer-2"></div>
  <div class="bg-bw">
    <div class="contain">
      <div class="h1">NICE! We really styled this up!</div>
    </div>
  </div>
</section>
