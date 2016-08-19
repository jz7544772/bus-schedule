SELECT DISTINCT arrival_time, departure_time, service_id 
	FROM trips, stop_times
	WHERE 
		trips.trip_id = stop_times.trip_id AND 
		stop_id='0345' AND 
		route_id=19 AND 
		trip_headsign='Northbound'  AND service_id LIKE '%13%' 
	ORDER BY service_id, arrival_time