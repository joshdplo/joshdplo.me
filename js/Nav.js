import '../css/nav.css';

export const Nav = () => {
  const dom = {
    header: document.querySelector('.header-main'),
    nav: document.querySelector('.nav-main'),
    links: document.querySelectorAll('.nav-main a'),
    pages: document.querySelectorAll('.pages .page')
  };

  // Pages intersectionObserver
  const pageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = dom.nav.querySelector(`a[href="#${id}"]`);

      if (entry.isIntersecting) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, {
    rootMargin: '-25% 0px -75% 0px'
  });

  const init = () => {
    console.log('-> Nav initialized');

    [...dom.pages].map(page => pageObserver.observe(page));
  };

  init();
};