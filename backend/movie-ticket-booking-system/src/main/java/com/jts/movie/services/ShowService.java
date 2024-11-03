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

	public Show scheduleShow(Integer movieId, Integer theaterId, Date date, Time time) throws Exception {
		// Check if a show already exists at the specified date, time, and theater
		if (showRepository.existsByDateAndTimeAndTheaterId(date, time, theaterId)) {
			throw new Exception("A show is already scheduled at this date and time in the specified theater.");
		}

		// Fetch the movie and theater entities
		Movie movie = movieRepository.findById(movieId)
				.orElseThrow(() -> new Exception("Movie not found with ID: " + movieId));
		Theater theater = theaterRepository.findById(theaterId)
				.orElseThrow(() -> new Exception("Theater not found with ID: " + theaterId));

		// Create and save the new show
		Show show = new Show();
		show.setMovie(movie);
		show.setTheater(theater);
		show.setDate(date);
		show.setTime(time);

		return showRepository.save(show);
	}

}
