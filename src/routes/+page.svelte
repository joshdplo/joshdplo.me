<script>
  import { site } from "$lib/config";
  import { globalState } from "$lib/state.svelte";
  import HeroText from "$lib/components/HeroText.svelte";

  globalState.pageColor = "primary";
</script>

<svelte:head>
  <meta name="description" content={site.description} />
</svelte:head>

<section class="contain">
  <div class="center-full">
    <HeroText
      text={site.title.toUpperCase()}
      size={17}
      color="primary"
      link="/"
      hasDescenders={true}
    />
  </div>

  <div class="h1 bg-accent border landing-text">
    Hi!
    <span class="bg no-pad">This is my sweet website.</span> I use it to
    <span class="bg-secondary no-pad"
      ><a href="/likes">list things i like</a></span
    >,
    <span class="bg-opposite no-pad"
      ><a href="https://github.com/joshdplo?tab=repositories"
        >practice FE development</a
      ></span
    >, and
    <span class="bg-quaternary no-pad"
      ><a href="/keeps">keep some public notes</a></span
    >.
  </div>

  <i class="spacer-1"></i>
</section>

<style>
  @media (max-width: 600px) {
    .landing-text {
      font-size: 1.6rem;
    }
  }
</style>
