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
import java.util.List;

@Service
public class ShowService {

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private ShowRepository showRepository;

	@Autowired
	private TheaterRepository theaterRepository;



	public List<Show> getShowsByMovieId(Integer movieId) {
		return showRepository.findByMovieId(movieId);
	}

	public boolean checkScheduleConflict(Integer theaterId, Date date, Time time) {
		// Query the repository to find any existing show with the same theaterId, date, and time
		return showRepository.existsByTheaterIdAndDateAndTime(theaterId, date, time);
	}


	public Show scheduleShow(Integer movieId, Integer theaterId, Date date, Time time) throws Exception {
		// Fetch the Movie entity
		Movie movie = movieRepository.findById(movieId)
				.orElseThrow(() -> new Exception("Movie not found with ID: " + movieId));

		// Fetch the Theater entity
		Theater theater = theaterRepository.findById(theaterId)
				.orElseThrow(() -> new Exception("Theater not found with ID: " + theaterId));

		// Create and set properties for the new Show
		Show show = new Show();
		show.setMovie(movie);
		show.setTheater(theater);
		show.setDate(date);
		show.setTime(time);

		// Save the Show entity
		return showRepository.save(show);
	}

}
