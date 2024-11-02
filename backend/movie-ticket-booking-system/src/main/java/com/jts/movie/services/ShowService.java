package com.jts.movie.services;

import com.jts.movie.entities.Movie;
import com.jts.movie.entities.Show;
import com.jts.movie.entities.Theater;
import com.jts.movie.repositories.MovieRepository;
import com.jts.movie.repositories.TheaterRepository;
import com.jts.movie.repositories.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;

@Service
public class ShowService {

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private ShowRepository showRepository;

	@Autowired
	private TheaterRepository theaterRepository;

	// Method to schedule a show for an existing movie
	public Show scheduleShow(Integer movieId, Integer theaterId, Date date, Time time) throws Exception {
		// Fetch movie by ID
		Movie movie = movieRepository.findById(movieId)
				.orElseThrow(() -> new Exception("Movie not found with ID: " + movieId));

		// Fetch theater by ID
		Theater theater = theaterRepository.findById(theaterId)
				.orElseThrow(() -> new Exception("Theater not found with ID: " + theaterId));

		// Create a new show and set its properties
		Show show = new Show();
		show.setMovie(movie);
		show.setTheater(theater);
		show.setDate(date);
		show.setTime(time);

		// Save the show
		return showRepository.save(show);
	}
}
