"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../css/topNavbar.css");
class TopNavbar extends React.Component {
    render() {
        const { activeTab, } = this.props;
        return (React.createElement("div", { className: "top-navbar-container" },
            React.createElement("div", { className: "top-navbar-inline-flex" },
                React.createElement(Menu, null),
                React.createElement("div", { className: "top-navbar-title" }, activeTab))));
    }
}
exports.TopNavbar = TopNavbar;
class Menu extends React.Component {
    openSideNavbarCallback(event) {
        let sideNav = document.getElementsByClassName("side-navbar-container")[0];
        sideNav.style.width = "275px";
        let containerOverlay = document.getElementsByClassName("app-container-overlay")[0];
        containerOverlay.style.display = "block";
    }
    render() {
        const {} = this.props;
        return (React.createElement("div", { className: "menu-icon-container", onClick: e => this.openSideNavbarCallback(e) },
            React.createElement("div", { className: "menu-icon-stroke menu-icon-stroke-1" }),
            React.createElement("div", { className: "menu-icon-stroke" }),
            React.createElement("div", { className: "menu-icon-stroke" })));
    }
}
