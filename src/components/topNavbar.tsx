import * as React from 'react';
import './topNavbar.css'
import {Menu} from "./icons";

export class TopNavbar extends React.Component<any, any> {

    render() {

        const {
            activeTab
        } = this.props;

        return (
            <div className={"top-navbar-container"}>
                <div className={"top-navbar-inline-flex"}>
                    <Menu/>
                    <div className={"top-navbar-title"}>
                        {activeTab}
                    </div>
                </div>
            </div>
        )
    }
}