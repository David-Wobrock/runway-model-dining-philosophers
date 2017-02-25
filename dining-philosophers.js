'use strict';

let d3 = require('d3');

let View = function(controller, svg, module) {
    let model = module.env;
    svg = d3.select(svg)
        .classed('dining-philosophers', true)
        .append('g');

    return {
        name: 'DiningPhilosophersView',
        update: function(changes) {
            console.log(changes);
        }
    };
};

module.exports = View;
