import * as React from 'react';
import { createCalendarViewChart } from "../ts/calendarViewChart";
import {HistoryData, AppState} from "../ts/interface";
import '../css/popupView.css';


export default class PopupView extends React.Component<{}, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            baseURL: null,
            data: null
        };
        this.createCalendarView = this.createCalendarView.bind(this);
    }

    componentDidMount() {
        chrome.tabs.query({'active': true,  'currentWindow' : true}, (tabs) => {
            let currentURL = tabs[0].url as string;
            let pathArray = currentURL.split( '/' );
            let protocol = pathArray[0];
            let host = pathArray[2];
            let urlString = protocol + '//' + host + '/';
            chrome.history.search({
                'text': urlString,
                'maxResults': 1000000,
                'startTime': 0
            },  (results: HistoryData[]) => {
                this.setState({
                    baseURL: host,
                    data: results
                })
            });
        });
    }

    createCalendarView() {
        let data :HistoryData[] = this.state.data as HistoryData[];
        createCalendarViewChart(data, 200, 370, 20);
    }

    openTab() {
        // let currentURL: string = window.location.href;
        // let baseCurrentURL: string = currentURL.replace("index.html", "background.html");
        chrome.tabs.create({url: "background.html"});
    }

    render() {
        console.log(window.location.href);
        {this.state.data !== null ? this.createCalendarView() : ""}
        return (
            <div>
                <div className="model-title">
                    <div className="row">
                        <div className="col-6">
                            <p>
                                History Visualizer
                            </p>
                        </div>
                        <div className="col-6">
                            <button
                                className="button all-history-button"
                                onClick={this.openTab}
                            >
                                View All
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="line"/>
                <div className="container">
                    <div className="form-group">
                        <label>Base URL:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={this.state.baseURL !== null ? this.state.baseURL : " "}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            readOnly={true}
                        />
                    </div>
                    <hr className="line"/>
                    <div className="calendar-view-container"/>
                    <hr className="line"/>
                    <div>
                        <p>
                            Statistic:
                        </p>
                        <p>
                            Total Visits in 3 Months: 999
                        </p>
                        <p>
                            Average Number of Visits Per Week: 999
                        </p>
                        <p>
                            Average Number of Visits Per Month: 999
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
