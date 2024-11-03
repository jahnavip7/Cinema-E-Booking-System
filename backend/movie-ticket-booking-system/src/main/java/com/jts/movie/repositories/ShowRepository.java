package com.jts.movie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jts.movie.entities.Show;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Integer> {
    boolean existsByDateAndTimeAndTheaterId(Date date, Time time, Integer theaterId);
}
