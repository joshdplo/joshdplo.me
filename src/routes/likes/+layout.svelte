<script>
  import HeroText from "$lib/components/HeroText.svelte";
  import PageMenu from "$lib/components/PageMenu.svelte";

  let { data, children } = $props();
</script>

<section class="contain">
  <div class="center-full">
    <HeroText text="Dynamic Me" hasDescenders={true} />
  </div>
  <PageMenu links={data.likesLinks} />
</section>

{@render children()}
