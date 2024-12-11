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
    Hi. My name is... just kidding hahAhaH!
    <span class="bg no-pad">This is my sweet website.</span> I made it with by
    <span class="sr-only">(an emoji of a bear)</span>🐻 hands.
    <span class="bg-quaternary no-pad"
      >Nice to
      <span class="sr-only">(an emoji of a meat slab)</span>🥩 you.</span
    >
    Have a <span class="sr-only">(an emoji of grapes)</span>🍇 day.
  </div>

  <i class="spacer-1"></i>
</section>
