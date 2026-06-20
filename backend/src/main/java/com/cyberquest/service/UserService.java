package com.cyberquest.service;

import com.cyberquest.model.User;
import com.cyberquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUser(String email) {
        if (email == null) return Optional.empty();
        return userRepository.findById(email.trim().toLowerCase());
    }

    public User saveUser(User user) {
        if (user == null || user.getEmail() == null) {
            throw new IllegalArgumentException("User or Email cannot be null");
        }
        user.setEmail(user.getEmail().trim().toLowerCase());
        return userRepository.save(user);
    }

    public User signup(String email, String username, String password) {
        String normalizedEmail = email.trim().toLowerCase();
        
        Optional<User> existing = userRepository.findById(normalizedEmail);
        if (existing.isPresent()) {
            throw new RuntimeException("AGENT ALREADY REGISTERED WITH THIS EMAIL");
        }
        
        User newUser = new User();
        newUser.setEmail(normalizedEmail);
        newUser.setUsername(username.trim());
        newUser.setPassword(password);
        newUser.setScore(0);
        newUser.setMissionsCompleted(0);
        newUser.setPartialProgress(new HashMap<>());
        newUser.setCompletedMissionsList(new ArrayList<>());
        newUser.setSettings(new HashMap<>());
        
        return userRepository.save(newUser);
    }

    public User login(String identifier, String password) {
        String id = identifier.trim().toLowerCase();
        
        // Search by email
        Optional<User> userOpt = userRepository.findById(id);
        
        // If not found by email, search by username
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByUsernameIgnoreCase(id);
        }
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        
        throw new RuntimeException("ACCESS DENIED: Invalid credentials. Check your email/username and password.");
    }

    public User updateProgress(String email, String missionType, Integer scoreIncrease, Boolean isCompleted) {
        Optional<User> userOpt = getUser(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        User user = userOpt.get();
        user.setScore(user.getScore() + (scoreIncrease != null ? scoreIncrease : 0));
        
        if (Boolean.TRUE.equals(isCompleted) && missionType != null) {
            user.setMissionsCompleted(user.getMissionsCompleted() + 1);
            
            List<String> completedList = user.getCompletedMissionsList();
            if (completedList == null) {
                completedList = new ArrayList<>();
            }
            if (!completedList.contains(missionType)) {
                completedList.add(missionType);
                user.setCompletedMissionsList(completedList);
            }
        }
        
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(String email) {
        String normalizedEmail = email.trim().toLowerCase();
        userRepository.deleteById(normalizedEmail);
    }
}
