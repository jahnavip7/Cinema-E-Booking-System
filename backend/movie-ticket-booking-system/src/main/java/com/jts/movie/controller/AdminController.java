package com.jts.movie.controller;

import com.jts.movie.entities.Promotion;
import com.jts.movie.entities.User;
import com.jts.movie.services.PromotionService;
import com.jts.movie.entities.Movie;
import com.jts.movie.entities.Show;
import com.jts.movie.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.jts.movie.services.ShowService;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ShowService showService;

    @Autowired
    private PromotionService promotionService;

    @PostMapping("/addMovie")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
        try {
            Movie savedMovie = adminService.addMovie(movie);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Endpoint to edit an existing movie
    @PutMapping("/editMovies/{id}")
    public ResponseEntity<?> editMovie(@PathVariable Integer id, @RequestBody Movie movie) {
        try {
            Movie updatedMovie = adminService.updateMovie(id, movie);
            return ResponseEntity.ok(updatedMovie);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    //Endpoint to delete an existing movie
    @DeleteMapping("/movies/{movieId}")
    public ResponseEntity<String> deleteMovie(@PathVariable Integer movieId) {
        try {
            adminService.deleteMovie(movieId);
            return ResponseEntity.ok("Movie deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting movie: " + e.getMessage());
        }
    }

    @GetMapping("/promotions")
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }

    // Endpoint to schedule a new show for an existing movie
    @PostMapping("/scheduleMovies")
    public ResponseEntity<String> scheduleShow(
            @RequestParam Integer movieId,
            @RequestParam Integer theaterId,
            @RequestParam Date date,
            @RequestParam Time time) {
        try {
            Show scheduledShow = showService.scheduleShow(movieId, theaterId, date, time);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Show scheduled successfully with ID: " + scheduledShow.getShowId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error scheduling show: " + e.getMessage());
        }
    }


    // Endpoint to add a new promotion
    @PostMapping("/AddPromo")
    public ResponseEntity<Promotion> addPromotion(@RequestBody Promotion promotion) {
        Promotion savedPromotion = promotionService.addPromotion(promotion);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPromotion);
    }

    // Endpoint to send a promotion to subscribed users
    @PostMapping("/SendPromo/{id}")
    public ResponseEntity<?> sendPromotion(@PathVariable Long id) {
        try {
            promotionService.sendPromotion(id);
            return ResponseEntity.ok("Promotion sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // Activate user by ID
    @PutMapping("/ActivateUser/{userId}")
    public ResponseEntity<?> activateUser(@PathVariable Integer userId) {
        try {
            User updatedUser = adminService.activateUser(userId);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Suspend user by ID
    @PutMapping("/SuspendUser/{userId}")
    public ResponseEntity<?> suspendUser(@PathVariable Integer userId) {
        try {
            User updatedUser = adminService.suspendUser(userId);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}