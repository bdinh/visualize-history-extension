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
import FontAwesome from 'react-fontawesome';
import 'css/historyDashView.css';
import { createCalendarViewChart } from "../ts/calendarViewChart";
import * as d3 from 'd3';
import * as moment from 'moment';
import * as $ from 'jquery';
import { getHistoryFromDate } from "../ts/utils";
import { HistoryItem } from "./historyItem";
var HistoryDashView = /** @class */ (function (_super) {
    __extends(HistoryDashView, _super);
    function HistoryDashView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            searchTerm: "",
            data: [],
            selected: "",
            maxShow: 10,
        };
        _this.handleSearchInput = _this.handleSearchInput.bind(_this);
        _this.createCalendarView = _this.createCalendarView.bind(_this);
        _this.updateSelected = _this.updateSelected.bind(_this);
        _this.updateMaxShow = _this.updateMaxShow.bind(_this);
        return _this;
    }
    HistoryDashView.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props !== null) {
            if (this.props !== nextProps) {
                this.setState({
                    data: nextProps.queryResult
                });
            }
        }
    };
    HistoryDashView.prototype.handleSearchInput = function (event) {
        var inputString = event.target.value;
        var result = this.props.queryResult.filter(function (obj) {
            var title = obj.title;
            var url = obj.url;
            return (title.match(inputString) || url.match(inputString));
        });
        this.setState({
            searchTerm: event.target.value,
            data: result
        });
    };
    HistoryDashView.prototype.createCalendarView = function () {
        d3.select('.calendar-svg').remove();
        var data = this.state.data;
        var calendarContainer = d3.select('.calendar-view-container').node();
        createCalendarViewChart(data, calendarContainer.getBoundingClientRect().height, calendarContainer.getBoundingClientRect().width, 30, this.updateSelected);
    };
    HistoryDashView.prototype.updateSelected = function (dateString) {
        this.setState({
            selected: dateString
        });
    };
    HistoryDashView.prototype.renderHistoryList = function () {
        var renderData = this.state.data.splice(0, this.state.maxShow + 1);
        if (this.state.selected !== "") {
            var filteredData = getHistoryFromDate(d3.timeParse("%Y%m%d")(this.state.selected), this.state.data);
            renderData = filteredData.splice(0, this.state.maxShow + 1);
        }
        return renderData.map(function (historyItem, key) {
            return React.createElement(HistoryItem, { key: key, data: historyItem });
        });
    };
    HistoryDashView.prototype.updateMaxShow = function () {
        this.setState({
            maxShow: this.state.maxShow + 10
        });
    };
    HistoryDashView.prototype.render = function () {
        var _this = this;
        $(window).scroll(function () {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                _this.updateMaxShow();
            }
        });
        this.state.data.length !== 0 ? this.createCalendarView() : "";
        return (React.createElement("div", { className: "history-dash-view" },
            React.createElement("div", { className: "top-utility-bar" },
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-3 search-bar-title-container" },
                        React.createElement("p", { className: "search-bar-title" }, "History")),
                    React.createElement("div", { className: "col-9 search-bar-container" },
                        React.createElement("input", { type: "text", className: "form-control search-input", placeholder: "Search history", "aria-describedby": "basic-addon1", onChange: this.handleSearchInput }),
                        React.createElement(FontAwesome, { className: "search-icon", name: "search" })))),
            React.createElement("div", { className: "visualization-container row" },
                React.createElement("div", { className: "visualization-sidemenu col-3" },
                    React.createElement("div", null,
                        React.createElement("p", null, "Chrome History"))),
                React.createElement("div", { className: "visualization-dashboard col-9" },
                    React.createElement("div", { className: "calendar-view-container" }),
                    React.createElement("div", { className: "history-list-container" },
                        React.createElement("div", { className: "selected-date-title-container" },
                            React.createElement("p", { className: "selected-date-title" },
                                "Showing:",
                                this.state.selected === "" ? " All Dates" : " " + moment(this.state.selected).format('MMM Do, YYYY'))),
                        React.createElement("div", { className: "history-list" }, this.renderHistoryList()))))));
    };
    return HistoryDashView;
}(React.Component));
export default HistoryDashView;
//# sourceMappingURL=historyDashView.js.map