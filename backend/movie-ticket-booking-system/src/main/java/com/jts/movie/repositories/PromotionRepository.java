package com.jts.movie.repositories;

import com.jts.movie.entities.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
}
