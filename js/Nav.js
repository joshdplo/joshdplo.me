import '../css/nav.css';

export const Nav = () => {
  const header = document.querySelector('.header-main');
  const nav = document.querySelector('.nav-main');
  const links = document.querySelectorAll('.nav-main a');
  const pages = document.querySelectorAll('.pages .page');

  // Pages intersectionObserver
  const pageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = nav.querySelector(`a[href="#${id}"]`);

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

    [...pages].map(page => pageObserver.observe(page));
  };

  init();
};