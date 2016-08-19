var postgresDao = require("../postgresDao");
var React = require('react');
var ReactDOMServer = require("react-dom/server");

var RoutesSelect = React.createFactory(require("../components/route_select"));

var HomePage = React.createFactory(require("../pages/home_page"));

module.exports = function(express) {
    var router = express.Router();

    router.get("/", function(req, res) {
        postgresDao.createClient()
        .then(function(dbClient) {
            return postgresDao.getBusRoutes(dbClient);
        })
        .then(function(busRoutes) {
            res.status(200).render("home", {
                App: ReactDOMServer.renderToString(HomePage({busRoutes: busRoutes}))
            });
        })
        .catch(function(err) {
            res.status(404).send(err);
        });
    });

    router.get("/busRoutes", function(req, res) {
        postgresDao.createClient()
        .then(function(dbClient) {
            return postgresDao.getBusRoutes(dbClient);
        })
        .then(function(busRoutes) {
            res.status(200).json(busRoutes);
        })
        .catch(function(err) {
            res.status(404).json({error: err});
        });
    });

    router.get("/busRoutes/:routeId/:headSign/stops", function(req, res) {
        var routeId = req.params.routeId;
        var headSign = req.params.headSign;

        postgresDao.createClient()
        .then(function(dbClient) {
            return postgresDao.getRouteStops(dbClient, routeId, headSign);
        })
        .then(function(routeStops) {
            res.status(200).json(routeStops);
        })
        .catch(function(err) {
            res.status(404).json({error: err});
        });
    });

    router.get("/busRoutes/:routeId/:headSign/stops/:stopId/schedule", function(req, res) {
        var routeId = req.params.routeId;
        var headSign = req.params.headSign;
        var stopId = req.params.stopId;

        console.log(req.params);

        postgresDao.createClient()
        .then(function(dbClient) {
            return postgresDao.getRouteScheduleByStop(dbClient, routeId, headSign, stopId);
        })
        .then(function(routeStopSchedule) {
            res.status(200).json(routeStopSchedule);
        })
        .catch(function(err) {
            res.status(404).json({error: err});
        });
    });

    return router;
};
