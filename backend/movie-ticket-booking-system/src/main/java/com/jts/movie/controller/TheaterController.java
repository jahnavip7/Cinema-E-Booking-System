package com.jts.movie.controller;

import com.jts.movie.entities.Theater;
import com.jts.movie.services.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theaters")
public class TheaterController {

    @Autowired
    private TheaterService theaterService;

    // Endpoint to add a new theater
    @PostMapping
    public ResponseEntity<Theater> addTheater(@RequestBody Theater theater) {
        Theater savedTheater = theaterService.addTheater(theater);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTheater);
    }

    // Endpoint to get all theaters
    @GetMapping("/all")
    public ResponseEntity<List<Theater>> getAllTheaters() {
        return ResponseEntity.ok(theaterService.getAllTheaters());
    }

    // Endpoint to get a single theater by ID
    @GetMapping("/{id}")
    public ResponseEntity<Theater> getTheaterById(@PathVariable Integer id) {
        try {
            Theater theater = theaterService.getTheaterById(id);
            return ResponseEntity.ok(theater);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Endpoint to update theater details
    @PutMapping("/{id}")
    public ResponseEntity<Theater> updateTheater(@PathVariable Integer id, @RequestBody Theater updatedTheater) {
        try {
            Theater theater = theaterService.updateTheater(id, updatedTheater);
            return ResponseEntity.ok(theater);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Endpoint to delete a theater
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTheater(@PathVariable Integer id) {
        try {
            theaterService.deleteTheater(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Theater deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Theater not found");
        }
    }
}
