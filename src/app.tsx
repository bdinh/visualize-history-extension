import * as React from 'react';
import './app.css';
import {Menu} from "./components/icons";

export class App extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={"app-container"}>
                {/*<div className={"top-navbar-container row"}>*/}
                    {/*<div className={"top-navbar-hamburger-icon-container col s1"}>*/}
                        {/*<i className="material-icons top-navbar-hamburger-icon">menu</i>*/}
                    {/*</div>*/}
                    {/*<div className={"top-navbar-title-container col s11"}>*/}
                        {/*<div className={"top-navbar-title"}>3 Month</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

                <div className={"top-navbar-container"}>
                    <div>
                        <Menu/>
                        <div>
                        History
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
     