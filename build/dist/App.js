var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import './App.css';
import * as d3 from 'd3';
import * as $ from 'jquery';
import * as moment from 'moment';
import { dateToString, weekNumberFormatting, formatDateCountArray, getAllDatesArray, getYearRange, getDateCountDictionary, getMonthRange } from "./ts/utils";
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            baseURL: null,
            data: null
        };
        _this.createCalendarView = _this.createCalendarView.bind(_this);
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
            var currentURL = tabs[0].url;
            var pathArray = currentURL.split('/');
            var protocol = pathArray[0];
            var host = pathArray[2];
            var urlString = protocol + '//' + host + '/';
            chrome.history.search({
                'text': urlString,
                'maxResults': 1000000,
                'startTime': 0
            }, function (results) {
                _this.setState({
                    baseURL: host,
                    data: results
                });
            });
        });
    };
    App.prototype.createCalendarView = function () {
        var data = this.state.data;
        console.log(data);
        var day = d3.timeFormat("%w");
        var week = d3.timeFormat("%U");
        // let percent = d3.format(".1%");
        var format = d3.timeFormat("%Y%m%d");
        var parseDate = d3.timeParse("%Y%m%d");
        var startDate = new Date(data[data.length - 1].lastVisitTime);
        var startDateString = dateToString(startDate);
        startDate = parseDate(startDateString);
        var endDate = new Date(data[0].lastVisitTime);
        var endDateString = dateToString(endDate);
        endDate = parseDate(endDateString);
        var dictionary = getDateCountDictionary(data);
        var yearRange = getYearRange(startDate, endDate);
        var monthRange = getMonthRange(startDate, endDate, dictionary);
        // let startMonthValue = startDate.getMonth();
        // while (startMonthValue !== endDate.getMonth() + 1) {
        //     monthRange.push(startMonthValue);
        //     startMonthValue = (startMonthValue + 1) % 12;
        // }
        // // yearRange.reverse();
        // //
        // if (Object.keys(dictionary).length < 28 * monthRange.length) {
        //     // remove the first month in array due to the fact that we may not have enough data on it
        //     // needs fixing in order to count for distribution but should always work with chrome data
        //     monthRange.splice(monthRange.length - 1, 1);
        // }
        var rectData = getAllDatesArray(startDate, endDate);
        var dateCountArray = formatDateCountArray(rectData, dictionary);
        var width = $('.calendar-view').width();
        var height = 200;
        var cellSize = 20;
        var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var monthFormat = [];
        monthRange.forEach(function (index) {
            monthFormat.push(month[index]);
        });
        var color = d3.scaleLinear()
            .domain([0, 1])
            .range(['#e5e9ed', '#002b51']);
        var svg = d3.select(".calendar-view").selectAll("svg")
            .data(d3.range(yearRange[0], yearRange[yearRange.length - 1]))
            .enter().append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "RdYlGn")
            .append("g")
            .attr("transform", "translate(" + "50" + "," + (height - cellSize * 7 - 1) + ")");
        // Should I keep Year?
        svg.append("text")
            .attr("transform", "translate(30, -35)")
            .style("text-anchor", "middle")
            .text(function (d) { return "Past 3 Month History"; });
        var _loop_1 = function (i) {
            svg.append("text")
                .attr("transform", "translate(-5," + cellSize * (i + 1) + ")")
                .style("text-anchor", "end")
                .style("font-size", "0.75em")
                .attr("dy", "-.25em")
                .text(function (d) { return weekdays[i]; });
        };
        for (var i = 0; i < 7; i++) {
            _loop_1(i);
        }
        var rect = svg.selectAll(".day")
            .data(rectData)
            .enter()
            .append("rect")
            .attr("class", "day")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function (d) { return weekNumberFormatting(week(startDate), Number(week(d))) * cellSize; })
            .attr("y", function (d) { return day(d) * cellSize; })
            .attr("fill", '#ebedf0')
            .datum(format);
        console.log(rect);
        var legend = svg.selectAll(".legend")
            .data(monthFormat)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(" + (((i) * 75) + 75) + ",-5)"; });
        legend.append("text")
            .attr("class", function (d, i) { return monthFormat[i]; })
            .style("text-anchor", "end")
            .style("font-size", "1em")
            .attr("dy", "-.3em")
            .text(function (d, i) { return monthFormat[i]; });
        var maxVisitCount = d3.max(dateCountArray, function (d) { return d.value; });
        var preppedData = d3.nest()
            .key(function (d) { return d.date; })
            .rollup(function (d) { return Math.sqrt(d[0].value / maxVisitCount); })
            .map(dateCountArray);
        var tooltip = d3.select("body").append("div").attr("class", "toolTip");
        console.log(preppedData);
        console.log(dictionary);
        rect.filter(function (d) { return preppedData["$" + d] >= 0; })
            .attr("fill", function (d) { return color(preppedData["$" + d]); })
            .on('mouseover', function (d) {
            d3.select(d3.event.path[0])
                .style('stroke', 'black');
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
    };
    App.prototype.handleClick = function () {
        console.log("hellllooooo");
    };
    App.prototype.render = function () {
        {
            this.state.data !== null ? this.createCalendarView() : "";
        }
        return (React.createElement("div", { className: "App" },
            React.createElement("div", { className: "model-title" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-6" },
                        React.createElement("p", null, "History Visualizer")),
                    React.createElement("div", { className: "col-6" },
                        React.createElement("button", { className: "button all-history-button", onClick: this.handleClick }, "View All")))),
            React.createElement("hr", { className: "line" }),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null, "Base URL:"),
                    React.createElement("input", { type: "text", className: "form-control", placeholder: this.state.baseURL !== null ? this.state.baseURL : " ", "aria-label": "Username", "aria-describedby": "basic-addon1", readOnly: true })),
                React.createElement("hr", { className: "line" }),
                React.createElement("div", { className: "calendar-view" }),
                React.createElement("hr", { className: "line" }))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map