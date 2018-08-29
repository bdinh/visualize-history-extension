"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class ViewRouter extends React.Component {
    renderActiveView() {
        switch (this.props.activeTab) {
            case "Hour":
                return (React.createElement("div", null, "Hour"));
            case "Day":
                return (React.createElement("div", null, "Day"));
            case "Week":
                return (React.createElement("div", null, "Week"));
            case "Month":
                return (React.createElement("div", null, "Month"));
            case "Statistics":
                return (React.createElement("div", null, "Statistics"));
            case "All History":
                return (React.createElement("div", null, "All History"));
            case "Setting":
                return (React.createElement("div", null, "Setting"));
            case "Help & Send Feedback":
                return (React.createElement("div", null, "Help & Send Feedback"));
            case "Support":
                return (React.createElement("div", null, "Support"));
            default:
                null;
        }
    }
    render() {
        return (React.createElement("div", null, this.renderActiveView()));
    }
}
exports.ViewRouter = ViewRouter;
class Card extends React.Component {
}
exports.Card = Card;
