import * as React from 'react';
import '../css/topNavbar.css'
import {MenuProps} from "../types/props/topNavbar";

export class TopNavbar extends React.Component<any, any> {

    render() {

        const {
            activeTab,
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

class Menu extends React.Component<MenuProps, any> {

    openSideNavbarCallback(event: any) {
        let sideNav = document.getElementsByClassName("side-navbar-container")[0] as HTMLDivElement;
        sideNav.style.width = "275px";

        let containerOverlay = document.getElementsByClassName("app-container-overlay")[0] as HTMLDivElement;
        containerOverlay.style.display = "block";

    }

    render() {

        const {

        } = this.props;



        return (
            <div className={"menu-icon-container"} onClick={e => this.openSideNavbarCallback(e)}>
                <div className={"menu-icon-stroke menu-icon-stroke-1"}></div>
                <div className={"menu-icon-stroke"}></div>
                <div className={"menu-icon-stroke"}></div>
            </div>
        );
    }
}
