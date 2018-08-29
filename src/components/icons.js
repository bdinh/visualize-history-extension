"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../css/icons.css");
class Menu extends React.Component {
    render() {
        const { menuOnClickCallback } = this.props;
        return (React.createElement("div", { className: "menu-icon-container", onClick: menuOnClickCallback },
            React.createElement("div", { className: "menu-icon-stroke menu-icon-stroke-1" }),
            React.createElement("div", { className: "menu-icon-stroke" }),
            React.createElement("div", { className: "menu-icon-stroke" })));
    }
}
exports.Menu = Menu;
