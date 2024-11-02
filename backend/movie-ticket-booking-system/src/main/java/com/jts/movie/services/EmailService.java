package com.jts.movie.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    // Email sending logic
    private void sendEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true); // HTML content
        mailSender.send(mimeMessage);
        log.info("Confirmation email sent to: {}", to);
    }


    public void sendResetPasswordEmail(String to, String resetToken) throws MessagingException {
        String subject = "Reset Your Password";
        String body = "You have requested to reset your password. Please click the link below to reset it:\n" +
                "http://localhost:4200/resetPassword?token=" + resetToken;  // Correct URL for frontend reset

        sendEmail(to, subject, body);
    }
    // Method to send promotion email
    public void sendPromotionEmail(String to, String title, String description) throws MessagingException {
        String subject = "Exclusive Promotion: " + title;
        String body = "Dear User,\n\n" +
                "We are excited to share our latest promotion with you:\n\n" +
                title + "\n\n" +
                description + "\n\n" +
                "Best regards,\nYour CineQuest Team";

        sendEmail(to, subject, body);
    }

}



