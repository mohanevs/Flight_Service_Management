package com.rbu.fs.service;

import java.util.List;

import com.rbu.fs.entity.Flight;

public interface FlightService {

	Flight save(Flight flight);
	Flight findByCode(int code);
	List<Flight> findByCarrier(String carrier);
	List<Flight> findByRoute(String source, String destination);
	List<Flight> findByPriceRange(double min, double max);
	List<Flight> findAll();
	boolean deleteByCode(int code);
	
}
