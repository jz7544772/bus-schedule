var isClientSide = typeof window !== 'undefined';

var React = require("react");
var ReactDOM = require("react-dom");

var ajax = require("../helper").ajax;

var RoutesSelect = require("../components/route_select");

var HomePage = React.createClass({
	render: function() {
		return (
			<div>
				<div id="bread-crubms-wrapper">
				</div>
				
		        <div id="left-menu">
		        	<div id="routes-select-wrapper" className="select-wrapper">
		        		<RoutesSelect busRoutes={this.props.busRoutes}></RoutesSelect>
		        	</div>

		        	<div id="stops-select-wrapper" className="select-wrapper">
		        	</div>
		        </div>
		            
		        <div id="right-content"></div>
		    </div>
		)
	}
})


if(isClientSide)
{
    ajax({url: "/busRoutes", method: "GET"}, function(err, busRoutes) {
        if(err) {
            console.error(err);
        }
        else {
            ReactDOM.render(
                <HomePage busRoutes={busRoutes} />,
                document.getElementById("main-content")
            )
        }
    })
}
else {
    module.exports = HomePage;
}