package com.jts.movie.controller;

import com.jts.movie.entities.Show;
import com.jts.movie.services.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

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
	public ResponseEntity<List<Show>> getShowsByMovieId(@PathVariable Integer movieId) {
		List<Show> shows = showService.getShowsByMovieId(movieId);
		return ResponseEntity.ok(shows);
	}


}

