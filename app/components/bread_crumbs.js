var isClientSide = typeof window !== 'undefined';

var React = require("react");
var ReactDOM = require("react-dom");

var eventEmitter = require("../eventEmitter");

var BreadCrumbs = React.createClass({
    getInitialState: function() {
        return {stages: []};
    },
    addStage: function(stageName) {
        if(this.state.stages.indexOf(stageName) === -1) {
            this.state.stages.push(stageName);
            this.setState({stages: this.state.stages});
        }
    },
    componentDidMount: function() {
        eventEmitter.on("chooseStop", function(stopName) {
            this.addStage(stopName);
        }.bind(this))
    },
    componentWillMount: function() {

    },
    removeStage: function(stageName) {
        var currentIndex = this.state.stages.indexOf(stageName) + 1;
        this.state.stages = this.state.stages.slice(0, currentIndex);
    },
    render: function() {
        var stages = this.state.stages;
        return (
            <ul id="bread-crubms">
                {stages.map(function(stage, index) {
                    return <li key={stage}> {stage} <pre>>></pre> </li>
                })}
            </ul>
        );
    }
});


// ReactDOM.render(
//     <BreadCrumbs />,
//     document.getElementById("bread-crubms-wrapper")
// )
