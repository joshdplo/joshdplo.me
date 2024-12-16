<script>
  let { item, image } = $props();

  let title = $derived(item.title || item.name);
  let released = $derived(item.release_date || item.first_air_date);
  let favorite = $derived(item.rated !== null);
  let mega = $derived(item.mega !== null);
</script>

<div class="card" class:mega class:favorite={favorite && !mega}>
  <enhanced:img src={image} alt="poster for {title}" loading="lazy" />
  <div class="info">
    <span class="title">{title}{` (${released})`}</span>
  </div>
</div>

<style>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
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
    border: 0.2em solid var(--font-color);
    background-color: rgba(0, 0, 0, 0.88);
    opacity: 0;
    transform: scale(1.15);
    transition:
      opacity 0.1s ease,
      transform 0.1s ease;
  }

  .card:hover .info {
    opacity: 1;
    transform: scale(1.2);
    z-index: 2;
  }

  .card:hover img {
    filter: blur(5px);
  }

  .favorite::before,
  .mega::before {
    content: "\2605";
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    font-size: 1rem;
  }
  .mega::before {
    content: "\2606";
  }
</style>
