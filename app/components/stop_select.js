var isClientSide = typeof window !== 'undefined';

var React = require("react");
var ReactDOM = require("react-dom");
var ajax = require("../helper").ajax;

var ScheduleTable = require("./schedule_table");

var StopItem = React.createClass({
    handleClick: function(e) {
        var url = "/busRoutes/" +
                  this.props.routeStop.route_id  +
                  "/" +
                  this.props.routeStop.trip_headsign +
                  "/stops/" +
                  this.props.routeStop.stop_id +
                  "/schedule";
        ajax({url: url, method: "GET"}, function(err, scheduleTable) {
            if(err) {
                console.error(err);
            }
            else {
                ReactDOM.render(
                    <ScheduleTable scheduleTable={scheduleTable}/>,
                    document.getElementById("right-content")
                )
            }
        })
    },
    render: function() {
        var routeStop = this.props.routeStop;
        return (
            <li className="list-item route-stop" data-value={routeStop.stop_id} onClick={this.handleClick}>
                {routeStop.stop_id} {routeStop.stop_name}
            </li>
        );
    }
})

var StopSelect = React.createClass({
    getInitialState: function() {
        return {
            searchString: "",
            visible: false
        };
    },
    handleChange: function(e) {
        this.setState({searchString: e.target.value});
    },
    beVisible: function() {
        this.setState({visible: true});
    },
    render: function() {
        var routeStops = this.props.routeStops;
        var searchString = this.state.searchString;
        if(searchString.length > 0) {
            routeStops = routeStops.filter(function(stop) {
                var stopFullName = stop.stop_id + " " + stop.stop_name.toLowerCase();
                return stopFullName.match(searchString);
            })
        }

        return (
            <div>
                <input tyep="text" className="input-field" placeholder="Enter Stop Name or Stop Number" onChange={this.handleChange}/>
                <ul className="list">
                    {
                        routeStops.map(function(routeStop, index) {
                            return <StopItem key={index} routeStop={routeStop} />
                        })
                    }
                </ul>
            </div>
        );

    }
});


module.exports = StopSelect;
