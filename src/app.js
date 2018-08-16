"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./app.css");
const topNavbar_1 = require("./components/topNavbar");
require("./components/sideNavbar.css");
const profileOverview_1 = require("./components/profileOverview");
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "app-container" },
            React.createElement("div", { className: "app-container-overlay" }),
            React.createElement(topNavbar_1.TopNavbar, { activeTab: "History" }),
            React.createElement("div", { className: "side-navbar-container" },
                React.createElement("div", { className: "profile-overview-container" },
                    React.createElement(profileOverview_1.ProfileOverview, { avatarInitialsLabel: "BD", profileName: "Bao Dinh", profileEmail: "baodinh96@gmail.com" })),
                React.createElement("div", { className: "tab-item-container" }, "Today"),
                React.createElement("div", { className: "tab-item-container" }),
                React.createElement("div", { className: "tab-item-container" }),
                React.createElement("div", { className: "tab-item-container" }))));
    }
}
exports.App = App;
