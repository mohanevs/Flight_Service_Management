package com.rbu.fs.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase.Replace;
import org.springframework.transaction.annotation.Transactional;

import com.rbu.fs.entity.Flight;
import com.rbu.fs.repo.FlightRepository;


@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)  
@Transactional                                       
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestFlightRepository {

    @Autowired
    private FlightRepository repo;

    @Test
    @Order(1)
    @DisplayName("Test 1: Save Flight")
    public void testSave() {
        Flight flight = new Flight(127, "SpiceJet", "Mumbai", "Chennai", 12547);
        Flight saved = repo.save(flight);
        assertNotNull(saved);
        assertEquals(127, saved.getCode());
    }

    @Test
    @Order(2)
    @DisplayName("Test 2: Find By Code")
    public void testFindByCode() {
        repo.save(new Flight(101, "Air India", "Delhi", "Mumbai", 5000));
        Optional<Flight> entity = repo.findById(101);
        assertTrue(entity.isPresent());
        assertEquals("Air India", entity.get().getCarrier());
    }

    @Test
    @Order(3)
    @DisplayName("Test 3: Find All")
    public void testFindAll() {
        repo.save(new Flight(201, "IndiGo", "Delhi", "Kolkata", 3200));
        repo.save(new Flight(202, "Vistara", "Chennai", "Pune", 4800));
        List<Flight> flights = repo.findAll();
        assertTrue(flights.size() > 0);
    }

    @Test
    @Order(4)
    @DisplayName("Test 4: Find By Carrier")
    public void testFindByCarrier() {
        repo.save(new Flight(203, "Air India", "Chennai", "Hyderabad", 4100));
        List<Flight> flights = repo.findByCarrier("Air India");
        assertTrue(flights.size() > 0);
        assertNotNull(flights.getFirst());
    }

    @Test
    @Order(5)
    @DisplayName("Test 5: Find By Route")
    public void testFindByRoute() {
        repo.save(new Flight(204, "SpiceJet", "Mumbai", "Chennai", 6000));
        List<Flight> flights = repo.findByRoute("Mumbai", "Chennai");
        assertTrue(flights.size() > 0);
    }

    @Test
    @Order(6)
    @DisplayName("Test 6: Find By Price Range")
    public void testFindByPriceRange() {
        repo.save(new Flight(205, "IndiGo", "Pune", "Bangalore", 2500));
        List<Flight> flights = repo.findByPriceRange(2000, 7000);
        assertTrue(flights.size() > 0);
    }

    @Test
    @Order(7)
    @DisplayName("Test 7: Delete By Code")
    public void testDelete() {
        repo.save(new Flight(999, "TestAir", "X", "Y", 100));
        repo.deleteById(999);
        Optional<Flight> flight = repo.findById(999);
        assertTrue(flight.isEmpty());
    }
}