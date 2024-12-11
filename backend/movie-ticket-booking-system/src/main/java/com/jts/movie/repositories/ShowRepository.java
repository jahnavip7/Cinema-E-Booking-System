package com.jts.movie.repositories;

import com.jts.movie.entities.Movie;
import com.jts.movie.entities.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {
    Optional<Show> findByMovieAndDateAndTime(Movie movie, Date date, Time time);
    List<Show> findByMovieId(Integer movie_id);
    boolean existsByDateAndTimeAndTheaterId(LocalDate date, LocalTime time, Long theaterId);

    List<Show> findByMovieIdAndDate(Integer movie_id, java.util.Date date);
    Show getShowById(long id);
}
