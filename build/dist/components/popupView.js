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
import { json } from 'd3';
import { createCalendarViewChart } from "../ts/calendarViewChart";
import '../css/popupView.css';
import { calculateVisitSummary, dateToString, parseDate, getDateCountDictionary, getYearRange, getMonthRange, getAllDatesArray, formatDateCountArray } from "../ts/utils";
import { title, DayLabel, MonthLabel, RectLayer } from "./calendarChart";
var PopupView = /** @class */ (function (_super) {
    __extends(PopupView, _super);
    function PopupView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            baseURL: null,
            data: null,
            yearRange: [],
            monthRange: [],
            startDate: new Date(),
            endDate: new Date(),
            dictionary: {},
            preppedData: {}
        };
        _this.createCalendarView = _this.createCalendarView.bind(_this);
        return _this;
    }
    PopupView.prototype.componentDidMount = function () {
        var _this = this;
        json('./data/data.json', function (data) {
            var result = data.filter(function (obj) {
                // let title: string = obj.title;
                // let pathArray = obj.url.split( '/' );
                // let host = pathArray[2];
                var url = obj.url;
                return (url.match("www.facebook.com"));
            });
            console.log(result);
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
            var maxVisit = dateCountArray.reduce(function (max, currentValue) {
                return max.value > currentValue.value ? max : currentValue;
            });
            var preppedData = {};
            dateCountArray.forEach(function (obj) {
                preppedData[obj.date] = {};
                preppedData[obj.date].scaled = Math.sqrt(obj.value / maxVisit.value);
                preppedData[obj.date].initial = obj.value;
            });
            _this.setState({
                yearRange: yearRange,
                monthRange: monthRange,
                startDate: startDate,
                endDate: endDate,
                dictionary: dictionary,
                preppedData: preppedData
            });
            _this.setState({
                baseURL: "test",
                data: data
            });
            json('./data/visitData.json', function (data) {
                console.log(data);
            });
        });
        chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
            var currentURL = tabs[0].url;
            var pathArray = currentURL.split('/');
            // let protocol = pathArray[0];
            // let host = pathArray[2];
            // let urlString = protocol + '//' + host + '/';
            console.log(pathArray);
            // chrome.history.search({
            //     'text': urlString,
            //     'maxResults': 1000000,
            //     'startTime': 0
            // },  (results: HistoryData[]) => {
            //     this.setState({
            //         baseURL: host,
            //         data: results
            //     })
            // });
        });
    };
    PopupView.prototype.createCalendarView = function () {
        var data = this.state.data;
        // console.log(calculateVisitSummary(data));
        // console.log(calculateTotalMonths(data));
        createCalendarViewChart(data, 200, 370, 20);
    };
    PopupView.prototype.openTab = function () {
        chrome.tabs.create({ url: "background.html" });
    };
    PopupView.prototype.render = function () {
        {
            this.state.data !== null ? this.createCalendarView() : "";
        }
        var summaryData = null;
        if (this.state.data !== null) {
            summaryData = calculateVisitSummary(this.state.data);
        }
        // console.log(this.state.dictionary);
        // console.log(dateCountArray);
        // console.log(test);
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "viz-2" },
                React.createElement("div", { className: "model-title" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-6" },
                            React.createElement("p", null, "History Visualizer")),
                        React.createElement("div", { className: "col-6" },
                            React.createElement("button", { className: "button all-history-button", onClick: this.openTab }, "View All")))),
                React.createElement("hr", { className: "line" }),
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", null, "Base URL:"),
                        React.createElement("input", { type: "text", className: "form-control", placeholder: this.state.baseURL !== null ? this.state.baseURL : " ", "aria-label": "Username", "aria-describedby": "basic-addon1", readOnly: true })),
                    React.createElement("hr", { className: "line" }),
                    React.createElement("div", { className: "calendar-view-container" },
                        React.createElement("svg", { height: 200, width: 370, className: "calendar-svg" },
                            React.createElement("g", { transform: "translate(" + (370 / 6) + "," + 200 * 0.25 + ")" },
                                title,
                                React.createElement(DayLabel, null),
                                React.createElement(MonthLabel, { monthRange: this.state.monthRange }),
                                React.createElement(RectLayer, { preppedData: this.state.preppedData, startDate: this.state.startDate })))),
                    React.createElement("hr", { className: "line" }),
                    React.createElement("div", null,
                        React.createElement("p", null, "Statistic:"),
                        React.createElement("p", null,
                            "Total Visits in 3 Months: ",
                            summaryData !== null ? summaryData.totalVisit : 0),
                        React.createElement("p", null,
                            "Average Number of Visits Per Week: ",
                            summaryData !== null ? summaryData.weeklyVisit : 0),
                        React.createElement("p", null,
                            "Average Number of Visits Per Month: ",
                            summaryData !== null ? summaryData.monthlyVisit : 0))))));
    };
    return PopupView;
}(React.Component));
export default PopupView;
//# sourceMappingURL=popupView.js.map