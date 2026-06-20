# CyberQuest — Full-Stack Cybersecurity Learning Platform

CyberQuest is a gamified cybersecurity training platform designed to teach people how to recognize, analyze, and mitigate online threats. The project is built as a full-stack application featuring a React SPA frontend and a Spring Boot (Java) backend.

---

## 🚀 Key Features

*   **Cyber Command Center (Dashboard)**: Track agent clearance levels, XP, rank milestones, active objectives, and real-time operational feeds.
*   **Mission Hub**: Complete 10 specialized interactive training modules (Phishing, UPI scams, Privacy protection, Malware defense, etc.) filtered by categories and difficulty.
*   **Scam Message Analyzer**: Paste suspicious emails or SMS messages to get security advisories, confidence ratings, and earn XP by completing post-risk checklists.
*   **Performance Logs**: Analyze progress metrics with real-time SVG charts and detailed logs.
*   **Agent Profile & Preferences**: Modify agent codenames, passwords, dark/light themes, sound feedback, and accessibility scaling parameters.

---

## Run this on web browser : https://cyber-awareness-quiz-platform.vercel.app/

## 🛠️ Prerequisites

*   **Java**: Version 17 or higher
*   **Node.js**: Version 18 or higher (with npm)

---

## 💻 How to Run (Simple Steps)

### Step 1: Run the Backend
Open a terminal in the project root folder and run:
```bash
cd backend
```

*   **On Windows (PowerShell/CMD)**:
    ```cmd
    .\mvnw.cmd spring-boot:run
    ```
*   **On macOS/Linux**:
    ```bash
    chmod +x mvnw
    ./mvnw spring-boot:run
    ```
The backend server runs at **`http://localhost:8080`** (uses an in-memory H2 database, no setup required).

### Step 2: Run the Frontend
Open a new terminal in the project root folder and run:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** (or the port specified in the terminal) in your browser.

---

## 🎮 How to Use

1.  **Register an Agent**: Go to the Signup page, enter your email, create a codename, and set a password.
2.  **Access the Command Center**: Review your welcome profile, Level, Rank, and select **Continue Active Mission** or click on any navigation card.
3.  **Complete Missions**: In the Missions tab, select a module (e.g. *Phishing* or *UPI Scams*), read the scenario, and select the correct answer to complete it and gain XP.
4.  **Audit Suspicious Messages**: In the Message Analyzer tab, paste a sample message. Review the vulnerability audit, check the acknowledgement checkbox, and click **Mark as Reviewed** to earn extra XP.
5.  **Customize Your UI**: In the Profile tab, toggle light/dark modes, sound feedback, accessibility large fonts, or secure your session by logging out.

---

## ☁️ Production Deployment

*   **Frontend**: Ready for deployment on **Vercel** (with preconfigured `vercel.json` routing configuration).
*   **Backend**: Ready for deployment on **Render** (with Maven wrapper support and standard Spring Boot properties).
*   *For detailed hosting steps, please consult our deployment guide artifact.*
