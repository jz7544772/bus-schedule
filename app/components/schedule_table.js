var React = require("react");
var ReactDOM = require("react-dom");

function splitArray(arry) {
    var resultArry = [];
    while(arry.length > 0) {
        resultArry[resultArry.length] = arry.splice(0,8);
    }
    return resultArry;
}

var ScheduleTable = React.createClass({
    render: function() {
        var scheduleTable = splitArray(this.props.scheduleTable);

        return (
            <table>
                <tbody>
                    {scheduleTable.map(function(scheduleRow, rIndex) {
                        return(
                            <tr key={rIndex}>
                                {scheduleRow.map(function(scheduleCell, cIndex) {
                                    return <td key={cIndex}>{scheduleCell.arrival_time}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
});

module.exports = ScheduleTable;
