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
import { getMonthArray, parseDate, weekNumberFormatting } from "../ts/utils";
import { timeFormat, scaleLinear } from 'd3';
var cellSize = 20;
// Calendar Visualization Title
export var title = (React.createElement("text", { transform: "translate(30, -30)", style: { textAnchor: "middle", fontWeight: "bold" } }, "Past 3 Months History"));
// TODO: Fix eslint rule of forbidden multiline JS in JSX when adding a <g> wrapper around text
var DayLabel = /** @class */ (function (_super) {
    __extends(DayLabel, _super);
    function DayLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayLabel.prototype.render = function () {
        var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (weekdays.map(function (day, i) {
            return (React.createElement("text", { key: i, transform: "translate(-5," + cellSize * (i + 1) + ")", dy: (.5 * cellSize / -10) + 0.75 + "em", style: { textAnchor: "end", fontSize: "0.75em" } }, day));
        }));
    };
    return DayLabel;
}(React.Component));
export { DayLabel };
// TODO: Fix eslint rule of forbidden multiline JS in JSX when adding a <g> wrapper around text
var MonthLabel = /** @class */ (function (_super) {
    __extends(MonthLabel, _super);
    function MonthLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthLabel.prototype.render = function () {
        var monthRange = this.props.monthRange;
        var monthsArray = getMonthArray(monthRange);
        return (monthsArray.map(function (month, i) {
            return (React.createElement("text", { key: i, transform: "translate(" + (((i + 1) * (cellSize * 14 / 3)) - (cellSize * 14 / 6)) + ",0)", className: month + "-label", dy: "-.3em", style: { textAnchor: "end", fontSize: "1em" } }, month));
        }));
    };
    return MonthLabel;
}(React.Component));
export { MonthLabel };
var RectLayer = /** @class */ (function (_super) {
    __extends(RectLayer, _super);
    function RectLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RectLayer.prototype.render = function () {
        var _a = this.props, preppedData = _a.preppedData, startDate = _a.startDate, onClickHandler = _a.onClickHandler;
        var day = timeFormat("%w");
        var week = timeFormat("%U");
        var color = scaleLinear()
            .domain([0, 1])
            .range(['#e5e9ed', '#8E71EF']);
        return (Object.keys(preppedData).map(function (date, i) {
            var dateObject = parseDate(date);
            return (React.createElement("rect", { key: i, className: "day", width: cellSize, height: cellSize, x: weekNumberFormatting(week(startDate), Number(week(dateObject))) * cellSize, y: day(dateObject) * cellSize, fill: color(preppedData[date].scaled), onClick: onClickHandler ? onClickHandler : function () { console.log(preppedData[date]); } }));
        }));
    };
    return RectLayer;
}(React.Component));
export { RectLayer };
//# sourceMappingURL=calendarChart.js.map