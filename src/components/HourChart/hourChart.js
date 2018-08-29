"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const d3_scale_1 = require("d3-scale");
const d3_time_format_1 = require("d3-time-format");
const d3_1 = require("d3");
class HourChart extends React.Component {
    constructor(props) {
        super(props);
        this.xScale = d3_scale_1.scaleTime();
        this.yScale = d3_scale_1.scaleLinear();
    }
    render() {
        const parser = d3_time_format_1.timeParse("%H:%M");
        const midNight = parser("00:00");
        const margins = { top: 30, right: 30, bottom: 30, left: 30 };
        const dimensions = { width: 400, height: 400 };
        const xScale = this.xScale
            .domain([midNight, d3_1.timeDay.offset(midNight, -1)])
            .range([0, dimensions.width]);
        const yScale = this.yScale
            .range([dimensions.height, 0]);
        return (React.createElement("svg", { widths: dimensions.width, height: dimensions.height }));
    }
}
exports.HourChart = HourChart;
