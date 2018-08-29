"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const d3_axis_1 = require("d3-axis");
const d3_time_format_1 = require("d3-time-format");
const d3_1 = require("d3");
const d3_scale_1 = require("d3-scale");
require("./hourChart.css");
class XAxis extends React.Component {
    componentDidMount() {
        this.renderAxis();
    }
    componentDidUpdate() {
        this.renderAxis();
    }
    renderAxis() {
        const parser = d3_time_format_1.timeParse("%H:%M");
        const midNight = parser("00:00");
        const width = 316;
        const margin = 30;
        const xScale = d3_scale_1.scaleTime()
            .domain([midNight, d3_1.timeDay.offset(midNight, -1)])
            .range([0, width - margin]);
        const axis = d3_axis_1.axisBottom(xScale)
            .tickFormat(d3_time_format_1.timeFormat("%I %p"));
        d3_1.select(this.axisElement).call(axis);
    }
    render() {
        const { translation } = this.props;
        return (React.createElement("g", { className: "axis axis--x", ref: (el) => { this.axisElement = el; }, transform: `translate(${translation.x}, ${translation.y})` }));
    }
}
exports.XAxis = XAxis;
class YAxis extends React.Component {
    componentDidMount() {
        this.renderAxis();
    }
    componentDidUpdate() {
        this.renderAxis();
    }
    renderAxis() {
        const height = 200;
        const yScale = d3_1.scaleLinear()
            .range([170, 0])
            .domain([0, 100]);
        const axis = d3_axis_1.axisLeft(yScale)
            .tickSize(-287);
        d3_1.select(this.axisElement).call(axis);
    }
    render() {
        return (React.createElement("g", { className: "axis axis--y", ref: (el) => { this.axisElement = el; }, transform: `translate(15, 10)` }));
    }
}
exports.YAxis = YAxis;
