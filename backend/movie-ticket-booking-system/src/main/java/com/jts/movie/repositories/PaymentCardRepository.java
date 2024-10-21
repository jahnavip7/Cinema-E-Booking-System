package com.jts.movie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jts.movie.entities.PaymentCard;

public interface PaymentCardRepository extends JpaRepository<PaymentCard, Long> {
}

