SELECT arrival_time, departure_time, s1.service_id
	 FROM (SELECT service_id 
		FROM calendar_dates 
		WHERE date='20160411') s1 
	INNER JOIN (SELECT arrival_time, departure_time, service_id 
		     FROM trips,stop_times 
		     WHERE trips.trip_id = stop_times.trip_id AND 
			   stop_id='0345' AND route_id=19 AND 
		           trip_headsign='Northbound') s2 
	  ON s1.service_id = s2.service_id
	ORDER BY arrival_time;
