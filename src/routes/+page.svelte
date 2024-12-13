<script>
  import { site } from "$lib/data";
  import HeroText from "$lib/components/HeroText.svelte";
</script>

<svelte:head>
  <meta name="description" content={site.description} />
</svelte:head>

<section class="contain">
  <div class="center-full">
    <HeroText text="JOSH" size={17} color="primary" link="/" />
  </div>

  <div class="h1 bg-accent border">
    Hi!
    <span class="bg no-pad">This is my sweet website.</span> I use it to
    <span class="bg-secondary no-pad"
      ><a href="/likes">list things i like</a></span
    >,
    <span class="bg-opposite no-pad"
      ><a href="https://github.com/joshdplo">practice FE development</a></span
    >, and
    <span class="bg-quaternary no-pad"
      ><a href="/keeps">keep some public notes</a></span
    >.
  </div>

  <i class="spacer-1"></i>
</section>
