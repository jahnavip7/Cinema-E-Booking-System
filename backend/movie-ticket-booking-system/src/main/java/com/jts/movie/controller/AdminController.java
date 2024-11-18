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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public ResponseEntity<Map<String, Object>> addMovie(@RequestBody Movie movie) {
        Map<String, Object> response = new HashMap<>();
        try {
            Movie savedMovie = adminService.addMovie(movie);
            response.put("message", "Movie added successfully.");
            response.put("movie", savedMovie);
            response.put("statusCode", HttpStatus.CREATED.value());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("message", "Error: " + e.getMessage());
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/editMovies/{id}")
    public ResponseEntity<Map<String, Object>> editMovie(@PathVariable Integer id, @RequestBody Movie movie) {
        Map<String, Object> response = new HashMap<>();
        try {
            Movie updatedMovie = adminService.updateMovie(id, movie);
            response.put("message", "Movie updated successfully.");
            response.put("movie", updatedMovie);
            response.put("statusCode", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error: " + e.getMessage());
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/movies/{movieId}")
    public ResponseEntity<Map<String, Object>> deleteMovie(@PathVariable Integer movieId) {
        Map<String, Object> response = new HashMap<>();
        try {
            adminService.deleteMovie(movieId);
            response.put("message", "Movie deleted successfully.");
            response.put("statusCode", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error deleting movie: " + e.getMessage());
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/scheduleMovies")
    public ResponseEntity<Map<String, Object>> scheduleShow(
            @RequestParam Integer movieId,
            @RequestParam Integer theaterId,
            @RequestParam Date date,
            @RequestParam Time time) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean isConflict = showService.checkScheduleConflict(theaterId, date, time);
            if (isConflict) {
                response.put("message", "A show is already scheduled at the same time, date, and theater.");
                response.put("statusCode", HttpStatus.CONFLICT.value());
                return new ResponseEntity<>(response, HttpStatus.CONFLICT);
            }

            Show scheduledShow = showService.scheduleShow(movieId, theaterId, date, time);
            response.put("message", "Show scheduled successfully.");
            response.put("showId", scheduledShow.getShowId());
            response.put("statusCode", HttpStatus.CREATED.value());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("message", "Error scheduling show: " + e.getMessage());
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Add Promotion Endpoint
    @PostMapping("/AddPromo")
    public ResponseEntity<Map<String, Object>> addPromotion(@RequestBody Promotion promotion) {
        Map<String, Object> response = new HashMap<>();
        promotion.updateValidity();
        Promotion savedPromotion = promotionService.addPromotion(promotion);
        response.put("message", "Promotion added successfully.");
        response.put("promotion", savedPromotion);
        response.put("statusCode", HttpStatus.CREATED.value());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get All Promotions Endpoint
    @GetMapping("/promotions")
    public ResponseEntity<Map<String, Object>> getAllPromotions() {
        Map<String, Object> response = new HashMap<>();
        List<Promotion> promotions = promotionService.getAllPromotions();
        response.put("promotions", promotions);
        response.put("statusCode", HttpStatus.OK.value());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/sendPromo/{id}")
    public ResponseEntity<String> sendPromotion(@PathVariable Long id) {
        try {
            promotionService.sendPromotion(id);
            return ResponseEntity.ok("Promotion sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    // New endpoint to delete a promotion by ID
    @DeleteMapping("/promotions/{promoId}")
    public ResponseEntity<Map<String, Object>> deletePromotion(@PathVariable Long promoId) {
        Map<String, Object> response = new HashMap<>();
        try {
            promotionService.deletePromotion(promoId);
            response.put("message", "Promotion deleted successfully.");
            response.put("statusCode", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error deleting promotion: " + e.getMessage());
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/promo/{id}")
    public ResponseEntity<Map<String, Object>> getPromotionById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Promotion> promotionOptional = promotionService.getPromotionById(id);
            if (promotionOptional.isPresent()) {
                Promotion promotion = promotionOptional.get();
                response.put("statusCode", HttpStatus.OK.value());
                response.put("message", "Promotion found.");
                response.put("promotion", promotion);
                return ResponseEntity.ok(response);
            } else {
                response.put("statusCode", HttpStatus.NOT_FOUND.value());
                response.put("message", "Promotion not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("message", "Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    @PutMapping("/ActivateUser/{userId}")
    public ResponseEntity<Map<String, Object>> activateUser(@PathVariable Integer userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            User updatedUser = adminService.activateUser(userId);
            response.put("message", "User activated successfully.");
            response.put("user", updatedUser);
            response.put("statusCode", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/SuspendUser/{userId}")
    public ResponseEntity<Map<String, Object>> suspendUser(@PathVariable Integer userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            User updatedUser = adminService.suspendUser(userId);
            response.put("message", "User suspended successfully.");
            response.put("user", updatedUser);
            response.put("statusCode", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
