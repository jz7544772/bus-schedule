var isClientSide = typeof window !== 'undefined';

var React = require("react");
var ReactDOM = require("react-dom");
var ajax = require("../helper").ajax;

var eventEmitter = require("../eventEmitter");

var StopSelect = require("./stop_select");

var RouteItem = React.createClass({
    handleClick: function(e) {
        eventEmitter.emit("chooseStop", e.target.textContent);

        var url = "/busRoutes/" +
                  this.props.busRoute.route_id  +
                  "/" +
                  this.props.busRoute.trip_headsign +
                  "/stops";
        ajax({url: url, method: "GET"}, function(err, routeStops) {
            if(err) {
                console.error(err);
            }
            else {
                ReactDOM.render(
                    <StopSelect routeStops={routeStops} />,
                    document.getElementById("stops-select-wrapper")
                )
            }
        })
    },
    render: function() {
        var style = {
            backgroundColor : "#" + this.props.busRoute.route_color
        }

        return (
            <li style={style} onClick={this.handleClick} className="list-item bus-route" data-value={this.props.route_id}>
                {this.props.busRoute.route_name}
            </li>
        );
    }
})

var RoutesSelect = React.createClass({
    getInitialState: function() {
        return {searchString: ""};
    },
    handleChange: function(e) {
        this.setState({searchString: e.target.value});
    },
    render: function() {
        var busRoutes = this.props.busRoutes;
        var searchString = this.state.searchString.trim().toLowerCase();
        if(searchString.length > 0) {
            busRoutes = busRoutes.filter(function(route) {
                var routeName = route.route_name.toLowerCase();
                return routeName.match(searchString);
            })
        }
        return (
            <div>
                <input className="input-field" type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Enter Route Number"/>
                <ul className="list">
                    {busRoutes.map(function(busRoute, index) {
                        return <RouteItem key={busRoute.route_name} busRoute={busRoute} />
                    })}
                </ul>
            </div>
        )
    }
})


module.exports = RoutesSelect;

