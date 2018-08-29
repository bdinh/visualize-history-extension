import * as React from 'react';
import {ViewRouterProps} from "../types/props/viewRouter";

export class ViewRouter extends React.Component<ViewRouterProps, any> {
    renderActiveView() {
        switch (this.props.activeTab) {
            case "Hour":
                return (
                    <div>Hour</div>
                );
            case "Day":
                return (
                    <div>Day</div>
                );
            case "Week":
                return (
                    <div>Week</div>
                );
            case "Month":
                return (
                    <div>Month</div>
                );
            case "Statistics":
                return (
                    <div>Statistics</div>
                );
            case "All History":
                return (
                    <div>All History</div>
                );
            case "Setting":
                return (
                    <div>Setting</div>
                );
            case "Help & Send Feedback":
                return (
                    <div>Help & Send Feedback</div>
                );
            case "Support":
                return (
                    <div>Support</div>
                );
            default:
                null
        }
    }

    render() {
        return(
            <div>
                {this.renderActiveView()}
            </div>
        );
    }

}

export class Card extends React.Component<any, any> {


}