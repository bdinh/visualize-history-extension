"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./app.css");
const icons_1 = require("./components/icons");
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "app-container" },
            React.createElement("div", { className: "top-navbar-container" },
                React.createElement("div", null,
                    React.createElement(icons_1.Menu, null),
                    React.createElement("div", null, "History")))));
    }
}
exports.App = App;
