package com.rbu.fs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rbu.fs.entity.Flight;
import com.rbu.fs.repo.FlightRepository;

@Service
public class FlightServiceIMPL implements FlightService {

	@Autowired
	private FlightRepository repo;

	@Override
	public Flight save(Flight flight) {
		return repo.save(flight);
	}

	@Override
	public Flight findByCode(int code) {
		return repo.findById(code).orElseThrow(
                () -> new InvalidFlightException("Fligth with code :[ " + code + "] not found"));
	}

	@Override
	public List<Flight> findByCarrier(String carrier) {
		return repo.findByCarrier(carrier);
	}

	@Override
	public List<Flight> findByRoute(String source, String destination) {
		return repo.findByRoute(source,destination);
	}

	@Override
	public List<Flight> findByPriceRange(double min, double max) {
		return repo.findByPriceRange(min, max);
	}

	@Override
	public List<Flight> findAll() {
		return repo.findAll();
	}

	@Override
	public boolean deleteByCode(int code) {
		repo.deleteById(code);
		return false;
	}
	
	
}
