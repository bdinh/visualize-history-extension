
import * as d3 from 'd3';
import * as moment from 'moment';
import { weekNumberFormatting, formatDateCountArray, dateToString,
    getDateCountDictionary, getYearRange, getMonthRange, getAllDatesArray,
    getMonthArray } from "./utils";
import {HistoryData, DateCount} from "./interface";

let day = d3.timeFormat("%w");
let week = d3.timeFormat("%U");
let format = d3.timeFormat("%Y%m%d");
let parseDate = d3.timeParse("%Y%m%d");
let weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let color = d3.scaleLinear()
    .domain([0, 1])
    .range(['#e5e9ed', '#002b51']);
let tooltip = d3.select("body").append("div").attr("class", "toolTip");

export function createCalendarViewChart(rawData: HistoryData[], height: number,
                                        width: number, cellSize: number, onClickHandler?: any) :void {
    let data :HistoryData[] = rawData;

    let startDate: Date = new Date(data[data.length - 1].lastVisitTime);
    let startDateString :string = dateToString(startDate);
    startDate = parseDate(startDateString);

    let endDate: Date = new Date(data[0].lastVisitTime);
    let endDateString :string = dateToString(endDate);
    endDate = parseDate(endDateString);

    let dictionary = getDateCountDictionary(data);
    let yearRange :number[] = getYearRange(startDate, endDate);
    let monthRange :number[] = getMonthRange(startDate, endDate, dictionary);

    let allDates :Date[] = getAllDatesArray(startDate, endDate);
    let dateCountArray :DateCount[] = formatDateCountArray(allDates, dictionary);

    // Arrays used to create labels
    let month :string[] = getMonthArray(monthRange);


    let svg = drawVisualizationCanvas(yearRange, height, width, cellSize);
    drawLabels(svg, cellSize);
    let rect = drawAllRectLayer(svg, allDates, startDate, cellSize, onClickHandler);
    drawLegend(svg, month, cellSize);

    let maxVisitCount = d3.max(dateCountArray, (d) => { return d.value});
    let preppedData :Object= d3.nest()
        .key((d) => { return d.date; })
        .rollup((d) => { return Math.sqrt(d[0].value / maxVisitCount); })
        .map(dateCountArray);

    drawRectDataLayer(rect, preppedData, dictionary);
}

export function drawAllRectLayer(svg: any, allDatesArray: Date[], startDate: Date,
                                 cellSize: number, onClickHandler?: any) :any {
    return svg.selectAll(".day")
        .data(allDatesArray)
        .enter()
        .append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", (d) => { return weekNumberFormatting(week(startDate), Number(week(d))) * cellSize; })
        .attr("y", (d) => { return day(d) * cellSize; })
        .attr("fill",'#ebedf0')
        .datum(format)
        .on('click', (d) => {
            tooltip
                .style('display', 'none');
            onClickHandler(d);
        });
}


export function drawVisualizationCanvas(yearRange: number[], height: number, width: number, cellSize: number) :any {
    return d3.select(".calendar-view-container").selectAll("svg")
        .data(d3.range(yearRange[0], yearRange[yearRange.length - 1],))
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "calendar-svg")
        .append("g")
        .attr("transform", "translate(" + (width / 6) + "," + height * 0.25 + ")");

}

export function drawLabels(svg: any, cellSize: number) :void {
    // Draws the Title for the viz
    svg.append("text")
        .attr("transform", "translate(30, -35)")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text(function(d) { return "Past 3 Month History"; });

    for (let i=0; i<weekdays.length; i++) {
        svg.append("text")
            .attr("transform", "translate(-5," + cellSize*(i+1) + ")")
            .style("text-anchor", "end")
            .style("font-size", "0.75em")
            .attr("dy", (.5 * cellSize / -10) + 0.75 + "em")
            .text(function(d) { return weekdays[i]; });
    }

}

export function drawLegend(svg: any, month: string[], cellSize: number) :void {
    let legend = svg.selectAll(".legend")
        .data(month)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + (((i+1) * (cellSize * 14 / 3)) -  (cellSize * 14 / 6)) + ",-5)"; });

    legend.append("text")
        .attr("class", function(d,i){ return month[i] })
        .style("text-anchor", "end")
        .style("font-size", "1em")
        .attr("dy", "-.3em")
        .text(function(d,i){ return month[i] });
}

export function drawRectDataLayer(rect: any, preppedData: Object, dictionary: Object) :void {
    rect.filter(function(d) { return preppedData["$" + d] >= 0 })
        .attr("fill", function(d) { return color(preppedData["$" + d]); })
        .on('mouseover', (d) => {
            let shift = 0;
            if (d3.event.pageX > 175) {
                shift = -150
            }
            let hoverExpression = "Visit";
            let clickValue = 0;
            if (dictionary[d] !== undefined) {
                clickValue = dictionary[d];
                hoverExpression = "Visits";
            }
            tooltip
                .style("left", d3.event.pageX + shift + "px")
                .style("top", d3.event.pageY + "px")
                .style("display", "inline-block")
                .html(clickValue + " " + hoverExpression + " on " + "<span class='hover-date'>" + moment(d).format('MMM Do, YYYY') + "</span>")

        })
        .on('mouseout', (d) => {
            d3.select(d3.event.path[0])
                .style('stroke', 'white');
            tooltip
                .style('display', 'none');
        });
}
