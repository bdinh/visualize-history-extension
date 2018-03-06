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
            console.log(currentURL);
            var pathArray = currentURL.split('/');
            var protocol = pathArray[0];
            var host = pathArray[2];
            var urlString = protocol + '//' + host + '/';
            chrome.history.search({
                'text': urlString,
                'maxResults': 1000000,
                'startTime': 0
            }, function (results) {
                console.log(urlString);
                console.log(results);
                _this.setState({
                    baseURL: host,
                    data: results
                });
            });
        });
        // chrome.topSites.get((sites) => {
        //     let url = sites[0].url;
        //     console.log(url);
        //
        //     chrome.history.search({
        //         'text': url,
        //         'maxResults': 1000000,
        //         'startTime': 0
        //     },  (results) => {
        //
        //     });
        //
        //     chrome.history.getVisits({ 'url': url}, (sites) => {
        //         console.log(sites);
        //     })
        // });
    };
    App.prototype.createCalendarView = function () {
        var _this = this;
        var data = this.state.data;
        var day = d3.timeFormat("%w");
        var week = d3.timeFormat("%U");
        // let percent = d3.format(".1%");
        var format = d3.timeFormat("%Y%m%d");
        var parseDate = d3.timeParse("%Y%m%d");
        var dictionary = {};
        var yearRange = [];
        var monthRange = [];
        var startDate = new Date(data[data.length - 1].lastVisitTime);
        var startDateString = this.dateToString(startDate);
        startDate = parseDate(startDateString);
        var endDate = new Date(data[0].lastVisitTime);
        var endDateString = this.dateToString(endDate);
        endDate = parseDate(endDateString);
        data.forEach(function (datum) {
            var convertedDate = new Date(datum.lastVisitTime);
            // TODO: Semi redundant
            var year = convertedDate.getFullYear();
            !(yearRange.indexOf(year) > -1) ? yearRange.push(year) : "";
            var result = _this.dateToString(convertedDate);
            if (dictionary[result] !== undefined) {
                dictionary[result] = dictionary[result] + datum.visitCount;
            }
            else {
                dictionary[result] = datum.visitCount;
            }
        });
        console.log(dictionary);
        var startMonthValue = startDate.getMonth();
        while (startMonthValue !== endDate.getMonth() + 1) {
            monthRange.push(startMonthValue);
            startMonthValue = (startMonthValue + 1) % 12;
        }
        yearRange.reverse();
        if (Object.keys(dictionary).length < 28 * monthRange.length) {
            // remove the first month in array due to the fact that we may not have enough data on it
            // needs fixing in order to count for distribution but should always work with chrome data
            monthRange.splice(monthRange.length - 1, 1);
        }
        var dateKeys = Object.keys(dictionary);
        var startWeek = Number(week(startDate));
        var endWeek = Number(week(endDate));
        var totalWeeks = 52 - startWeek + 1 + endWeek + 1;
        console.log(totalWeeks);
        var rectData = [];
        var currentDate = parseDate(dateKeys[0]);
        while (currentDate <= endDate) {
            rectData.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        var currentDate2 = new Date(startDate);
        console.log(currentDate2);
        for (var i = startDate.getDay(); i > 0; i--) {
            currentDate2.setDate(currentDate2.getDate() - 1);
            rectData.push(new Date(currentDate2));
        }
        var currentDate3 = new Date(endDate);
        for (var i = endDate.getDay(); i < 6; i++) {
            currentDate3.setDate(currentDate3.getDate() + 1);
            rectData.push(new Date(currentDate3));
        }
        var plottingData = [];
        rectData.forEach(function (date) {
            var year = date.getFullYear();
            var month = _this.handleMonthFormatting(date.getMonth() + 1);
            var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
            var result = String(year) + month + day;
            var newObject = {};
            newObject.date = result;
            var visitCount = 0;
            if (dictionary[result] !== undefined) {
                visitCount = dictionary[result];
            }
            newObject.value = visitCount;
            plottingData.push(newObject);
        });
        var width = $('.calendar-view').width();
        var height = 200;
        var cellSize = 20;
        var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var monthFormat = [];
        monthRange.forEach(function (index) {
            monthFormat.push(month[index]);
        });
        // let color = d3.scaleLinear()
        //     .domain([0, 1])
        //     .range(['#d1d0db', '#443266']);
        var color = d3.scaleLinear()
            .domain([0, 1])
            .range(['#e5e9ed', '#002b53']);
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
            .attr("x", function (d) { return rectWeekFormatting(week(startDate), Number(week(d))) * cellSize; })
            .attr("y", function (d) { return day(d) * cellSize; })
            .attr("fill", '#ebedf0')
            .datum(format);
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
        var maxVisitCount = d3.max(plottingData, function (d) { return d.value; });
        var preppedData = d3.nest()
            .key(function (d) { return d.date; })
            .rollup(function (d) { return Math.sqrt(d[0].value / maxVisitCount); })
            .map(plottingData);
        var zeroData = {};
        var valueData = {};
        for (var key in preppedData) {
            if (preppedData[key] === 0) {
                zeroData[key] = preppedData[key];
            }
            else {
                valueData[key] = preppedData[key];
            }
        }
        var tooltip = d3.select("body").append("div").attr("class", "toolTip");
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
        function rectWeekFormatting(startWeek, currentWeek) {
            if (currentWeek >= startWeek) {
                return currentWeek - (startWeek);
            }
            else {
                if (currentWeek === 0) {
                    return 52 - startWeek; // connect the last week with the first week
                }
                return currentWeek + (52 - startWeek);
            }
        }
    };
    App.prototype.dateToString = function (date) {
        var year = date.getFullYear();
        var month = this.handleMonthFormatting(date.getMonth() + 1);
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        return String(year) + month + day;
    };
    App.prototype.handleMonthFormatting = function (month) {
        if (month === 0) {
            return String(12);
        }
        else if (month <= 9) {
            return "0" + month;
        }
        else {
            return month;
        }
    };
    App.prototype.render = function () {
        {
            this.state.data !== null ? this.createCalendarView() : "";
        }
        return (React.createElement("div", { className: "App" },
            React.createElement("div", { className: "model-title" },
                React.createElement("p", null, "History Visualizer")),
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