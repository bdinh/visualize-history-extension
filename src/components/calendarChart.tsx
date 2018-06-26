import * as React from 'react';
import {getMonthArray, parseDate, weekNumberFormatting} from "../ts/utils";
import {timeFormat, scaleLinear} from 'd3';

let cellSize: number = 20;

// Calendar Visualization Title
export let title = (
    <text
        transform="translate(30, -30)"
        style={{textAnchor: "middle", fontWeight: "bold"}}
    >Past 3 Months History
    </text>);


// TODO: Fix eslint rule of forbidden multiline JS in JSX when adding a <g> wrapper around text
export class DayLabel extends React.Component<any, any> {
    render() {
        let weekdays: string[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return (
            weekdays.map((day, i) => {
                return (
                    <text
                        key={i}
                        transform={"translate(-5," + cellSize*(i+1) + ")"}
                        dy={(.5 * cellSize / -10) + 0.75 + "em"}
                        style={{textAnchor: "end", fontSize: "0.75em"}}
                    >
                        {day}
                    </text>
                );
            })
        );
    }
}


// TODO: Fix eslint rule of forbidden multiline JS in JSX when adding a <g> wrapper around text
export class MonthLabel extends React.Component<any, any> {
    render() {
        const {
            monthRange
        } = this.props;

        let monthsArray = getMonthArray(monthRange);

        return (
            monthsArray.map((month, i) => {
                return (
                    <text
                        key={i}
                        transform={"translate(" + (((i+1) * (cellSize * 14 / 3)) -  (cellSize * 14 / 6)) + ",0)"}
                        className={month + "-label"}
                        dy={"-.3em"}
                        style={{ textAnchor: "end", fontSize: "1em"}}
                    >
                        {month}
                    </text>
                );
            })
        );
    }
}


export class RectLayer extends React.Component<any, any> {
    render() {
        const {
            preppedData,
            startDate,
            onClickHandler,
        } = this.props;

        let day = timeFormat("%w");
        let week = timeFormat("%U");

        let color = scaleLinear()
            .domain([0, 1])
            .range(['#e5e9ed', '#8E71EF']);

        return (
            Object.keys(preppedData).map((date, i) => {
                let dateObject: Date = parseDate(date);
                return (
                    <rect
                        key={i}
                        className={"day"}
                        width={cellSize}
                        height={cellSize}
                        x={weekNumberFormatting(week(startDate), Number(week(dateObject))) * cellSize}
                        y={day(dateObject) * cellSize}
                        fill={color(preppedData[date].scaled)}
                        onClick={onClickHandler ? onClickHandler : () => {console.log(preppedData[date])}}
                    />
                );
            })
        );
    }
}
