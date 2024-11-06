package com.jts.movie.services;

import com.jts.movie.entities.Promotion;
import com.jts.movie.entities.User;
import com.jts.movie.repositories.PromotionRepository;
import com.jts.movie.repositories.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jts.movie.services.EmailService;
import java.util.Date;
import java.util.List;
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
        promotion.setSent(false);
        return promotionRepository.save(promotion);
    }

    public void sendPromotion(Long promotionId) throws Exception {
        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new Exception("Promotion not found with ID: " + promotionId));

        if (promotion.isSent()) {
            throw new Exception("Promotion has already been sent and cannot be modified.");
        }

        // Find users who are active and have promotion preference set to true
        List<User> subscribedUsers = userRepository.findByIsActive(true)
                .stream()
                .filter(User::getPromotionPreference) // Assuming getPromotionPreference() is a boolean field
                .collect(Collectors.toList());

        // Implement the notification mechanism here, such as sending emails
        for (User user : subscribedUsers) {
            emailService.sendPromotionEmail(user.getEmailId(), promotion.getTitle(), promotion.getDescription());
        }

        // Mark the promotion as sent and save the send date
        promotion.setSent(true);
        promotion.setSendDate(new Date());
        promotionRepository.save(promotion);
    }

    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

}
