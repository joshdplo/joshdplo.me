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
    if (e.target.classList.contains('active')) return;
    const href = e.target.getAttribute('href');
    const page = document.querySelector(`${href}.page`);

    dom.activePage().classList.remove('active');
    dom.activeLink().classList.remove('active');
    e.target.classList.add('active');
    page.classList.add('active');

  };

  const init = () => {
    console.log('-> Nav initialized');

    [...dom.links].map(link => link.addEventListener('click', onLinkClick));
  };

  init();
};