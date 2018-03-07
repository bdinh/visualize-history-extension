import * as React from 'react';
import './App.css';
import * as d3 from 'd3';
import * as $ from 'jquery';
import * as moment from 'moment';
import {
    dateToString, weekNumberFormatting, formatDateCountArray, getAllDatesArray, getYearRange,
    getDateCountDictionary, getMonthRange
} from "./ts/utils";
import { Test, RawHistoryData, DateCount } from "./ts/interface";

class App extends React.Component<{}, Test> {
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
            },  (results: RawHistoryData[]) => {
                this.setState({
                    baseURL: host,
                    data: results
                })
            });
        });
    }

    createCalendarView() {
        let data :RawHistoryData[] = this.state.data as RawHistoryData[];

        console.log(data);
        let day = d3.timeFormat("%w");
        let week = d3.timeFormat("%U");
        // let percent = d3.format(".1%");
        let format = d3.timeFormat("%Y%m%d");
        let parseDate = d3.timeParse("%Y%m%d");


        let startDate: Date = new Date(data[data.length - 1].lastVisitTime);
        let startDateString :string = dateToString(startDate);
        startDate = parseDate(startDateString);
        let endDate: Date = new Date(data[0].lastVisitTime);
        let endDateString :string = dateToString(endDate);
        endDate = parseDate(endDateString);

        let dictionary = getDateCountDictionary(data);
        let yearRange :number[] = getYearRange(startDate, endDate);
        let monthRange :number[] = getMonthRange(startDate, endDate, dictionary);

        // let startMonthValue = startDate.getMonth();
        // while (startMonthValue !== endDate.getMonth() + 1) {
        //     monthRange.push(startMonthValue);
        //     startMonthValue = (startMonthValue + 1) % 12;
        // }
        // // yearRange.reverse();
        // //
        // if (Object.keys(dictionary).length < 28 * monthRange.length) {
        //     // remove the first month in array due to the fact that we may not have enough data on it
        //     // needs fixing in order to count for distribution but should always work with chrome data
        //     monthRange.splice(monthRange.length - 1, 1);
        // }

        let rectData :Date[] = getAllDatesArray(startDate, endDate);


        let dateCountArray :DateCount[] = formatDateCountArray(rectData, dictionary);

        let width = $('.calendar-view').width();
        let height = 200;
        let cellSize = 20;
        let weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        let monthFormat :string[] = [];
        monthRange.forEach((index) => {
            monthFormat.push(month[index])
        });

        let color = d3.scaleLinear()
            .domain([0, 1])
            .range(['#e5e9ed', '#002b51']);


        let svg = d3.select(".calendar-view").selectAll("svg")
            .data(d3.range(yearRange[0], yearRange[yearRange.length - 1],))
            .enter().append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "RdYlGn")
            .append("g")
            .attr("transform", "translate(" + "50" + "," + (height - cellSize * 7 - 1) + ")");

        // Should I keep Year?
        svg.append("text")
            .attr("transform", "translate(30, -35)")
            .style("text-anchor", "middle")
            .text(function(d) { return "Past 3 Month History"; });

        for (let i=0; i<7; i++)
        {
            svg.append("text")
                .attr("transform", "translate(-5," + cellSize*(i+1) + ")")
                .style("text-anchor", "end")
                .style("font-size", "0.75em")
                .attr("dy", "-.25em")
                .text(function(d) { return weekdays[i]; });
        }

        let rect = svg.selectAll(".day")
            .data(rectData)
            .enter()
            .append("rect")
            .attr("class", "day")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", (d) => { return weekNumberFormatting(week(startDate), Number(week(d))) * cellSize; })
            .attr("y", (d) => { return day(d) * cellSize; })
            .attr("fill",'#ebedf0')
            .datum(format);

        console.log(rect);

        let legend = svg.selectAll(".legend")
            .data(monthFormat)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(" + (((i) * 75)+75) + ",-5)"; });

        legend.append("text")
            .attr("class", function(d,i){ return monthFormat[i] })
            .style("text-anchor", "end")
            .style("font-size", "1em")
            .attr("dy", "-.3em")
            .text(function(d,i){ return monthFormat[i] });

        let maxVisitCount = d3.max(dateCountArray, (d) => { return d.value});
        let preppedData :Object= d3.nest()
            .key((d) => { return d.date; })
            .rollup((d) => { return Math.sqrt(d[0].value / maxVisitCount); })
            .map(dateCountArray);


        let tooltip = d3.select("body").append("div").attr("class", "toolTip");
        console.log(preppedData);
        console.log(dictionary);
        rect.filter(function(d) { return preppedData["$" + d] >= 0 })
            .attr("fill", function(d) { return color(preppedData["$" + d]); })
            .on('mouseover', (d) => {
                d3.select(d3.event.path[0])
                    .style('stroke', 'black');
                let shift = 0;
                if (d3.event.pageX > 175) {
                    shift = -150
                }
                let hoverExpression = "Visit";
                let clickValue = 0;
                if (dictionary[d] !== undefined) {
                    clickValue = dictionary[d];
                    hoverExpression = "Visits";
                }
                tooltip
                    .style("left", d3.event.pageX + shift + "px")
                    .style("top", d3.event.pageY + "px")
                    .style("display", "inline-block")
                    .html(clickValue + " " + hoverExpression + " on " + "<span class='hover-date'>" + moment(d).format('MMM Do, YYYY') + "</span>")

            })
            .on('mouseout', (d) => {
                d3.select(d3.event.path[0])
                    .style('stroke', 'white');
                tooltip
                    .style('display', 'none');
            });
    }

    handleClick() {
        console.log("hellllooooo");
    }

    render() {
        {this.state.data !== null ? this.createCalendarView() : ""}

        return (
            <div className="App">
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
                                onClick={this.handleClick}
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
                    <div className="calendar-view">
                        {/*{this.state.data !== null ? this.state.data[0].id : "No Data"}*/}
                    </div>
                    <hr className="line"/>

                </div>

             </div>
        );
    }
}

export default App;
