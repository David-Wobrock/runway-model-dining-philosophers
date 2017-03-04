'use strict';

let d3 = require('d3');

let View = function(controller, svg, module) {
    let model = module.env;
    svg = d3.select(svg)
        .classed('dining-philosophers', true)
        .append('g');

    let nbPhilosophers = model.vars.get('philosophers').size();
    // Place forks in a circle
    let forks = [];
    let philosophers = [];
    let xBigCircle = 50;
    let yBigCircle = 50;
    let radius = 40;

    svg.append('circle')
        .attr('cx', xBigCircle)
        .attr('cy', yBigCircle)
        .attr('r', radius)
        .attr('fill', '#fafafa')
        .attr('stroke', 'grey')
        .attr('stroke-width', 0.3);


    for (let i = 1; i <= nbPhilosophers; ++i) {
        let x = radius * Math.cos((i*Math.PI)/(nbPhilosophers/2)) + xBigCircle;
        let y = radius * Math.sin((i*Math.PI)/(nbPhilosophers/2)) + yBigCircle;
        philosophers.push(svg.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 10)
            .attr('fill', '#fafafa')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.6));
        svg.append('text')
            .attr('x', x)
            .attr('y', y)
            .attr('style', 'font-size: 10px;')
            .text(i);
        // Fork to the right
        let xf = (radius+5) * Math.cos(((i-0.5)*Math.PI)/(nbPhilosophers/2)) + xBigCircle;
        let yf = (radius+5) * Math.sin(((i-0.5)*Math.PI)/(nbPhilosophers/2)) + yBigCircle;
        let xf2 = (radius-5) * Math.cos(((i-0.5)*Math.PI)/(nbPhilosophers/2)) + xBigCircle;
        let yf2 = (radius-5) * Math.sin(((i-0.5)*Math.PI)/(nbPhilosophers/2)) + yBigCircle;
        forks.push(
            svg.append('line')
                .attr('x1', xf)
                .attr('y1', yf)
                .attr('x2', xf2)
                .attr('y2', yf2)
                .attr('style', 'stroke: black; stroke-width: 2;'));
    }

    return {
        name: 'DiningPhilosophersView',
        update: function(changes) {
            for (let i = 0; i < changes.length; ++i) {
                let e = changes[i];
                if (e.startsWith('forks')) {
                    let idx = e.split('[')[1].split(']')[0];
                    let fork = forks[idx-1%nbPhilosophers];
                    if (fork.attr('style') === 'stroke: black; stroke-width: 2;') {
                        fork.attr('style', 'stroke: red; stroke-width: 2;');
                    } else {
                        fork.attr('style', 'stroke: black; stroke-width: 2;');
                    }
                } else if (e.startsWith('philosophers')) {
                    let idx = e.split('[')[1].split(']')[0];
                    let philo = philosophers[idx-1];
                    let philoModel = model.getVar('philosophers').items[idx-1];
                    if (philoModel.fields && philoModel.fields.type.name === 'Eating') {
                        philo.attr('stroke', 'red');
                    } else {
                        philo.attr('stroke', 'black');
                    }
                }
            }
        }
    };
};

module.exports = View;
