import '../css/nav.css';

export const Nav = () => {
  const dom = {
    header: document.querySelector('.header-main'),
    nav: document.querySelector('.nav-main'),
    links: document.querySelectorAll('.nav-main a'),
    line: document.querySelector('.nav-main .line'),
    activeLink: () => dom.nav.querySelector('a.active'),
    activePage: () => document.querySelector('.page.active')
  };

  const onLinkClick = (e) => {
    console.log('link clicked - do this later');
  };

  const init = () => {
    console.log('-> Nav initialized');

    [...dom.links].map(link => link.addEventListener('click', onLinkClick));
  };

  init();
};