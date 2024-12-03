<script>
  import Logo from "$lib/components/Logo.svelte";
  import FloatMenu from "./FloatMenu.svelte";
</script>

<nav id="nav-main" class="contain">
  <a class="skip-to-content" href="#main">Skip to main content</a>
  <Logo text="JOSH" size={15} link="/" />
  <div class="pages">
    <a href="/favorites">Favs</a>
    <a href="/movies">Movies</a>
    <a href="/keeps">Keeps</a>
  </div>
  <FloatMenu />
</nav>

<style lang="scss">
  @use "$lib/css/util";

  nav {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @include util.mq(sm) {
      align-items: center;
    }
  }
</style>
