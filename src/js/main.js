import './slider';
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import timer from './modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    modals();
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    forms();
    timer('#timer', '2020-07-15');
    images();
});