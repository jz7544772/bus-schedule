-- DROP TABLE IF EXISTS shapes CASCADE;
-- DROP TABLE IF EXISTS stop_times CASCADE;
-- DROP TABLE IF EXISTS stops CASCADE;
-- DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS calendar_dates CASCADE;

/*
CREATE TABLE shapes (
	shape_id integer,
	shape_pt_lat numeric(12, 10),
	shape_pt_lon numeric(12, 10),
	shape_pt_sequence integer,
	shape_dist_traveled integer
);

CREATE TABLE trips (
route_id integer REFERENCES routes(route_id),
service_id VARCHAR(255),
trip_id integer PRIMARY KEY,
trip_headsign varchar(255),
trip_short_name varchar(255),
direction_id integer,
block_id integer,
shape_id integer,
wheelchair_accessible boolean,
bikes_allowed boolean
);

CREATE TABLE stops (
	stop_id varchar(255) PRIMARY KEY,
	stop_code integer,
	stop_name varchar(255),
	stop_desc varchar(255),
	stop_lat numeric(12, 10),
	stop_lon numeric(12, 10),
	zone_id integer,
	stop_url varchar(255),
	location_type integer,
	parent_station varchar(255),
	stop_timezone varchar(255),
	wheelchair_boarding boolean
);


CREATE TABLE stop_times (	
	stop_times_id serial PRIMARY KEY,
	trip_id integer REFERENCES trips(trip_id),
	arrival_time time,
	departure_time time,
	stop_id varchar(255) REFERENCES stops(stop_id),
	stop_sequence integer,
	stop_headsign integer,
	pickup_type integer,
	drop_off_type integer,
	shape_dist_traveled integer
);
*/

CREATE TABLE calendar_dates (
	calendar_id serial PRIMARY KEY,
	service_id varchar(255),
	date varchar(255),
	exception_type integer
);
