<script>
  import { scale } from "svelte/transition";
  let { item, image } = $props();

  let active = $state(false);
  let title = $derived(item.title || item.name);
  let released = $derived(
    (item.release_date || item.first_air_date).split("-")[0],
  );
  let favorite = $derived(item.rating !== null);
  let mega = $derived(item.mega);
</script>

<div class="card" class:mega class:favorite transition:scale>
  <enhanced:img src={image} alt="poster for {title}" loading="lazy" />
  <div class="info">
    <span class="title">{title}{` (${released})`}</span>
  </div>
</div>

<style lang="scss">
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 150px;

    &:hover {
      transform: scale(1.4);
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 1);
      z-index: 2;
    }
  }

  .info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1;
    z-index: -1;
  }

  .favorite::before,
  .mega::before {
    content: "\2606";
    position: absolute;
    top: 0.15rem;
    right: 0.3rem;
    font-size: 1rem;
  }
  .mega::before {
    content: "\2605";
  }
</style>
