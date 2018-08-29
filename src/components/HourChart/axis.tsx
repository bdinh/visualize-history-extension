import * as React from 'react';
import {axisBottom, axisLeft} from "d3-axis";
import {timeFormat, timeParse} from "d3-time-format";
import {scaleLinear, select, ticks, timeDay} from "d3";
import {scaleTime} from "d3-scale";

import './hourChart.css'
import {XAxisProps} from "./types";

export class XAxis extends React.Component<XAxisProps, any> {
    private axisElement: any;
    componentDidMount() {
        this.renderAxis()
    }

    componentDidUpdate() {
        this.renderAxis()
    }

    renderAxis() {
        const parser = timeParse("%H:%M");
        const midNight = parser("00:00");
        const width: number = 316; // consider refactoring into globals constants!!
        const margin: number = 30;
        const xScale = scaleTime()
            .domain([midNight, timeDay.offset(midNight, -1)])
            .range([0, width - margin]);

        const axis = axisBottom(xScale)
            .tickFormat(timeFormat("%I %p"));

        select(this.axisElement).call(axis);
    }

    render() {

        const {
            translation
        } = this.props;

        return (
            <g
                className={"axis axis--x"}
                ref={ (el) => { this.axisElement = el }}
                transform={`translate(${translation.x}, ${translation.y})`}
            />

        );
    }
}

export class YAxis extends React.Component<any, any> {
    private axisElement: SVGGElement;

    componentDidMount() {
        this.renderAxis();
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    renderAxis() {
        const height = 200;
        const yScale = scaleLinear()
            .range([170, 0])
            .domain([0,100]);

        const axis = axisLeft(yScale)
            .tickSize(-287);

        select(this.axisElement).call(axis);
    }

    render() {

        return(
            <g
                className={"axis axis--y"}
                ref={ (el) => { this.axisElement = el }}
                transform={`translate(15, 10)`}
            />
        )
    }


}