import * as React from 'react';
import './css/App.css';
import { AppState } from "./ts/interface";
// import HistoryDashView from './components/historyDashView';
import { HistoryData } from "./ts/interface";
import PopupView from "./components/popupView";
import VisitItem = chrome.history.VisitItem;

class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            baseURL: null,
            data: null,
            yearRange: [],
            monthRange: [],
            startDate: new Date(),
            endDate: new Date(),
            dictionary: {},
            preppedData: {}
        };
    }

    componentDidMount() {
            // chrome.history.search({
            //     'text': "",
            //     'maxResults': 1000000,
            //     'startTime': 0
            // },  (results: HistoryData[]) => {
            //     this.setState({
            //         baseURL: "",
            //         data: results
            //     });
            // });

        let baseURLVisits: VisitItem[] = [];
        chrome.tabs.query({'active': true,  'currentWindow' : true}, (tabs) => {
            let currentURL = tabs[0].url as string;
            let pathArray = currentURL.split( '/' );
            let baseURL = pathArray[0] + "//" + pathArray[2];
            chrome.history.search({
                'text': baseURL,
                'maxResults': 1000000,
                'startTime': 0
            },  (results: HistoryData[]) => {
                let filteredResult = {};
                results.forEach((historyItem) => {

                    let urlArray = historyItem.url.split('/');
                    let historyItemBaseURL = urlArray[0] + "//" + urlArray[2];
                    if ((filteredResult[historyItem.url] !== null || filteredResult[historyItem.url] !== undefined) && historyItemBaseURL.match(baseURL)) {
                        filteredResult[historyItem.url] = historyItem;
                    }
                });

                // let baseURLVisits: VisitItem[] = [];
                Object.keys(filteredResult).forEach((url) => {
                    chrome.history.getVisits({url: url}, (visit) => {
                        baseURLVisits = baseURLVisits.concat(visit);
                    })
                });

                console.log(filteredResult);

                // this.setState({
                //     baseURL: host,
                //     data: results
                // })

            });
        });

        console.log(baseURLVisits);


    }

    render() {

        return (
            <div className="App">
                <PopupView/>
                {/*<HistoryDashView queryResult={this.state.data}/>*/}
                <div className="toolTip"/>
             </div>
        );
    }
}

export default App;
