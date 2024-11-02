package com.jts.movie.controller;

import com.jts.movie.entities.Show;
import com.jts.movie.services.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;

@RestController
@RequestMapping("/api/shows")
public class ShowController {

	@Autowired
	private ShowService showService;


}
