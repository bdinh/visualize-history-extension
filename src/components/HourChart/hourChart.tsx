import * as React from 'react';
import {HourChartProps, HourChartState} from "./types";
import {ScaleBand, scaleBand, ScaleLinear, scaleLinear, ScaleTime, scaleTime, scaleUtc} from "d3-scale";
import {timeFormat, timeParse} from "d3-time-format";
import {timeDay} from "d3";

export class HourChart extends React.Component<HourChartProps, HourChartState> {
    private xScale: ScaleTime<number, number>;
    private yScale: ScaleLinear<number, number>;

    constructor(props: HourChartProps) {
        super(props);
        this.xScale = scaleTime();
        this.yScale = scaleLinear();

    }

    render() {

        const parser = timeParse("%H:%M");
        const midNight = parser("00:00");
        const margins = {top: 30, right: 30, bottom: 30, left: 30};
        const dimensions = { width: 400, height: 400 };

        const xScale = this.xScale
            .domain([midNight, timeDay.offset(midNight, -1)])
            .range([0, dimensions.width]);

        const yScale = this.yScale
            .range([dimensions.height, 0]);


        return(
            <svg widths={dimensions.width} height={dimensions.height}>

            </svg>
        );
    }
}