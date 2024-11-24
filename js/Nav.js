import '../css/nav.css';

export const Nav = () => {
  const header = document.querySelector('.header-main');
  const hamburger = document.getElementById('hamburger');
  const pages = document.querySelectorAll('.pages .page');

  // Toggle Nav
  const toggleNav = () => {
    const navOpenClass = 'nav-open';
    const isOpen = document.body.classList.contains(navOpenClass);

    hamburger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    document.body.classList[isOpen ? 'remove' : 'add'](navOpenClass);
  }

  // Pages intersectionObserver
  const pageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = header.querySelector(`a[href="#${id}"]`);

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

    hamburger.addEventListener('click', toggleNav);
    [...pages].map(page => pageObserver.observe(page));
  };

  init();
};