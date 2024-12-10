<script>
  import FloatMenu from "./FloatMenu.svelte";
</script>

<nav id="nav-main" class="contain">
  <a class="skip-to-content" href="#main">Skip to main content</a>
  <FloatMenu />
</nav>

<style lang="scss">
  @use "$lib/css/util";

  nav {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2.2rem;
  }
</style>
