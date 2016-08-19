SELECT DISTINCT route_id, trip_headsign, stop_name, stops.stop_id
  FROM trips, stop_times, stops 
  WHERE trips.route_id=19 AND trips.trip_headsign='Southbound' AND trips.trip_id = stop_times.trip_id AND stop_times.stop_id = stops.stop_id;
