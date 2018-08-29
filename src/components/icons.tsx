import * as React from 'react';
import '../css/icons.css';

export class Menu extends React.Component<any, any> {
    render() {

        const {
            menuOnClickCallback
        } = this.props;

        return (
            <div className={"menu-icon-container"} onClick={menuOnClickCallback}>
                <div className={"menu-icon-stroke menu-icon-stroke-1"}></div>
                <div className={"menu-icon-stroke"}></div>
                <div className={"menu-icon-stroke"}></div>
            </div>
        );
    }
}
