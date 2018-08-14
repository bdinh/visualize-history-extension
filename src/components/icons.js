"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./icons.css");
class Menu extends React.Component {
    render() {
        return (React.createElement("div", { className: "menu-icon-container" },
            React.createElement("div", { className: "menu-icon-stroke menu-icon-stroke-1" }),
            React.createElement("div", { className: "menu-icon-stroke" }),
            React.createElement("div", { className: "menu-icon-stroke" })));
    }
}
exports.Menu = Menu;
