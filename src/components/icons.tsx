import * as React from 'react';
import './icons.css';

export class Menu extends React.Component<any, any> {
    render() {
        return (
            <div className={"menu-icon-container"}>
                <div className={"menu-icon-stroke menu-icon-stroke-1"}></div>
                <div className={"menu-icon-stroke"}></div>
                <div className={"menu-icon-stroke"}></div>
            </div>
        );
    }
}
