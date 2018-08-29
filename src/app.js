"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./app.css");
const topNavbar_1 = require("./components/topNavbar");
require("./css/sideNavbar.css");
require("./css/viewRouter.css");
const d3_1 = require("d3");
const axis_1 = require("./components/HourChart/axis");
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "Hour"
        };
        this.updateActiveTabCallback = this.updateActiveTabCallback.bind(this);
    }
    componentDidMount() {
        d3_1.json("./data/data.json", (data) => {
            console.log(data["https://github.com/"]);
            let gitHubData = data["https://github.com/"];
            let testEntry = gitHubData.visits[0];
            console.log(new Date(testEntry.time).toLocaleString(["it-IT"], { hour: "2-digit", minute: "2-digit" }));
        });
    }
    closeSideNavbarCallback(event) {
        let sideNav = document.getElementsByClassName("side-navbar-container")[0];
        sideNav.style.width = "0";
        let containerOverlay = document.getElementsByClassName("app-container-overlay")[0];
        containerOverlay.style.display = "none";
    }
    updateActiveTabCallback(event) {
        let containerDiv = event.target.children[0];
        let targetSpan = containerDiv.children[containerDiv.children.length - 1];
        this.setState({
            activeTab: targetSpan.innerText
        });
        this.closeSideNavbarCallback(event);
    }
    render() {
        return (React.createElement("div", { className: "app-container" },
            React.createElement(topNavbar_1.TopNavbar, { activeTab: this.state.activeTab }),
            React.createElement("div", { className: "view-container" },
                React.createElement("div", { className: "hour-view-container" },
                    React.createElement("div", { className: "card-container" },
                        React.createElement("div", { className: "card-label" }, "base url"),
                        React.createElement("div", { className: "card-content" },
                            React.createElement("img", { className: "card-content-picture", src: "https://plus.google.com/_/favicon?domain_url=http://www.materializecss.com" }),
                            React.createElement("div", { className: "card-content-label" }, "https://materializecss.com"))),
                    React.createElement("div", { className: "card-container" },
                        React.createElement("div", { className: "card-label" }, "options"),
                        React.createElement("div", { className: "card-content " })),
                    React.createElement("div", { className: "card-container" },
                        React.createElement("div", { className: "card-label" }, "visualization"),
                        React.createElement("div", { className: "card-content " },
                            React.createElement("svg", { width: "316px", height: "200px" },
                                React.createElement(axis_1.XAxis, { translation: {
                                        x: 15,
                                        y: 180
                                    } }),
                                React.createElement(axis_1.YAxis, null))))))));
    }
}
exports.App = App;
