<script>
  import HeroText from "$lib/components/HeroText.svelte";
  import PageMenu from "$lib/components/PageMenu.svelte";

  import TestImage from "$lib/images/test300.jpg?enhanced";
</script>

<section class="contain">
  <div class="center-full">
    <HeroText text="Styles!" hasDescenders={true} alt={true} />
  </div>

  <div class="h1">Heading 1</div>
  <p>
    Here are some fancy boxes with cool and groovy double borders for you to
    stare at!
  </p>
  <p class="bg border">
    This is a <code>&lsaquo;p class="bg border"&rsaquo;</code>
  </p>
  <p class="bg-primary-dark border-primary">
    This is a <code
      >&lsaquo;p class="bg-primary-dark border-primary"&rsaquo;</code
    >
  </p>
  <p class="bg-accent border fancy">
    This is a <code>&lsaquo;p class="bg-accent border fancy"&rsaquo;</code> YOU GET
    THE IDEA RIGHT?
  </p>

  <h2>Heading 2</h2>
  <p>
    This is just a regular <code>&lsaquo;p&rsaquo;</code> hahah you thought it was
    going to be another fancy backgroundy bordery paragraph DIDN'T YOU?!
  </p>
  <p>
    Well we can't all be fancy and we certainly can't all be backgroundy that
    would just be too much. <code
      >p+p, p+h1, p+.h1, p+h2, p+.h2, p+h3, p+.h3, p+h4, p+.h4 &#123;margin-top:
      1.5rem&#125;</code
    >.
  </p>

  <h3>Heading 3</h3>
  <p>
    Here, take a look at this <code
      >&lt;i class="spacer-1"&gt;&lt;i&gt;&lt;PageMenu teeny=&#123;true&#125;
      center=&#123;false&#125;&gt; color="quaternary" links=&#123;[...]&#125;</code
    >
  </p>
  <i class="spacer-1"></i>
  <PageMenu
    teeny={true}
    center={false}
    color="quaternary"
    links={[
      { path: "/styles", title: "Styles page" },
      { path: "/", title: "Greeting page" },
      { path: "/keeps", title: "Keeps page" },
    ]}
  />
  <p>PRETTY SWEET HUH?!</p>

  <h4>Heading 4</h4>
  <p class="img-right">
    <enhanced:img src={TestImage} alt="a test image of fancy tea on a table" />
    I don't really use heading 5 or heading 6 so I usually don't bother styling them...isn't
    that wild?! I guess now we have to do regular talk-typing because there are "keeps"
    on this site and I need to write stuff in them. And before you ask, no they're
    not "posts" - ok? It's a totally new, original, never-done-before thing that's
    gonna revolutionize the www.com-ernet. So now that we've got that out of the
    way, you can check out the keeps <a href="/keeps">here</a>. I also tossed an
    image in here so it can float around the text and look real nifty.
  </p>
</section>
