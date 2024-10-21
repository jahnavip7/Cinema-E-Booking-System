package com.jts.movie.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.mail.MessagingException;
import java.util.Map;
import java.security.Principal;
import java.util.Optional;
import com.jts.movie.services.EmailService;
import com.jts.movie.config.JWTService;
import com.jts.movie.entities.User;
import com.jts.movie.request.UserRequest;
import com.jts.movie.request.EditProfileRequest;
import com.jts.movie.services.UserService;
import com.jts.movie.services.EmailService;
import com.jts.movie.repositories.UserRepository;
import com.jts.movie.entities.PaymentCard;
import java.util.List;
import java.util.UUID; // <-- For generating reset tokens
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JWTService jwtService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailService emailService;

	// User registration endpoint
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody @Valid UserRequest userRequest) {
		try {
			String message = userService.addUser(userRequest); // `addUser` now handles everything
			return new ResponseEntity<>(message, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// Email confirmation endpoint
	@GetMapping("/confirmRegistration")
	public ResponseEntity<String> confirmUserAccount(@RequestParam("token") String token) {
		try {
			userService.confirmRegistration(token); // Use the service method for confirmation
			return ResponseEntity.ok("User account successfully confirmed. You can now log in.");
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// User login endpoint
	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody UserRequest userRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(userRequest.getEmailId(), userRequest.getPassword()));

			if (authentication.isAuthenticated()) {
				String token = jwtService.generateToken(userRequest.getEmailId());
				return new ResponseEntity<>(token, HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/forgotPassword")
	public ResponseEntity<String> forgotPassword(@RequestBody @Valid UserRequest userRequest) {
		String email = userRequest.getEmailId(); // Use email from UserRequest
		Optional<User> userOptional = userRepository.findByEmailId(email);

		if (!userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
		}

		User user = userOptional.get();
		// Generate a reset token (UUID)
		String resetToken = UUID.randomUUID().toString();
		user.setResetToken(resetToken); // Ensure User entity has setResetToken() method
		userRepository.save(user);

		// Send only the reset token, not the full URL
		try {
			emailService.sendResetPasswordEmail(user.getEmailId(), resetToken); // Send only the reset token
		} catch (MessagingException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
		}

		return ResponseEntity.ok("Password reset link has been sent to your email");
	}


	@PostMapping("/resetPassword")
	public ResponseEntity<String> resetPassword(@RequestBody @Valid UserRequest userRequest, @RequestParam("token") String token) {
		Optional<User> userOptional = userRepository.findByResetToken(token);

		if (!userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid or expired token");
		}

		User user = userOptional.get();
		// Encrypt the new password and update it
		String encodedPassword = passwordEncoder.encode(userRequest.getPassword());
		user.setPassword(encodedPassword);
		user.setResetToken(null);  // Invalidate the reset token after successful reset
		userRepository.save(user);

		return ResponseEntity.ok("Password has been reset successfully");
	}


	// Edit profile endpoint
	@PutMapping("/editProfile")
	public ResponseEntity<String> editProfile(@RequestBody EditProfileRequest editProfileRequest, Principal principal) {
		try {
			String currentUserEmail = principal.getName();  // Get the logged-in user's email
			userService.updateUserProfile(currentUserEmail, editProfileRequest);
			return ResponseEntity.ok("Profile updated successfully.");
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

}
