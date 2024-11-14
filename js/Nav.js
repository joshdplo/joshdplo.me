import '../css/nav.css';

export const Nav = () => {
  const dom = {
    header: document.querySelector('.header-main'),
    nav: document.querySelector('.nav-main'),
    links: document.querySelectorAll('.nav-main a'),
    line: document.querySelector('.nav-main .line'),
    activeLink: () => dom.nav.querySelector('a.active'),
  };

  let isLineMoving = false;
  const linkPadding = getComputedStyle(dom.header).getPropertyValue('--nav-link-pad-x');

  const removeActive = () => {
    const el = dom.activeLink();
    el.classList.remove('active');
  };

  const activateLink = (linkEl) => {
    removeActive();
    linkEl.classList.add('active');
  };

  const moveLineToLink = (linkEl) => {
    if (isLineMoving) return;
    let el = linkEl || dom.activeLink();

    const width = el.offsetWidth;
    const xPos = el.offsetLeft;

    dom.line.addEventListener('transitionrun', () => {
      isLineMoving = true;
    }, { once: true });

    dom.line.style.width = '3px';

    dom.line.addEventListener('transitionend', () => {
      dom.line.style.width = `calc(${width}px - (${linkPadding} * 2))`;
      dom.line.style.transform = `translateX(calc(${xPos}px + ${linkPadding}))`;
      isLineMoving = false;
    }, { once: true });
  };

  const onLinkMouseEnter = (e) => {
    moveLineToLink(e.target);

    e.target.addEventListener('mouseleave', () => {
      if (!e.target.classList.contains('active'));
      moveLineToLink(false);
    }, { once: true });
  };

  const onLinkFocus = (e) => {
    moveLineToLink(e.target);
  };

  const onLinkBlur = (e) => {
    if (!e.target.classList.contains('active')) moveLineToLink(false);
  };

  const onNavClick = (e) => {
    activateLink(e.target);
  };

  const init = () => {
    console.log('-> Nav.js');

    moveLineToLink(false);
    [...dom.links].map(link => link.addEventListener('mouseenter', onLinkMouseEnter));
    [...dom.links].map(link => link.addEventListener('focus', onLinkFocus));
    [...dom.links].map(link => link.addEventListener('blur', onLinkBlur));
    dom.nav.addEventListener('click', onNavClick);
  };

  init();
};