package com.jts.movie.services;

import com.jts.movie.entities.User;
import com.jts.movie.repositories.UserRepository;
import com.jts.movie.request.UserRequest;
import com.jts.movie.request.EditProfileRequest;
import com.jts.movie.response.UserResponse;
import com.jts.movie.config.JWTService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

	private static final Logger log = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private JWTService jwtService;

	// Register user and send confirmation email
	public String addUser(UserRequest userRequest) throws MessagingException {
		// Check if the user already exists
		if (userRepository.findByEmailId(userRequest.getEmailId()).isPresent()) {
			throw new IllegalArgumentException("User already exists with email: " + userRequest.getEmailId());
		}

		// Encrypt password and save the user
		String encryptedPassword = passwordEncoder.encode(userRequest.getPassword());
		User user = User.builder()
				.firstName(userRequest.getFirstName())
				.lastName(userRequest.getLastName())
				.emailId(userRequest.getEmailId())
				.mobileNo(userRequest.getMobileNo())
				.password(encryptedPassword)
				.address(userRequest.getAddress())
				.city(userRequest.getCity())
				.state(userRequest.getState())
				.zipcode(userRequest.getZipcode())
				.roles(userRequest.getRoles())
				.age(userRequest.getAge())
				.isActive(false) // Initially inactive
				.promotionPreference(userRequest.isPromotionPreference())
				.build();

		// Generate and set the confirmation token
		String token = UUID.randomUUID().toString();
		user.setConfirmationToken(token);

		// Save the user
		userRepository.save(user);

		// Send confirmation email
		sendConfirmationEmail(user, token);

		return "User registered successfully. Please check your email for confirmation.";
	}

	// Send confirmation email
	private void sendConfirmationEmail(User user, String token) throws MessagingException {
		String confirmationLink = "http://localhost:8080/user/confirmRegistration?token=" + token;
		String subject = "Confirm Your Registration";
		String body = "<p>Hello " + user.getFirstName() + " " + user.getLastName() + ",</p>"
				+ "<p>Thank you for registering. Please click the link below to confirm your registration:</p>"
				+ "<a href=\"" + confirmationLink + "\">Confirm Registration</a>"
				+ "<p>If you did not register, please ignore this email.</p>";

		sendEmail(user.getEmailId(), subject, body);
	}

	// Email sending logic
	private void sendEmail(String to, String subject, String body) throws MessagingException {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(body, true);
		mailSender.send(mimeMessage);
		log.info("Confirmation email sent to: {}", to);
	}

	// Confirm registration
	public void confirmRegistration(String token) {
		User user = userRepository.findByConfirmationToken(token)
				.orElseThrow(() -> new IllegalArgumentException("Invalid token: " + token));

		user.setIsActive(true);
		user.setConfirmationToken(null);
		userRepository.save(user);
		log.info("User {} confirmed their registration.", user.getEmailId());
	}

	// Login user
	public UserResponse loginUser(UserRequest userRequest) {
		Optional<User> userOptional = userRepository.findByEmailId(userRequest.getEmailId());
		if (userOptional.isEmpty()) {
			throw new IllegalArgumentException("Invalid email or password");
		}

		User user = userOptional.get();

		if (!passwordEncoder.matches(userRequest.getPassword(), user.getPassword())) {
			throw new IllegalArgumentException("Invalid email or password");
		}

		// Check if the user is active (has confirmed registration)
		if (!user.getIsActive()) {
			throw new IllegalArgumentException("User has not confirmed their email");
		}

		// Generate JWT token
		String token = jwtService.generateToken(user.getEmailId());

		return new UserResponse(user.getEmailId(), token, "Login successful");
	}

	//forgot password
	/*public void initiatePasswordReset(String emailId) throws MessagingException {
		Optional<User> userOptional = userRepository.findByEmailId(emailId);
		if (userOptional.isEmpty()) {
			throw new IllegalArgumentException("No account found with that email.");
		}

		User user = userOptional.get();

		// Generate a reset token
		String resetToken = UUID.randomUUID().toString();
		user.setResetToken(resetToken);
		userRepository.save(user);

		// Send reset password email
		sendResetPasswordEmail(user, resetToken);
	}*/

	/*private void sendResetPasswordEmail(User user, String resetToken) throws MessagingException {
		String resetLink = "http://localhost:4200/resetPassword?token=" + resetToken;  // Ensure it points to resetPassword
		String subject = "Reset Your Password";
		String body = "<p>Hello " + user.getFirstName() + ",</p>"
				+ "<p>Click the link below to reset your password:</p>"
				+ "<a href=\"" + resetLink + "\">Reset Password</a>";

		sendEmail(user.getEmailId(), subject, body);
	}*/


	/*public void resetPassword(String email, String newPassword, String cnfPassword) {
		Optional<User> userOptional = userRepository.findByEmailId(email);

		if (userOptional.isEmpty()) {
			throw new IllegalArgumentException("User with the given email not found.");
		}

		if (!newPassword.equals(cnfPassword)) {
			throw new IllegalArgumentException("Passwords do not match.");
		}

		User user = userOptional.get();

		// Update password
		String encryptedPassword = passwordEncoder.encode(newPassword);
		user.setPassword(encryptedPassword);
		user.setResetToken(null);  // Clear the reset token after successful reset

		userRepository.save(user);
	}*/

	public void updateUserProfile(String currentUserEmail, EditProfileRequest editProfileRequest) {
		// Find the user by the current logged-in email
		Optional<User> userOptional = userRepository.findByEmailId(currentUserEmail);

		if (userOptional.isEmpty()) {
			throw new IllegalArgumentException("User not found.");
		}

		User user = userOptional.get();

		// Update user profile information from the request
		user.setFirstName(editProfileRequest.getFirstName());
		user.setLastName(editProfileRequest.getLastName());
		user.setMobileNo(editProfileRequest.getMobileNo());
		user.setAddress(editProfileRequest.getAddress());
		user.setCity(editProfileRequest.getCity());
		user.setState(editProfileRequest.getState());
		user.setZipcode(editProfileRequest.getZipcode());

		// Save the updated user profile
		userRepository.save(user);
	}
}
