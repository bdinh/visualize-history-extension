import * as React from 'react';
import './app.css';
import {TopNavbar} from "./components/topNavbar";

import './components/sideNavbar.css'
import {ProfileOverview} from "./components/profileOverview";

export class App extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={"app-container"}>
                <div className={"app-container-overlay"}>

                </div>
                <TopNavbar
                    activeTab={"History"}
                />
                <div className={"side-navbar-container"}>
                    <div className={"profile-overview-container"}>
                        {/*<div className={"profile-picture-container"}>*/}
                            {/*<img  className={"side-navbar-profile-picture"} src={"../src/assets/bao-profile-picture.JPG"}/>*/}
                        {/*</div>*/}

                        {/*<div className={"profile-picture-container"}>*/}
                            {/*<div className={"avatar-default-container"}>*/}
                                {/*BD*/}
                            {/*</div>*/}
                        {/*/!*</div>*!/*/}
                        {/*<div className={"profile-name-container"}>*/}
                            {/*Bao Dinh*/}
                        {/*</div>*/}

                        {/*<div className={"profile-email-container"}>*/}
                            {/*baodinh96@gmail.com*/}
                        {/*</div>*/}

                        <ProfileOverview
                            avatarInitialsLabel={"BD"}
                            profileName={"Bao Dinh"}
                            profileEmail={"baodinh96@gmail.com"}/>

                    </div>

                    <div className={"tab-item-container"}>
                        Today
                    </div>
                    <div className={"tab-item-container"}>

                    </div>
                    <div className={"tab-item-container"}>

                    </div>
                    <div className={"tab-item-container"}>

                    </div>


                </div>


            </div>
        );
    }
}
     