<script>
  import Logo from "$lib/components/Logo.svelte";
  import FloatMenu from "./FloatMenu.svelte";
</script>

<nav id="nav-main" class="contain">
  <a class="skip-to-content" href="#main">Skip to main content</a>
  <FloatMenu />
  <Logo text="JOSH" size={15} link="/" />
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
