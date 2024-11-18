package com.jts.movie.controller;

import com.jts.movie.entities.Show;
import com.jts.movie.services.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shows")
public class ShowController {

	@Autowired
	private ShowService showService;

	/**
	 * Get all shows for a specific movie ID
	 * API: GET /api/shows/movie/{movieId}
	 */
	@GetMapping("/movie/{movieId}")
	public ResponseEntity<List<Map<String, Object>>> getShowsByMovieId(@PathVariable Integer movieId) {
		List<Show> shows = showService.getShowsByMovieId(movieId);

		// Create a list of maps to hold the response data
		List<Map<String, Object>> responseList = new ArrayList<>();

		// Iterate through the list of shows and build the response
		for (Show show : shows) {
			Map<String, Object> showDetails = new HashMap<>();
			showDetails.put("showId", show.getShowId());
			showDetails.put("time", show.getTime());
			showDetails.put("date", show.getDate());
			showDetails.put("movieId", show.getMovie().getId());
			showDetails.put("theaterId", show.getTheater().getId());
			showDetails.put("theaterName", show.getTheater().getName());

			// Add the show details to the response list
			responseList.add(showDetails);
		}

		return ResponseEntity.ok(responseList);
	}



}

