<script lang="ts">
  import { formatDate } from "$lib/util";

  let { keep } = $props();
</script>

<a href="/keeps/{keep.slug}">
  <h3>{keep.title}</h3>
  <p>{keep.summary}</p>
  <hr />
  {#if keep.date !== keep.updated}
    <small>UPDATED {formatDate(keep.updated)}</small>
  {/if}
  <small>written {formatDate(keep.date)}</small>
</a>
