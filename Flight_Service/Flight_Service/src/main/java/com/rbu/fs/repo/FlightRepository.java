package com.rbu.fs.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rbu.fs.entity.Flight;


public interface FlightRepository extends JpaRepository<Flight, Integer>{

	List<Flight> findByCarrier(String carrier);
	
	@Query("FROM Flight WHERE cost BETWEEN :min AND :max")
	List<Flight> findByPriceRange(double min, double max);
	
	@Query("FROM Flight WHERE source = :source AND destination = :destination")
	List<Flight> findByRoute(String source, String destination);

	void deleteByCode(int i);

	

}
