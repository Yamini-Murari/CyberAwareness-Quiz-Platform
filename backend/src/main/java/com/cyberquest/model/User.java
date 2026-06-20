package com.cyberquest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String email;
    
    private String username;
    
    private String password;
    
    private int score;
    
    private int missionsCompleted;

    @Column(columnDefinition = "TEXT")
    @JsonIgnore
    private String partialProgressJson = "{}";

    @Column(columnDefinition = "TEXT")
    @JsonIgnore
    private String completedMissionsListJson = "[]";

    @Column(columnDefinition = "TEXT")
    @JsonIgnore
    private String settingsJson = "{}";

    @Transient
    private static final ObjectMapper mapper = new ObjectMapper();

    public User() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getMissionsCompleted() {
        return missionsCompleted;
    }

    public void setMissionsCompleted(int missionsCompleted) {
        this.missionsCompleted = missionsCompleted;
    }

    public String getPartialProgressJson() {
        return partialProgressJson;
    }

    public void setPartialProgressJson(String partialProgressJson) {
        this.partialProgressJson = partialProgressJson;
    }

    public String getCompletedMissionsListJson() {
        return completedMissionsListJson;
    }

    public void setCompletedMissionsListJson(String completedMissionsListJson) {
        this.completedMissionsListJson = completedMissionsListJson;
    }

    public String getSettingsJson() {
        return settingsJson;
    }

    public void setSettingsJson(String settingsJson) {
        this.settingsJson = settingsJson;
    }

    // JSON properties handled dynamically for Frontend Rest API compatibility
    
    public Map<String, Integer> getPartialProgress() {
        try {
            return mapper.readValue(partialProgressJson != null ? partialProgressJson : "{}", new TypeReference<Map<String, Integer>>() {});
        } catch (Exception e) {
            return new HashMap<>();
        }
    }

    public void setPartialProgress(Map<String, Integer> partialProgress) {
        try {
            this.partialProgressJson = mapper.writeValueAsString(partialProgress);
        } catch (Exception e) {
            this.partialProgressJson = "{}";
        }
    }

    public List<String> getCompletedMissionsList() {
        try {
            return mapper.readValue(completedMissionsListJson != null ? completedMissionsListJson : "[]", new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public void setCompletedMissionsList(List<String> completedMissionsList) {
        try {
            this.completedMissionsListJson = mapper.writeValueAsString(completedMissionsList);
        } catch (Exception e) {
            this.completedMissionsListJson = "[]";
        }
    }

    public Map<String, Boolean> getSettings() {
        try {
            return mapper.readValue(settingsJson != null ? settingsJson : "{}", new TypeReference<Map<String, Boolean>>() {});
        } catch (Exception e) {
            return new HashMap<>();
        }
    }

    public void setSettings(Map<String, Boolean> settings) {
        try {
            this.settingsJson = mapper.writeValueAsString(settings);
        } catch (Exception e) {
            this.settingsJson = "{}";
        }
    }
}
