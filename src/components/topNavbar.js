"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./topNavbar.css");
const icons_1 = require("./icons");
class TopNavbar extends React.Component {
    render() {
        const { activeTab } = this.props;
        return (React.createElement("div", { className: "top-navbar-container" },
            React.createElement("div", { className: "top-navbar-inline-flex" },
                React.createElement(icons_1.Menu, null),
                React.createElement("div", { className: "top-navbar-title" }, activeTab))));
    }
}
exports.TopNavbar = TopNavbar;
