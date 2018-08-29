import * as React from 'react';
import './app.css';
import {TopNavbar} from "./components/topNavbar";
import './css/sideNavbar.css'
import {SideNavbar} from "./components/sideNavbar";
import {AppState} from "./types/states/app";
import {tabItemListPrimary, tabItemListSecondary} from "./types/props/sideNavbar";
import {ViewRouter} from "./components/viewRouter";

import './css/viewRouter.css';
import HistoryItem = chrome.history.HistoryItem;
import {HistoryDictionary, HistoryEntry, VisitEntry} from "./types/model";
import VisitItem = chrome.history.VisitItem;
import {json, timeDay} from 'd3'
import {timeParse} from "d3-time-format";
import {XAxis, YAxis} from "./components/HourChart/axis";

export class App extends React.Component<any, AppState>  {
    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: "Hour"
        };

        this.updateActiveTabCallback = this.updateActiveTabCallback.bind(this);
    }

    componentDidMount() {

        json("./data/data.json", (data: HistoryDictionary) => {
            console.log(data["https://github.com/"])

            let gitHubData: HistoryEntry= data["https://github.com/"];
            let testEntry: VisitEntry = gitHubData.visits[0];
            console.log(new Date(testEntry.time).toLocaleString(["it-IT"], {hour: "2-digit", minute: "2-digit"}))


        });


        // let data: HistoryDictionary = {};
        // chrome.history.search({
        //     'text': "",
        //     'maxResults': 1000000,
        //     'startTime': 0
        // },  (historyItemArray: HistoryItem[]) => {
        //     historyItemArray.forEach((historyItem: HistoryItem) => {
        //         chrome.history.getVisits({
        //             "url": historyItem.url
        //         }, (visitItemArray: VisitItem[]) => {
        //             visitItemArray.forEach((visitItem: VisitItem) => {
        //                 let newVisitEntry: VisitEntry = {
        //                     id: visitItem.visitId,
        //                     time: visitItem.visitTime
        //                 };
        //                 if (data[historyItem.url] !== undefined) {
        //                     data[historyItem.url].visits.push(newVisitEntry);
        //                 } else {
        //                     let newHistoryEntry: HistoryEntry = {
        //                         id: historyItem.id,
        //                         title: historyItem.title,
        //                         url: historyItem.url,
        //                         visitCount: historyItem.visitCount,
        //                         visits: []
        //                     };
        //                     newHistoryEntry.visits.push(newVisitEntry);
        //                     data[historyItem.url] = newHistoryEntry;
        //                 }
        //             });
        //         });
        //     });
        //     console.log(data);
        // });


    }

    closeSideNavbarCallback(event: any) {
        let sideNav = document.getElementsByClassName("side-navbar-container")[0] as HTMLDivElement;
        sideNav.style.width = "0";

        let containerOverlay = document.getElementsByClassName("app-container-overlay")[0] as HTMLDivElement;
        containerOverlay.style.display = "none";
    }

    updateActiveTabCallback(event: any) {
        let containerDiv: HTMLDivElement = event.target.children[0];
        let targetSpan = containerDiv.children[containerDiv.children.length - 1] as HTMLSpanElement;

        this.setState({
            activeTab: targetSpan.innerText
        });

        this.closeSideNavbarCallback(event);
    }

    render() {

        return (
            <div className={"app-container"}>
                {/*<div className={"app-container-overlay"} onClick={ e => this.closeSideNavbarCallback(e)}/>*/}
                <TopNavbar
                    activeTab={this.state.activeTab}
                />
                {/*<SideNavbar*/}
                    {/*profileOverviewAvatarInitialsLabel={"BD"}*/}
                    {/*profileOverviewProfileEmail={"baodinh96@gmail.com"}*/}
                    {/*profileOverviewProfileName={"Bao Dinh"}*/}
                    {/*tabItemOnClickCallback={this.updateActiveTabCallback}*/}
                    {/*tabItemListPrimary={tabItemListPrimary}*/}
                    {/*tabItemListSecondary={tabItemListSecondary}*/}
                {/*/>*/}
                {/*<ViewRouter*/}
                    {/*activeTab={this.state.activeTab}*/}
                {/*/>*/}

                <div className={"view-container"}>
                <div className={"hour-view-container"}>
                    {/*<div className={"margin-top"}>*/}
                    {/*</div>*/}

                    <div className={"card-container"}>
                        <div className={"card-label"}>
                            base url
                        </div>
                        <div className={"card-content"}>
                            <img className={"card-content-picture"} src="https://plus.google.com/_/favicon?domain_url=http://www.materializecss.com"/>
                            <div className={"card-content-label"}>https://materializecss.com</div>
                        </div>
                    </div>

                    <div className={"card-container"}>
                        <div className={"card-label"}>
                            options
                        </div>
                        <div className={"card-content "}>

                        </div>
                    </div>

                    <div className={"card-container"}>
                        <div className={"card-label"}>
                            visualization
                        </div>
                        <div className={"card-content "}>
                            <svg width={"316px"} height={"200px"}>
                                <XAxis
                                    translation={{
                                        x: 15,
                                        y: 180
                                    }}
                                />
                                <YAxis

                                />
                            </svg>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        );
    }
}
     