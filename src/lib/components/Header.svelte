<script>
  import Logo from "$lib/components/Logo.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<nav id="nav-main">
  <a class="skip-to-content" href="#main">Skip to main content</a>
  <Logo text="JOSH" size={15} link="/" />
  <div class="end">
    <a href="/favorites">Favs</a>
    <a href="/movies">Movies</a>
  </div>
</nav>
<ThemeSwitcher />

<style>
  nav {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0 0;
  }
</style>
