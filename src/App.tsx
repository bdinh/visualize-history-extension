import * as React from 'react';
import './css/App.css';
import { AppState } from "./ts/interface";
// import HistoryDashView from './components/historyDashView';
// import { HistoryData } from "./ts/interface";
import PopupView from "./components/popupView";

class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            baseURL: null,
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
