export const Nav = {
  dom: {
    nav: document.querySelector('.nav-main'),
    links: document.querySelectorAll('.nav-main a'),
    line: document.querySelector('.nav-main .line')
  },

  moveLineToLink(linkEl) {
    const width = linkEl.offsetWidth;
    const xPos = linkEl.offsetLeft;
    this.dom.line.style = `width: ${width}px; translateX(${xPos});`;
  },

  onLinkMouseEnter(e) {
    console.log('onLinkMouseEnter', e);

    this.addEventListener('mouseleave', () => {
      console.log('mouse left');
    }, { once: true });
  },

  onNavClick(e) {
    console.log('onNavClick', e);
  },

  init() {
    console.log('-> Nav.js');
    [...this.dom.links].map(link => link.addEventListener('mouseenter', this.onLinkMouseEnter));
    this.dom.nav.addEventListener('click', this.onNavClick);
  }
};