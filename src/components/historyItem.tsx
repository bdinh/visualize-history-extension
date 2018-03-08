import * as React from 'react';
import * as moment from 'moment';

export class HistoryItem extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        let pathArray = this.props.data.url.split( '/' );
        let protocol = pathArray[0];
        let host = pathArray[2];

        return(
            <div className="list-item row">
                <div className="item-time col-2">
                    <p>{moment(new Date(this.props.data.lastVisitTime)).startOf('hour').fromNow()}</p>
                </div>
                <div className="item-icon col-1">
                    {/*<img className="item-icon" src={protocol + host + "/favicon.ico"}/>*/}
                    <img className="item-icon" src={"chrome://favicon/" + protocol + host}/>
                </div>
                <div className="item-url col-9">
                    <div className="item-title-container">
                        <a className="item-link" href={this.props.data.url}>
                            <p className="item-title">{this.props.data.title === "" ? this.props.data.url : this.props.data.title}</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

}
