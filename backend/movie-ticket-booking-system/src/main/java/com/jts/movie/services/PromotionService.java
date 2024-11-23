package com.jts.movie.services;

import com.jts.movie.entities.Promotion;
import com.jts.movie.entities.User;
import com.jts.movie.repositories.PromotionRepository;
import com.jts.movie.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // Method to add a new promotion
    public Promotion addPromotion(Promotion promotion) {
        // Set the validity status when saving
        promotion.updateValidity();
        return promotionRepository.save(promotion);
    }

    public void sendPromotion(Long promotionId) throws Exception {
        // Retrieve the promotion by ID or throw an exception if not found
        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new Exception("Promotion not found with ID: " + promotionId));

        // Check if the promotion has already been sent
        if (promotion.isSent()) {
            throw new Exception("Promotion has already been sent and cannot be modified.");
        }

        // Fetch all active users who have opted in for promotions
        List<User> subscribedUsers = userRepository.findByIsActive(true).stream()
                .filter(User::getPromotionPreference)
                .collect(Collectors.toList());

        // Send the promotion email to each subscribed user
        for (User user : subscribedUsers) {
            emailService.sendPromotionEmail(user.getEmailId(), promotion.getTitle(), promotion.getDescription());
        }

        // Update the promotion status to 'sent' and set the send date to the current date
        promotion.setSent(true);
        promotion.setSendDate(new java.sql.Date(System.currentTimeMillis()));


        // Save the updated promotion to the database
        promotionRepository.save(promotion);
    }


    // Method to get all promotions with updated validity
    public List<Promotion> getAllPromotions() {
        List<Promotion> promotions = promotionRepository.findAll();
        // Update validity for each promotion before returning
        promotions.forEach(Promotion::updateValidity);
        return promotions;
    }

    // Method to get a single promotion by ID with updated validity
    public Optional<Promotion> getPromotionById(Long promoId) {
        Optional<Promotion> promotion = promotionRepository.findById(promoId);
        promotion.ifPresent(Promotion::updateValidity);
        return promotion;
    }


    // Method to delete a promotion by ID
    public void deletePromotion(Long promoId) {
        promotionRepository.deleteById(promoId);
    }
}
