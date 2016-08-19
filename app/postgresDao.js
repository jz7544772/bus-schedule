// Node Modules
var pg = require("pg");
var Promise = require("promise");
// Custom Modules
var connString = process.env.HEROKU_POSTGRESQL_CRIMSON_URL || require("./config.js").connString;

function createClient() {
    return new Promise(function(resolve, reject) {
        pg.connect(connString, function(err, client, done) {
            if(err) reject(err);
            else resolve(client);
            done();
        });
    });
}

function getBusRoutes(client) {
    var queryText = "SELECT DISTINCT routes.route_id, trip_headsign, route_color, routes.route_id || ' ' || trip_headsign AS route_name " +
                    "FROM routes, trips " +
                    "WHERE routes.route_id = trips.route_id " +
                    "ORDER BY route_id;";
    var queryValues = [];
    var queryConfig = {
        text: queryText,
        values: queryValues,
        name: "get-bus-routes"
    };

    return new Promise(function(resolve, reject) {
        client.query(queryConfig, function(err, result) {
            if(err) reject(err);
            else resolve(result.rows);
        });
    });
}

function getRouteStops(client, routeId, headSign) {
    var queryText = "SELECT DISTINCT route_id, trip_headsign, stop_name, stops.stop_id " +
                    "FROM trips, stop_times, stops " +
                    "WHERE trips.route_id=$1 AND trips.trip_headsign=$2 " +
                    "AND trips.trip_id = stop_times.trip_id AND stop_times.stop_id = stops.stop_id;";
    var queryValues = [routeId, headSign];
    var queryConfig = {
        text: queryText,
        values: queryValues,
        name: "get-route-stops"
    };
    return new Promise(function(resolve, reject) {
        client.query(queryConfig, function(err, result) {
            if(err) {
                reject(err);
            }
            else {
                resolve(result.rows);
            }
        });
    });
}

function getRouteScheduleByStop(client, routeId, headSign, stopId) {
    var queryText = "SELECT arrival_time, departure_time, s1.service_id " +
	                   "FROM (SELECT service_id " +
		                     "FROM calendar_dates " +
		                     "WHERE date=$1) s1 " +
	                  "INNER JOIN (SELECT arrival_time, departure_time, service_id " +
		                              "FROM trips,stop_times " +
		                              "WHERE trips.trip_id = stop_times.trip_id AND " +
			                          "route_id=$2 AND trip_headsign=$3 AND stop_id=$4) s2 " +
	                    "ON s1.service_id = s2.service_id " +
	                  "ORDER BY arrival_time;";

    var date = new Date();
    // var dateString = "20160411";
    date.setHours(date.getHours() -4 );
    var dateString = date.toISOString().substring(0, 10).replace(/-/g, "");
    

    var queryValues = [dateString, routeId, headSign, stopId];
    var queryConfig = {
        text: queryText,
        values: queryValues,
        name: "get-route-stops-schedule"
    };


    return new Promise(function(resolve, reject) {
        client.query(queryConfig, function(err, result) {
            if(err) {
                reject(err);
            }
            else {
                resolve(result.rows);
            }
        });
    });
}

module.exports = {
    createClient: createClient,
    getBusRoutes: getBusRoutes,
    getRouteStops: getRouteStops,
    getRouteScheduleByStop: getRouteScheduleByStop
};
