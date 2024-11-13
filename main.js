import './css/reset.css';
import './css/fonts.css';
import './css/style.css';
import './css/nav.css';

import { Nav } from './js/Nav.js';

document.addEventListener('DOMContentLoaded', function onDOMLoad() {
  console.log('-> DOM Loaded');
  Nav();
});
