import * as React from 'react';
import {DashBoardState, HistoryData} from "../ts/interface";
import FontAwesome from 'react-fontawesome';
import 'css/historyDashView.css';
import { createCalendarViewChart } from "../ts/calendarViewChart";
import * as d3 from 'd3';
import * as moment from 'moment';
import * as $ from 'jquery';
import {getHistoryFromDate} from "../ts/utils";
import { HistoryItem } from "./historyItem";


export default class HistoryDashView extends React.Component<any, DashBoardState> {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            data: [],
            selected: "",
            maxShow: 10,
        };
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.createCalendarView = this.createCalendarView.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.updateMaxShow = this.updateMaxShow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== null) {
            if (this.props !== nextProps) {
                this.setState({
                    data: nextProps.queryResult
                });
            }
        }
    }

    handleSearchInput(event) {
        let inputString: string = event.target.value;
        let result: HistoryData[] = this.props.queryResult.filter((obj: HistoryData) => {
            let title: string = obj.title;
            let url: string = obj.url;
            return (title.match(inputString) || url.match(inputString))
        });
        this.setState({
            searchTerm: event.target.value,
            data: result
        });
    }

    createCalendarView() {
        d3.select('.calendar-svg').remove();
        let data :HistoryData[] = this.state.data as HistoryData[];
        let calendarContainer = d3.select('.calendar-view-container').node();
        createCalendarViewChart(data, calendarContainer.getBoundingClientRect().height,
            calendarContainer.getBoundingClientRect().width, 30, this.updateSelected);
    }

    updateSelected(dateString: string) {
        this.setState({
            selected: dateString
        })
    }

    renderHistoryList() {
        let renderData: HistoryData[] = this.state.data.splice(0, this.state.maxShow + 1);
        if (this.state.selected !== "") {
            let filteredData: HistoryData[] = getHistoryFromDate(d3.timeParse("%Y%m%d")(this.state.selected), this.state.data);
            renderData = filteredData.splice(0, this.state.maxShow + 1);
        }
        return renderData.map((historyItem: HistoryData, key) => {
            return <HistoryItem key={key} data={historyItem}/>
        });
    }

    updateMaxShow() {
        this.setState({
            maxShow: this.state.maxShow + 10
        })
    }


    render() {

        $(window).scroll(() => {
            if($(window).scrollTop() == $(document).height() - $(window).height()) {
               this.updateMaxShow();
            }
        });

        this.state.data.length !== 0 ? this.createCalendarView() : "";

        return (
            <div className="history-dash-view">
                <div className="top-utility-bar">
                    <div className="form-group row">
                        <div className="col-3 search-bar-title-container">
                            <p className="search-bar-title">History</p>
                        </div>
                        <div className="col-9 search-bar-container">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Search history"
                                aria-describedby="basic-addon1"
                                onChange={this.handleSearchInput}
                            />
                            <FontAwesome className="search-icon" name={"search"} />
                        </div>
                    </div>
                </div>
                <div className="visualization-container row">
                    <div className="visualization-sidemenu col-3">
                        <div>
                            <p>
                                Chrome History
                            </p>
                        </div>
                        {/*<div>*/}
                            {/*<p>*/}
                                {/*Clear Browsing History*/}
                            {/*</p>*/}
                        {/*</div>*/}
                    </div>
                    <div className="visualization-dashboard col-9">
                        <div className="calendar-view-container"/>
                        <div className="history-list-container">
                            <div className="selected-date-title-container">
                                <p className="selected-date-title">
                                    Showing:
                                    {this.state.selected === "" ? " All Dates" : " " + moment(this.state.selected).format('MMM Do, YYYY')}
                                </p>
                            </div>
                            <div className="history-list">
                                {this.renderHistoryList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
