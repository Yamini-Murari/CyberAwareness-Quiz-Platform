package com.cyberquest.controller;

import com.cyberquest.model.User;
import com.cyberquest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable String email) {
        Optional<User> userOpt = userService.getUser(email);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        }
        Map<String, String> error = new HashMap<>();
        error.put("message", "Agent profile not found.");
        return ResponseEntity.notFound().build();
    }

    @PutMapping
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/{email}/progress")
    public ResponseEntity<?> updateProgress(
            @PathVariable String email,
            @RequestBody Map<String, Object> progressData) {
        
        String missionType = (String) progressData.get("missionType");
        
        Integer scoreIncrease = 0;
        if (progressData.get("scoreIncrease") != null) {
            scoreIncrease = ((Number) progressData.get("scoreIncrease")).intValue();
        }
        
        Boolean isCompleted = false;
        if (progressData.get("isCompleted") != null) {
            isCompleted = (Boolean) progressData.get("isCompleted");
        }

        try {
            User updatedUser = userService.updateProgress(email, missionType, scoreIncrease, isCompleted);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
