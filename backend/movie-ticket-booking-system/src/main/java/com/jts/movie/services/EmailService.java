package com.jts.movie.services;

/*import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // Existing method for sending general emails
    public void sendEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        mailSender.send(mimeMessage);
    }

    // New method for sending confirmation emails
    public void sendConfirmationEmail(String to, String confirmationToken) throws MessagingException {
        String subject = "Confirm your email address";
        String body = "Please click the link below to confirm your email address:\n" +
                "http://localhost:8080/user/confirmRegistration?token=" + confirmationToken;

        sendEmail(to, subject, body);
    }
}
 */

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
    // Method for sending confirmation email
    public void sendConfirmationEmail(String to, String confirmationToken) throws MessagingException {
        String subject = "Confirm your email address";
        String body = "Please click the link below to confirm your email address:\n" +
                "http://localhost:8080/user/confirmRegistration?token=" + confirmationToken;

        sendEmail(to, subject, body);
    }

    // **New Method for Sending Password Reset Email**
    /*public void sendResetPasswordEmail(String to, String resetToken) throws MessagingException {
        String subject = "Reset Your Password";
        String body = "You have requested to reset your password. Please click the link below to reset it:\n" +
                "http://localhost:4200/resetPassword?token=" + resetToken;

        sendEmail(to, subject, body);
    }*/
    public void sendResetPasswordEmail(String to, String resetToken) throws MessagingException {
        String subject = "Reset Your Password";
        String body = "You have requested to reset your password. Please click the link below to reset it:\n" +
                "http://localhost:4200/resetPassword?token=" + resetToken;  // Correct URL for frontend reset

        sendEmail(to, subject, body);
    }

}



