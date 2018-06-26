import * as d3 from 'd3';
import * as moment from 'moment';
import { weekNumberFormatting, formatDateCountArray, dateToString, getDateCountDictionary, getYearRange, getMonthRange, getAllDatesArray, getMonthArray } from "./utils";
// import {stringify} from "querystring";
var day = d3.timeFormat("%w");
var week = d3.timeFormat("%U");
var format = d3.timeFormat("%Y%m%d");
var parseDate = d3.timeParse("%Y%m%d");
var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var color = d3.scaleLinear()
    .domain([0, 1])
    .range(['#e5e9ed', '#002b51']);
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
export function createCalendarViewChart(rawData, height, width, cellSize, onClickHandler) {
    var data = rawData;
    var startDate = new Date(data[data.length - 1].lastVisitTime);
    var startDateString = dateToString(startDate);
    startDate = parseDate(startDateString);
    var endDate = new Date(data[0].lastVisitTime);
    var endDateString = dateToString(endDate);
    endDate = parseDate(endDateString);
    var dictionary = getDateCountDictionary(data);
    var yearRange = getYearRange(startDate, endDate);
    var monthRange = getMonthRange(startDate, endDate, dictionary);
    var allDates = getAllDatesArray(startDate, endDate);
    var dateCountArray = formatDateCountArray(allDates, dictionary);
    // Arrays used to create labels
    var month = getMonthArray(monthRange);
    var svg = drawVisualizationCanvas(yearRange, height, width, cellSize);
    drawLabels(svg, cellSize);
    var rect = drawAllRectLayer(svg, allDates, startDate, cellSize, onClickHandler);
    drawLegend(svg, month, cellSize);
    var maxVisitCount = d3.max(dateCountArray, function (d) { return d.value; });
    var preppedData = d3.nest()
        .key(function (d) { return d.date; })
        .rollup(function (d) { return Math.sqrt(d[0].value / maxVisitCount); })
        .map(dateCountArray);
    drawRectDataLayer(rect, preppedData, dictionary);
}
export function drawAllRectLayer(svg, allDatesArray, startDate, cellSize, onClickHandler) {
    return svg.selectAll(".day")
        .data(allDatesArray)
        .enter()
        .append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function (d) { return weekNumberFormatting(week(startDate), Number(week(d))) * cellSize; })
        .attr("y", function (d) { return day(d) * cellSize; })
        .attr("fill", '#ebedf0')
        .datum(format)
        .on('click', function (d) {
        tooltip
            .style('display', 'none');
        onClickHandler(d);
    });
}
export function drawVisualizationCanvas(yearRange, height, width, cellSize) {
    return d3.select(".calendar-view-container").selectAll("svg")
        .data(d3.range(yearRange[0], yearRange[yearRange.length - 1]))
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "calendar-svg")
        .append("g")
        .attr("transform", "translate(" + (width / 6) + "," + height * 0.25 + ")");
}
export function drawLabels(svg, cellSize) {
    // Draws the Title for the viz
    svg.append("text")
        .attr("transform", "translate(30, -35)")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text(function (d) { return "Past 3 Month History"; });
    var _loop_1 = function (i) {
        svg.append("text")
            .attr("transform", "translate(-5," + cellSize * (i + 1) + ")")
            .style("text-anchor", "end")
            .style("font-size", "0.75em")
            .attr("dy", (.5 * cellSize / -10) + 0.75 + "em")
            .text(function (d) { return weekdays[i]; });
    };
    for (var i = 0; i < weekdays.length; i++) {
        _loop_1(i);
    }
}
export function drawLegend(svg, month, cellSize) {
    var legend = svg.selectAll(".legend")
        .data(month)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(" + (((i + 1) * (cellSize * 14 / 3)) - (cellSize * 14 / 6)) + ",-5)"; });
    legend.append("text")
        .attr("class", function (d, i) { return month[i]; })
        .style("text-anchor", "end")
        .style("font-size", "1em")
        .attr("dy", "-.3em")
        .text(function (d, i) { return month[i]; });
}
export function drawRectDataLayer(rect, preppedData, dictionary) {
    rect.filter(function (d) { return preppedData["$" + d] > 0; })
        .attr("fill", function (d) { return color(preppedData["$" + d]); })
        .on('mouseover', function (d) {
        var shift = 0;
        if (d3.event.pageX > 175) {
            shift = -150;
        }
        var hoverExpression = "Visit";
        var clickValue = 0;
        if (dictionary[d] !== undefined) {
            clickValue = dictionary[d];
            hoverExpression = "Visits";
        }
        tooltip
            .style("left", d3.event.pageX + shift + "px")
            .style("top", d3.event.pageY + "px")
            .style("display", "inline-block")
            .html(clickValue + " " + hoverExpression + " on " + "<span class='hover-date'>" + moment(d).format('MMM Do, YYYY') + "</span>");
    })
        .on('mouseout', function (d) {
        d3.select(d3.event.path[0])
            .style('stroke', 'white');
        tooltip
            .style('display', 'none');
    });
}
//# sourceMappingURL=calendarViewChart.js.map