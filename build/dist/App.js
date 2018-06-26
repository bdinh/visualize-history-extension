var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import './css/App.css';
import PopupView from "./components/popupView";
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            baseURL: null,
            data: null,
            yearRange: [],
            monthRange: [],
            startDate: new Date(),
            endDate: new Date(),
            dictionary: {},
            preppedData: {}
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
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
        var baseURLVisits = [];
        chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
            var currentURL = tabs[0].url;
            var pathArray = currentURL.split('/');
            var baseURL = pathArray[0] + "//" + pathArray[2];
            chrome.history.search({
                'text': baseURL,
                'maxResults': 1000000,
                'startTime': 0
            }, function (results) {
                var filteredResult = {};
                results.forEach(function (historyItem) {
                    var urlArray = historyItem.url.split('/');
                    var historyItemBaseURL = urlArray[0] + "//" + urlArray[2];
                    if ((filteredResult[historyItem.url] !== null || filteredResult[historyItem.url] !== undefined) && historyItemBaseURL.match(baseURL)) {
                        filteredResult[historyItem.url] = historyItem;
                    }
                });
                // let baseURLVisits: VisitItem[] = [];
                Object.keys(filteredResult).forEach(function (url) {
                    chrome.history.getVisits({ url: url }, function (visit) {
                        baseURLVisits = baseURLVisits.concat(visit);
                    });
                });
                console.log(filteredResult);
                // this.setState({
                //     baseURL: host,
                //     data: results
                // })
            });
        });
        console.log(baseURLVisits);
    };
    App.prototype.render = function () {
        return (React.createElement("div", { className: "App" },
            React.createElement(PopupView, null),
            React.createElement("div", { className: "toolTip" })));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map