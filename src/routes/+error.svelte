<script>
  import { page } from "$app/stores";
  import HeroText from "$lib/components/HeroText.svelte";
</script>

<section class="contain">
  <div class="center-full">
    <HeroText text="ERROR!" size={15} alt={true} hasDescenders={false} />
  </div>

  <div class="h1 bg border">
    WHAT THE HECK? something <span class="bg-opposite no-pad"
      >{$page?.error?.message}</span
    >
    happened because
    <span class="bg-accent no-pad">{$page?.status}</span>!
  </div>
</section>
