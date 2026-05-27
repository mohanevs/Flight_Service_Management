package com.rbu.fs.service;

public class InvalidFlightException extends RuntimeException{
	
	public InvalidFlightException() {
        super();
    }

    public InvalidFlightException(String message) {
        super(message);
    }
}
