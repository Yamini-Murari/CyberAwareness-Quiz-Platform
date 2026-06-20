package com.cyberquest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/message")
@CrossOrigin(origins = "*")
public class MessageController {

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeMessage(@RequestBody Map<String, String> request) {
        String msg = request.get("message");
        if (msg == null || msg.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Message content cannot be blank.");
            return ResponseEntity.badRequest().body(error);
        }

        String content = msg.toLowerCase();
        String risk = "SAFE";
        String confidence = "96%";
        String category = "Safe Personal Message";
        List<String> issues = new ArrayList<>();
        String recommendation = "This message appears to be safe and personal. Keep practicing secure communication habits.";

        boolean hasLink = content.contains("http://") || content.contains("https://") || content.contains("www.") || content.contains(".com/") || content.contains(".in/") || content.contains(".net/");
        boolean hasUrgency = content.contains("immediately") || content.contains("urgently") || content.contains("within 24 hours") || content.contains("expires") || content.contains("locked") || content.contains("blocked") || content.contains("suspended") || content.contains("hurry");

        // 1. Check for OTP / Banking / Credentials Theft
        if (content.contains("otp") || content.contains("one-time password") || content.contains("verify pin") || content.contains("enter pin") || content.contains("card blocked") || content.contains("account locked") || content.contains("netbanking") || content.contains("passcode")) {
            risk = "DANGEROUS";
            confidence = "98%";
            category = "OTP & Banking Theft";
            issues.add("Requests sensitive credentials (OTP/PIN)");
            if (hasUrgency) {
                issues.add("Uses urgent pressure tactics");
            }
            if (hasLink) {
                issues.add("Contains redirection hyperlink");
            }
            recommendation = "Never share OTP, passwords, or transaction PINs with anyone. Real banks will never ask for private credentials over SMS or text.";
        }
        // 2. Check for UPI Cashback / Payment Scam
        else if (content.contains("cashback") || content.contains("refund") || content.contains("claim rupees") || content.contains("rupees received") || (content.contains("scan") && content.contains("pay")) || content.contains("upi pin")) {
            risk = "DANGEROUS";
            confidence = "94%";
            category = "UPI Payment Scam";
            issues.add("Promises unverified monetary returns");
            if (content.contains("pin") || content.contains("pay")) {
                issues.add("Instructs user to enter security PIN");
            }
            if (hasLink) {
                issues.add("Contains redirection link");
            }
            recommendation = "Do not enter your UPI PIN or scan QR codes to receive money. UPI PIN is strictly for authorizing outgoing payments.";
        }
        // 3. Check for Lottery / Reward Scam
        else if (content.contains("won") || content.contains("winner") || content.contains("prize") || content.contains("lottery") || content.contains("luckydraw") || content.contains("gift card") || content.contains("rewards")) {
            risk = "DANGEROUS";
            confidence = "92%";
            category = "Lottery Scam";
            issues.add("Promises fake cash rewards or prizes");
            if (hasLink) {
                issues.add("Contains suspicious link to claim reward");
            }
            if (hasUrgency) {
                issues.add("Indicates urgent claims expiration");
            }
            recommendation = "Genuine rewards do not require you to pay processing fees, fill credentials, or click external text links. Delete this message immediately.";
        }
        // 4. Check for Fake Internship / Job Scam
        else if (content.contains("job offer") || content.contains("work from home") || content.contains("part-time job") || content.contains("earn money daily") || content.contains("telegram task") || content.contains("youtube like task") || content.contains("salary")) {
            risk = "DANGEROUS";
            confidence = "89%";
            category = "Fake Internship / Job Scam";
            issues.add("Promises high rewards for simple tasks");
            issues.add("Directs communication to unverified social chat servers");
            if (hasLink) {
                issues.add("Contains suspicious links");
            }
            recommendation = "Avoid offers promising high hourly payout rates for liking videos or sharing Telegram tasks. This is a common pre-payment task scam.";
        }
        // 5. General Phishing/Suspicious attempt (has urgency and links but doesn't match above)
        else if (hasLink && hasUrgency) {
            risk = "DANGEROUS";
            confidence = "91%";
            category = "General Phishing Attempt";
            issues.add("Urgent call-to-action");
            issues.add("Contains external hyperlinks");
            recommendation = "Do not click on links from unknown senders. Always log in directly through the official website or app.";
        }
        // 6. Suspicious (has link, but no urgency, or has urgency, but no link)
        else if (hasLink || hasUrgency) {
            risk = "SUSPICIOUS";
            confidence = "78%";
            category = "Suspicious Communication";
            if (hasLink) {
                issues.add("Contains an unverified web address");
            }
            if (hasUrgency) {
                issues.add("Uses pushy or warning language");
            }
            recommendation = "Exercise caution. Confirm the authenticity of the sender through another trusted channel before taking action.";
        }

        Map<String, Object> response = new HashMap<>();
        response.put("risk", risk);
        response.put("confidence", confidence);
        response.put("category", category);
        response.put("issues", issues);
        response.put("recommendation", recommendation);

        return ResponseEntity.ok(response);
    }
}
