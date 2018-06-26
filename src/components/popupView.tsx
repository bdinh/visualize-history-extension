import * as React from 'react';
import { json } from 'd3';
import { createCalendarViewChart } from "../ts/calendarViewChart";
import {HistoryData, AppState, SummaryData, DateCount} from "../ts/interface";
import '../css/popupView.css';
import {
    calculateVisitSummary, dateToString, parseDate,
    getDateCountDictionary, getYearRange, getMonthRange, getAllDatesArray, formatDateCountArray
} from "../ts/utils";

import { title, DayLabel, MonthLabel, RectLayer} from "./calendarChart";


export default class PopupView extends React.Component<{}, AppState> {

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


        this.createCalendarView = this.createCalendarView.bind(this);
    }

    componentDidMount() {
        json('./data/data.json', (data) => {

            let result: HistoryData[] = data.filter((obj: HistoryData) => {
                // let title: string = obj.title;

                // let pathArray = obj.url.split( '/' );
                // let host = pathArray[2];

                let url: string = obj.url;
                return (url.match("www.facebook.com"));
            });

            console.log(result);

            let startDate: Date = new Date(data[data.length - 1].lastVisitTime);
            let startDateString :string = dateToString(startDate);
            startDate = parseDate(startDateString);

            let endDate: Date = new Date(data[0].lastVisitTime);
            let endDateString :string = dateToString(endDate);
            endDate = parseDate(endDateString);

            let dictionary = getDateCountDictionary(data);
            let yearRange :number[] = getYearRange(startDate, endDate);
            let monthRange :number[] = getMonthRange(startDate, endDate, dictionary);

            let allDates: Date[] = getAllDatesArray(startDate, endDate);
            let dateCountArray:DateCount[] = formatDateCountArray(allDates, dictionary);
            let maxVisit = dateCountArray.reduce((max, currentValue) => {
                return max.value > currentValue.value ? max : currentValue;
            });

            let preppedData = {};
            dateCountArray.forEach((obj) => {
                preppedData[obj.date] = {};
                preppedData[obj.date].scaled = Math.sqrt(obj.value / maxVisit.value);
                preppedData[obj.date].initial = obj.value;
            });

            this.setState({
                yearRange: yearRange,
                monthRange: monthRange,
                startDate: startDate,
                endDate: endDate,
                dictionary: dictionary,
                preppedData: preppedData
            });

            this.setState({
                baseURL: "test",
                data: data
            });

            json('./data/visitData.json', (data) => {
                console.log(data);
            })

        });


        chrome.tabs.query({'active': true,  'currentWindow' : true}, (tabs) => {
            let currentURL = tabs[0].url as string;
            let pathArray = currentURL.split( '/' );
            // let protocol = pathArray[0];
            // let host = pathArray[2];
            // let urlString = protocol + '//' + host + '/';
            console.log(pathArray)
            // chrome.history.search({
            //     'text': urlString,
            //     'maxResults': 1000000,
            //     'startTime': 0
            // },  (results: HistoryData[]) => {
            //     this.setState({
            //         baseURL: host,
            //         data: results
            //     })
            // });
        });
    }

    createCalendarView() {
        let data :HistoryData[] = this.state.data as HistoryData[];
        // console.log(calculateVisitSummary(data));
        // console.log(calculateTotalMonths(data));
        createCalendarViewChart(data, 200, 370, 20);
    }

    openTab() {
        chrome.tabs.create({url: "background.html"});
    }

    render() {
        {this.state.data !== null ? this.createCalendarView() : ""}

        let summaryData: SummaryData | null = null;
        if (this.state.data !== null) {
            summaryData = calculateVisitSummary(this.state.data);
        }


        // console.log(this.state.dictionary);
        // console.log(dateCountArray);
        // console.log(test);

        return (
            <div className="row">
                {/*<div className="viz-1">*/}
                    {/*<div className="model-title">*/}
                        {/*<div className="row">*/}
                            {/*<div className="col-6">*/}
                                {/*<p>*/}
                                    {/*History Visualizer*/}
                                {/*</p>*/}
                            {/*</div>*/}
                            {/*<div className="col-6">*/}
                                {/*<button*/}
                                    {/*className="button all-history-button"*/}
                                    {/*onClick={this.openTab}*/}
                                {/*>*/}
                                    {/*View All*/}
                                {/*</button>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<hr className="line"/>*/}
                    {/*<div className="container">*/}
                        {/*<div className="form-group">*/}
                            {/*<label>Base URL:</label>*/}
                            {/*<input*/}
                                {/*type="text"*/}
                                {/*className="form-control"*/}
                                {/*placeholder={this.state.baseURL !== null ? this.state.baseURL : " "}*/}
                                {/*aria-label="Username"*/}
                                {/*aria-describedby="basic-addon1"*/}
                                {/*readOnly={true}*/}
                            {/*/>*/}
                        {/*</div>*/}
                        {/*<hr className="line"/>*/}
                        {/*<div className="calendar-view-container"/>*/}
                        {/*<hr className="line"/>*/}
                        {/*<div>*/}
                            {/*<p>*/}
                                {/*Statistic:*/}
                            {/*</p>*/}
                            {/*<p>*/}
                                {/*Total Visits in 3 Months: {summaryData !== null ?  summaryData.totalVisit: 0}*/}
                            {/*</p>*/}
                            {/*<p>*/}
                                {/*Average Number of Visits Per Week: {summaryData !== null ? summaryData.weeklyVisit : 0}*/}
                            {/*</p>*/}
                            {/*<p>*/}
                                {/*Average Number of Visits Per Month: {summaryData !== null ? summaryData.monthlyVisit : 0}*/}
                            {/*</p>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="viz-2">
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
                        <div className="calendar-view-container">
                            <svg height={200} width={370} className="calendar-svg">
                                <g transform={"translate(" + (370 / 6) + "," + 200 * 0.25 + ")"}>
                                    {title}
                                    <DayLabel/>
                                    <MonthLabel monthRange={this.state.monthRange}/>
                                    <RectLayer preppedData={this.state.preppedData} startDate={this.state.startDate}/>
                                </g>
                            </svg>

                        </div>
                        <hr className="line"/>
                        <div>
                            <p>
                                Statistic:
                            </p>
                            <p>
                                Total Visits in 3 Months: {summaryData !== null ?  summaryData.totalVisit: 0}
                            </p>
                            <p>
                                Average Number of Visits Per Week: {summaryData !== null ? summaryData.weeklyVisit : 0}
                            </p>
                            <p>
                                Average Number of Visits Per Month: {summaryData !== null ? summaryData.monthlyVisit : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

