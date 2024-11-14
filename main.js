import './css/reset.css';
import './css/fonts.css';
import './css/style.css';

import { Nav } from './js/Nav.js';
import { Snow } from './js/Snow.js';

document.addEventListener('DOMContentLoaded', function onDOMLoad() {
  console.log('-> DOM Loaded');
  Nav();
  Snow();
});
