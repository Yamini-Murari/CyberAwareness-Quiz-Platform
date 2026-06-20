package com.cyberquest.controller;

import com.cyberquest.model.User;
import com.cyberquest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String username = request.get("username");
        String password = request.get("password");

        if (email == null || username == null || password == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "All fields are required.");
            return ResponseEntity.badRequest().body(error);
        }

        try {
            User registeredUser = userService.signup(email, username, password);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String identifier = request.get("identifier");
        if (identifier == null) {
            identifier = request.get("email"); // Fallback for email field name
        }
        String password = request.get("password");

        if (identifier == null || password == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email/Username and Password are required.");
            return ResponseEntity.badRequest().body(error);
        }

        try {
            User user = userService.login(identifier, password);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }
}
