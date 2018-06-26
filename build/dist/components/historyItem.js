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
import * as moment from 'moment';
var HistoryItem = /** @class */ (function (_super) {
    __extends(HistoryItem, _super);
    function HistoryItem(props) {
        return _super.call(this, props) || this;
    }
    HistoryItem.prototype.render = function () {
        var pathArray = this.props.data.url.split('/');
        var protocol = pathArray[0];
        var host = pathArray[2];
        return (React.createElement("div", { className: "list-item row" },
            React.createElement("div", { className: "item-time col-2" },
                React.createElement("p", null, moment(new Date(this.props.data.lastVisitTime)).startOf('hour').fromNow())),
            React.createElement("div", { className: "item-icon col-1" },
                React.createElement("img", { className: "item-icon", src: "chrome://favicon/" + protocol + host })),
            React.createElement("div", { className: "item-url col-9" },
                React.createElement("div", { className: "item-title-container" },
                    React.createElement("a", { className: "item-link", href: this.props.data.url },
                        React.createElement("p", { className: "item-title" }, this.props.data.title === "" ? this.props.data.url : this.props.data.title))))));
    };
    return HistoryItem;
}(React.Component));
export { HistoryItem };
//# sourceMappingURL=historyItem.js.map