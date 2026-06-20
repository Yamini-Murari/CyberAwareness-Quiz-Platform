export const allScenarios = [
    // --- PHISHING (10 Questions) ---
    { 
        type: "PHISHING", title: "The Bank Verification Scam", difficulty: "Easy", icon: "📧",
        desc: "You receive an SMS: 'Alert! Your HDFC account will be blocked. Update KYC now at: http://hdfc-kyc-verify.xyz/update'", 
        options: [
            { text: "Click link and provide details", isCorrect: false, reason: "The URL is fake. Official bank websites always use '.com' or '.in' and never use suspicious domains like '.xyz'.", lesson: "Always look for 'HTTPS' and verify the domain name character by character. Banks never ask for sensitive info via SMS links." },
            { text: "Ignore and report the number", isCorrect: true, reason: "You correctly identified 'Sense of Urgency'—a tactic scammers use to make you panic and bypass critical thinking.", lesson: "When you get an 'urgent' alert, take a breath. Contact your bank through their official app or verified customer care number instead." },
            { text: "Call the sender number to check", isCorrect: false, reason: "Scammers often spoof numbers or use temporary ones. Calling them back confirms your number is active.", lesson: "Never use contact info provided in a suspicious SMS. Use official channels only." },
            { text: "Forward the SMS to your friends", isCorrect: false, reason: "Forwarding spreads the scam and might trick your friends into clicking.", lesson: "Report scams to official cybercrime portals instead of spreading them." }
        ] 
    },
    { 
        type: "PHISHING", title: "The 'Urgent' Invoice", difficulty: "Medium", icon: "📄",
        desc: "An email from 'service@pay-pal-security.com' says: 'Your payment of $499.99 to ABC Corp is successful. If you didn't do this, download the attached invoice.pdf to cancel.'", 
        options: [
            { text: "Download invoice to check", isCorrect: false, reason: "Attachments from unknown senders can contain malware.", lesson: "Check the sender's actual email address. 'pay-pal-security.com' is NOT paypal.com." },
            { text: "Check official account directly", isCorrect: true, reason: "Smart move! You didn't fall for the 'fear tactic'.", lesson: "Always verify via official channels, never via email links or files." },
            { text: "Reply asking for a refund", isCorrect: false, reason: "Replying confirms your email is valid and active, leading to more spam.", lesson: "Don't engage with phishers. It only invites more attacks." },
            { text: "Click the 'Unsubscribe' link", isCorrect: false, reason: "In phishing emails, 'Unsubscribe' links often lead to malicious sites or confirm your email.", lesson: "Unsubscribe only from trusted, legitimate newsletters." }
        ] 
    },
    { 
        type: "PHISHING", title: "Social Media Account Alert", difficulty: "Medium", icon: "📱",
        desc: "An email says: 'Suspicious login on your Instagram. Click here to secure your account.' The link is 'instragram-security-fix.net'.",
        options: [
            { text: "Click to secure account", isCorrect: false, reason: "The domain 'instragram' has a typo (extra 'r'). It's a phishing site.", lesson: "Phishers often use typosquatting to mimic real brands." },
            { text: "Open Instagram app manually", isCorrect: true, reason: "Safest path! You bypass the fake link and check the real app settings.", lesson: "Always go to the official app or site directly." },
            { text: "Forward to Instagram support", isCorrect: false, reason: "Instagram support usually doesn't process forwarded emails this way.", lesson: "Use the 'Report Phishing' feature inside the app instead." },
            { text: "Change password using the link", isCorrect: false, reason: "The link will steal your current and new password.", lesson: "Changing passwords should only be done on the official domain." }
        ]
    },
    { 
        type: "PHISHING", title: "Lottery Winner Notification", difficulty: "Easy", icon: "🏆",
        desc: "An email claims you've won $1,000,000 in a lottery you never entered. It asks for your bank details to transfer the prize.",
        options: [
            { text: "Provide bank details", isCorrect: false, reason: "You can't win a lottery you didn't enter. They want to drain your account.", lesson: "If it sounds too good to be true, it is." },
            { text: "Mark as Spam and delete", isCorrect: true, reason: "You avoided a classic advance-fee fraud attempt.", lesson: "Never share banking details with unknown entities." },
            { text: "Email them to ask for proof", isCorrect: false, reason: "They will send fake documents to look more convincing.", lesson: "Proof from a scammer is always forged. Don't waste time." },
            { text: "Pay the 'transfer fee' requested", isCorrect: false, reason: "Asking for a small fee to release a large prize is the core of this scam.", lesson: "You never have to pay money to receive legitimate prize winnings." }
        ]
    },
    { 
        type: "PHISHING", title: "Tax Refund Scam", difficulty: "Medium", icon: "💰",
        desc: "A text from 'IRS-Refund' says you have an unclaimed tax refund of $500. Click to verify your SSN and bank info.",
        options: [
            { text: "Verify details online", isCorrect: false, reason: "Government agencies don't initiate contact via text for sensitive info.", lesson: "Official agencies use postal mail for such notifications." },
            { text: "Block the number", isCorrect: true, reason: "You recognized a government impersonation scam.", lesson: "Never give personal ID numbers via text links." },
            { text: "Text back 'STOP'", isCorrect: false, reason: "Texting back confirms your number is active and monitored.", lesson: "Simply block and report the number without responding." },
            { text: "Call the IRS immediately", isCorrect: false, reason: "You should use the official IRS number from their website, not one from the text.", lesson: "Verify government claims through official websites only." }
        ]
    },
    { 
        type: "PHISHING", title: "Cloud Storage Full", difficulty: "Easy", icon: "☁️",
        desc: "An email from 'Cloud-Support' says your storage is full and files will be deleted in 1 hour. Click to upgrade for free.",
        options: [
            { text: "Click to upgrade", isCorrect: false, reason: "The '1 hour' limit is a panic tactic used by phishers.", lesson: "Check your storage status through the official app settings." },
            { text: "Check storage in app", isCorrect: true, reason: "You verified the claim independently.", lesson: "Always verify 'account alerts' via the service's official interface." },
            { text: "Delete large files quickly", isCorrect: false, reason: "Acting in haste might lead you to click the malicious link anyway.", lesson: "Take a moment to verify the sender before taking any action." },
            { text: "Reply to ask for more time", isCorrect: false, reason: "This confirms your email is active and you are worried.", lesson: "Automated support emails usually don't accept replies." }
        ]
    },
    { 
        type: "PHISHING", title: "Netflix Billing Issue", difficulty: "Medium", icon: "🎬",
        desc: "An email from 'netflix-support@billing-info.com' says your membership is on hold due to a payment failure. Click to update card.",
        options: [
            { text: "Update card details", isCorrect: false, reason: "The sender domain is not netflix.com. It's a credential harvester.", lesson: "Check the sender's address. Scammers use realistic-looking support emails." },
            { text: "Go to Netflix.com directly", isCorrect: true, reason: "You bypassed the trap and used the official site.", lesson: "Manual navigation is the ultimate defense against phishing links." },
            { text: "Click 'Help Center' in email", isCorrect: false, reason: "The 'Help Center' link in a phishing email also leads to a fake site.", lesson: "All links in a phishing email should be treated as dangerous." },
            { text: "Call the number in the footer", isCorrect: false, reason: "Scammers put their own 'customer care' numbers in fake emails.", lesson: "Use support numbers only from the official app or website." }
        ]
    },
    { 
        type: "PHISHING", title: "LinkedIn Connection Request", difficulty: "Easy", icon: "🤝",
        desc: "You get a LinkedIn notification from a high-profile CEO. The 'Accept' button in the email points to 'link-accept.biz/CEO-Name'.",
        options: [
            { text: "Accept in the email", isCorrect: false, reason: "The URL is not linkedin.com. It's a fake login page.", lesson: "Check the URL before clicking 'buttons' in emails." },
            { text: "Check LinkedIn app", isCorrect: true, reason: "You verified the request in the real environment.", lesson: "Social media requests should always be handled inside the app." },
            { text: "Search for the CEO on Google", isCorrect: false, reason: "Finding a real CEO doesn't mean the email came from them.", lesson: "Verify the sender's identity, not just that the person exists." },
            { text: "Accept and message them", isCorrect: false, reason: "Interacting with a fake profile puts your account at risk.", lesson: "Ensure the profile is legitimate before connecting." }
        ]
    },
    { 
        type: "PHISHING", title: "Amazon Order Problem", difficulty: "Medium", icon: "📦",
        desc: "An email says: 'Your Amazon order #12345 has a shipping error. Confirm your address here.' You didn't order anything.",
        options: [
            { text: "Click to fix error", isCorrect: false, reason: "If you didn't order anything, it's a scam to get your login info.", lesson: "Scammers send mass emails hoping to hit someone who actually ordered something." },
            { text: "Delete the email", isCorrect: true, reason: "You recognized it as a random phishing attempt.", lesson: "If you didn't trigger an action, be wary of 'errors' related to it." },
            { text: "Reply 'Wrong person'", isCorrect: false, reason: "Confirming your email address is active makes you a target for more spam.", lesson: "Silence is the best response to unsolicited suspicious emails." },
            { text: "Check your bank for charges", isCorrect: false, reason: "While smart, don't click any links in the email to do so.", lesson: "Check bank statements independently of the email's claims." }
        ]
    },
    { 
        type: "PHISHING", title: "Corporate IT Alert", difficulty: "Hard", icon: "🖥️",
        desc: "An email from 'IT-Helpdesk@yourcompany.co' (notice the .co instead of .com) says you need to reset your password immediately.",
        options: [
            { text: "Click the reset link", isCorrect: false, reason: "The domain extension (.co) is wrong. This is 'Spear Phishing'.", lesson: "Pay attention to tiny details in work emails. Phishers mimic internal styles." },
            { text: "Report to real IT desk", isCorrect: true, reason: "Perfect! You spotted the subtle domain change.", lesson: "Always report suspicious work emails to your actual IT department." },
            { text: "Reset using company portal", isCorrect: false, reason: "If the email is fake, you don't need to reset your password at all.", lesson: "Verify the threat before taking unnecessary security actions." },
            { text: "Ask your manager about it", isCorrect: false, reason: "Managers might not be aware of IT alerts or phishing campaigns.", lesson: "IT issues should be verified directly with the IT department." }
        ]
    },

    // --- UPI (10 Questions) ---
    { 
        type: "UPI", title: "The Mystery QR Code", difficulty: "Easy", icon: "💸",
        desc: "A buyer on OLX says: 'I am sending a QR code. Scan it and enter your PIN to receive the advance payment.'", 
        options: [
            { text: "Scan and enter PIN", isCorrect: false, reason: "UPI PIN is only required to DEBIT money. It is NEVER required to receive money.", lesson: "If someone asks for a PIN to 'receive' money, it is a 100% scam." },
            { text: "Refuse and cancel deal", isCorrect: true, reason: "You avoided a common QR code scam.", lesson: "PIN = Send Money. No PIN = Receive Money." },
            { text: "Ask for their phone number", isCorrect: false, reason: "Scammers use fake or stolen phone numbers to seem legitimate.", lesson: "Communication channel doesn't matter if the request is fraudulent." },
            { text: "Scan but don't enter PIN", isCorrect: false, reason: "Scanning can sometimes trigger malicious actions or expose data.", lesson: "Don't scan unknown QR codes for payment receiving." }
        ] 
    },
    { 
        type: "UPI", title: "The Cashback Trap", difficulty: "Medium", icon: "💰",
        desc: "You get a notification: 'Congratulations! You won ₹500 cashback. Click here to claim it via PhonePe.' The app shows a 'PAY' button.", 
        options: [
            { text: "Click 'PAY' to claim", isCorrect: false, reason: "The 'PAY' button sends money AWAY. You cannot 'pay' to receive.", lesson: "Cashbacks are automatic. 'Pay' buttons are for outgoing funds." },
            { text: "Close app and ignore", isCorrect: true, reason: "Correct! You noticed the button said 'PAY'.", lesson: "Always read the transaction screen carefully." },
            { text: "Check PhonePe rewards section", isCorrect: false, reason: "Checking is good, but don't use the notification's link to get there.", lesson: "Navigate rewards only within the official app's menus." },
            { text: "Call the number in notification", isCorrect: false, reason: "Notifications can be spoofed to show fake support numbers.", lesson: "Trust only official support channels listed in the app." }
        ] 
    },
    { 
        type: "UPI", title: "Screen Sharing Scam", difficulty: "Hard", icon: "📲",
        desc: "A 'bank official' calls to fix a UPI issue and asks you to download 'AnyDesk' or 'TeamViewer' to guide you.",
        options: [
            { text: "Download and share ID", isCorrect: false, reason: "Screen sharing apps let the scammer see your PIN and OTPs as you type them.", lesson: "Banks NEVER ask you to download screen-sharing software." },
            { text: "Hang up immediately", isCorrect: true, reason: "You prevented full remote access to your device.", lesson: "Remote access is the #1 way scammers take control of your bank apps." },
            { text: "Download but don't share", isCorrect: false, reason: "Having such apps can be risky if you aren't an expert. Scammers are persuasive.", lesson: "Don't install unrequested software on a stranger's advice." },
            { text: "Ask for their employee ID", isCorrect: false, reason: "Scammers have fake IDs ready to sound professional.", lesson: "Verifying an ID doesn't make the request for remote access legitimate." }
        ]
    },
    { 
        type: "UPI", title: "Request Money Spam", difficulty: "Easy", icon: "⚠️",
        desc: "You receive a 'Collect Request' on Google Pay for ₹2000 from 'Official_Reward_Center'.",
        options: [
            { text: "Approve to see reward", isCorrect: false, reason: "Approving a request sends your money to the requester.", lesson: "Collect requests are used by scammers to trick you into 'paying' for a fake reward." },
            { text: "Decline and Block", isCorrect: true, reason: "You recognized an unsolicited payment request.", lesson: "Only approve requests from people you actually owe money to." },
            { text: "Ignore the request", isCorrect: false, reason: "Ignoring might leave the request active and lead to accidental approval later.", lesson: "Active refusal (Decline) is safer than passive ignoring." },
            { text: "Message the requester", isCorrect: false, reason: "Messaging reveals you are active and can lead to social engineering.", lesson: "Don't engage with unknown requesters." }
        ]
    },
    { 
        type: "UPI", title: "Wrong Number Transfer", difficulty: "Medium", icon: "📞",
        desc: "Someone calls crying: 'I sent ₹5000 to your number by mistake! Please send it back to this other number.'",
        options: [
            { text: "Send to the new number", isCorrect: false, reason: "This is often a 'money mule' scam or a fraudulent reversal trick.", lesson: "Tell them to contact their bank. Don't transfer to a *different* number yourself." },
            { text: "Tell them to contact bank", isCorrect: true, reason: "You avoided becoming part of a fraudulent transaction chain.", lesson: "Let the official banking system handle 'wrong transfers'." },
            { text: "Wait for your bank to notify", isCorrect: false, reason: "Waiting might give the scammer more time to pressure you.", lesson: "Take a proactive stance by directing them to official channels." },
            { text: "Send it back to the SAME number", isCorrect: false, reason: "Even sending back to the same number can be part of a 'reversal' fraud.", lesson: "Never handle 'refunds' manually for strangers." }
        ]
    },
    { 
        type: "UPI", title: "Verification Fee", difficulty: "Easy", icon: "🔍",
        desc: "To win a ₹10,000 contest, you are asked to send ₹1 as a 'verification fee' to a UPI ID.",
        options: [
            { text: "Send ₹1 to verify", isCorrect: false, reason: "Once you send ₹1, they know your account is active and will try larger scams.", lesson: "Legit contests don't need a 'verification fee' via UPI." },
            { text: "Ignore the contest", isCorrect: true, reason: "You avoided the 'foot-in-the-door' technique.", lesson: "Small payments are often traps for much larger fraud." },
            { text: "Check contest on Twitter", isCorrect: false, reason: "Scammers create fake social media hype to look real.", lesson: "Verify contest sponsors via their official, verified accounts only." },
            { text: "Report the UPI ID", isCorrect: false, reason: "Reporting is good, but ensure you don't engage with the scam first.", lesson: "Stay safe first, then report the fraud attempt." }
        ]
    },
    { 
        type: "UPI", title: "Unverified VPA", difficulty: "Medium", icon: "🆔",
        desc: "You're paying a local shop. The QR code shows 'Shop_Name@ybl' but the app says 'Verified Name: Rajesh_Kumar_Scam'.",
        options: [
            { text: "Pay anyway", isCorrect: false, reason: "The mismatch between the shop name and verified name is a huge red flag.", lesson: "Always check the 'Verified Name' in the UPI app before hitting 'Pay'." },
            { text: "Ask for another QR", isCorrect: true, reason: "You noticed the identity mismatch.", lesson: "Verified names are harder for scammers to fake than the display name on a sticker." },
            { text: "Pay using cash", isCorrect: false, reason: "While safe, the shop might be using a compromised QR code.", lesson: "Inform the merchant about the suspicious verified name." },
            { text: "Scan again and try", isCorrect: false, reason: "Scanning again will show the same suspicious name.", lesson: "Trust the app's verified name warning over the sticker." }
        ]
    },
    { 
        type: "UPI", title: "SIM Swap Warning", difficulty: "Hard", icon: "📶",
        desc: "Your phone suddenly loses signal. A few minutes later, you get an email about a new UPI registration on a different device.",
        options: [
            { text: "Wait for signal to return", isCorrect: false, reason: "Your SIM might have been 'swapped'. Every minute you wait, they drain your account.", lesson: "Immediate action is required if your SIM stops working unexpectedly." },
            { text: "Contact bank/provider now", isCorrect: true, reason: "Quick reaction! You can block your accounts before the scammer acts.", lesson: "Loss of signal + unexpected account alerts = Emergency." },
            { text: "Restart your phone", isCorrect: false, reason: "Restarting won't fix a deactivated SIM and wastes precious time.", lesson: "Don't delay security checks with technical troubleshooting." },
            { text: "Try to log into UPI app", isCorrect: false, reason: "You won't get the required SMS OTP without a working SIM.", lesson: "Use a different phone or landline to call your bank immediately." }
        ]
    },
    { 
        type: "UPI", title: "Electricity Bill Threat", difficulty: "Medium", icon: "💡",
        desc: "A WhatsApp message: 'Your electricity will be cut at 9 PM due to unpaid bills. Pay now via this UPI link to avoid disconnection.'",
        options: [
            { text: "Pay via the link", isCorrect: false, reason: "Utility companies don't use WhatsApp links for urgent payments.", lesson: "Check your bill status on the official utility website or app." },
            { text: "Check official portal", isCorrect: true, reason: "You verified the threat independently.", lesson: "Scammers use 'Utility Disconnection' to create extreme panic." },
            { text: "Call the number in message", isCorrect: false, reason: "The number belongs to the scammer who will pressure you more.", lesson: "Never use contact info from a threatening unsolicited message." },
            { text: "Forward to your neighbors", isCorrect: false, reason: "You are spreading fear and a malicious link.", lesson: "Warn others about the scam type without sharing the link." }
        ]
    },
    { 
        type: "UPI", title: "Customer Care Search", difficulty: "Medium", icon: "🎧",
        desc: "You find a 'Customer Care' number for PhonePe on a random Google image. The person asks for your PIN to 'refund' a failed payment.",
        options: [
            { text: "Give PIN for refund", isCorrect: false, reason: "Customer care NEVER needs your PIN. The number on Google was likely a scammer's.", lesson: "Only use support numbers found inside the official app." },
            { text: "Hang up and use app help", isCorrect: true, reason: "You recognized that PIN requests are always fraudulent.", lesson: "Search engines often show fake support numbers at the top of results." },
            { text: "Ask for their employee ID", isCorrect: false, reason: "Fake IDs are part of the scammer's script.", lesson: "Professionalism is a tactic, not a guarantee of legitimacy." },
            { text: "Give OTP instead of PIN", isCorrect: false, reason: "OTP is as sensitive as your PIN. Never share it.", lesson: "PINs and OTPs are for your eyes only." }
        ]
    },

    // --- SOCIAL (10 Questions) ---
    { 
        type: "SOCIAL", title: "The 'Friend in Trouble'", difficulty: "Medium", icon: "🆘",
        desc: "A friend messages you on Instagram: 'Hey, I'm stuck at the hospital and my UPI isn't working. Can you send ₹2000 to this number?'", 
        options: [
            { text: "Send money immediately", isCorrect: false, reason: "Accounts can be hacked. Scammers impersonate friends.", lesson: "Always call the friend on their normal phone number to verify." },
            { text: "Call the friend to verify", isCorrect: true, reason: "Perfect! A voice call proves if the request is real.", lesson: "If they 'can't talk', it's a red flag." },
            { text: "Ask for a hospital photo", isCorrect: false, reason: "Scammers have fake or stolen photos ready to show.", lesson: "Visual 'proof' is easily faked in the age of AI and stock photos." },
            { text: "Message their other friends", isCorrect: false, reason: "They might also be getting the same scam message.", lesson: "Direct verification with the person is the only safe way." }
        ] 
    },
    { 
        type: "SOCIAL", title: "The Giveaway Tag", difficulty: "Easy", icon: "🎁",
        desc: "You're tagged in a post: 'You won an iPhone! Click the link in our bio to pay for shipping.'",
        options: [
            { text: "Click bio link", isCorrect: false, reason: "Fake giveaways use 'shipping fees' to steal credit card info.", lesson: "Real giveaways don't ask winners to pay for anything." },
            { text: "Report the account", isCorrect: true, reason: "You stopped the scammer from reaching others.", lesson: "Reporting helps platforms remove bot accounts." },
            { text: "Comment 'Thank you!'", isCorrect: false, reason: "Commenting increases the post's reach and tricks more people.", lesson: "Don't engage with scam posts; it helps their algorithm." },
            { text: "Share to your story", isCorrect: false, reason: "You are helping the scammer reach your own followers.", lesson: "Think twice before sharing 'too good to be true' offers." }
        ]
    },
    { 
        type: "SOCIAL", title: "Romance Interest", difficulty: "Hard", icon: "❤️",
        desc: "Someone attractive you met online 'wants to send you an expensive gift' but says you need to pay the 'customs duty' first.",
        options: [
            { text: "Pay the customs duty", isCorrect: false, reason: "This is a classic 'Romance Scam'. There is no gift.", lesson: "Never send money to someone you've only met online." },
            { text: "Block and move on", isCorrect: true, reason: "You avoided a deep emotional and financial trap.", lesson: "Scammers build trust over weeks before asking for money." },
            { text: "Ask for a video call", isCorrect: false, reason: "Deepfake tech can now mimic faces and voices in real-time.", lesson: "Video calls are no longer a 100% guarantee of identity." },
            { text: "Pay using a credit card", isCorrect: false, reason: "You are giving your card details to a criminal organization.", lesson: "Financial data is the ultimate prize for these scammers." }
        ]
    },
    { 
        type: "SOCIAL", title: "The Viral Poll", difficulty: "Easy", icon: "📊",
        desc: "A Facebook poll asks: 'What was your first pet's name? Your answer tells you your superhero name!'",
        options: [
            { text: "Answer the poll", isCorrect: false, reason: "These are often security question answers for your bank/email.", lesson: "Don't share 'personal trivia' that could be used for account recovery." },
            { text: "Ignore the poll", isCorrect: true, reason: "You protected your security question answers.", lesson: "Social engineering often disguises itself as fun games." },
            { text: "Share with friends", isCorrect: false, reason: "You are exposing your friends to the same data-harvesting trap.", lesson: "Viral trends are often used to collect user data at scale." },
            { text: "Answer with a fake name", isCorrect: false, reason: "It's better to just avoid these data-mining traps entirely.", lesson: "Minimize your digital footprint on public forums." }
        ]
    },
    { 
        type: "SOCIAL", title: "Impersonation Request", difficulty: "Medium", icon: "👤",
        desc: "You get a friend request from someone you're already friends with. They say: 'My old account was deleted, add me here!'",
        options: [
            { text: "Add them and chat", isCorrect: false, reason: "It's likely a clone account used to scam your mutual friends.", lesson: "Check with the friend via their 'old' account or phone first." },
            { text: "Check with friend first", isCorrect: true, reason: "You spotted a 'Cloned Profile'.", lesson: "Scammers copy profiles to exploit existing trust." },
            { text: "Report the old account", isCorrect: false, reason: "The old account is likely the real one; you'd be reporting your friend.", lesson: "Verify which account is real before taking reporting action." },
            { text: "Ask a personal question", isCorrect: false, reason: "Scammers can find personal info from your public posts to answer correctly.", lesson: "Private communication is safer than public trivia tests." }
        ]
    },
    { 
        type: "SOCIAL", title: "Investment 'Guru'", difficulty: "Hard", icon: "📈",
        desc: "A member of a Telegram group promises '200% returns in 24 hours' using a secret crypto bot.",
        options: [
            { text: "Invest a small amount", isCorrect: false, reason: "Even small 'test' amounts are gone forever. It's a Ponzi scam.", lesson: "Guaranteed high returns are always a lie." },
            { text: "Leave the group", isCorrect: true, reason: "You avoided a financial scam.", lesson: "Telegram and WhatsApp groups are major hubs for fake investment schemes." },
            { text: "Invite friends to join", isCorrect: false, reason: "You are leading your friends into a financial trap.", lesson: "Don't promote unverified investment schemes." },
            { text: "Ask for a demo", isCorrect: false, reason: "Scammers use fake dashboards to show 'profit' that doesn't exist.", lesson: "Visual proof of profit is easily fabricated." }
        ]
    },
    { 
        type: "SOCIAL", title: "The Job Referral", difficulty: "Medium", icon: "💼",
        desc: "A stranger on LinkedIn offers to refer you to Google but asks for a 'referral processing fee'.",
        options: [
            { text: "Pay the fee", isCorrect: false, reason: "Real employees never charge for referrals. It's against company policies.", lesson: "Professional networking doesn't involve 'processing fees'." },
            { text: "Report to LinkedIn", isCorrect: true, reason: "You helped keep the platform professional.", lesson: "Scammers use job-seeker desperation to extract quick cash." },
            { text: "Negotiate the fee", isCorrect: false, reason: "Any fee request for a referral is a 100% sign of a scam.", lesson: "Walk away immediately from such 'offers'." },
            { text: "Send your resume only", isCorrect: false, reason: "They will use your resume to build more convincing fake profiles.", lesson: "Don't share professional data with suspicious strangers." }
        ]
    },
    { 
        type: "SOCIAL", title: "Charity Appeal", difficulty: "Easy", icon: "🏥",
        desc: "A viral post shows a sick child and asks for donations to a personal UPI ID, not a registered charity.",
        options: [
            { text: "Donate via UPI", isCorrect: false, reason: "Emotional posts are often faked by scammers to collect 'donations'.", lesson: "Only donate through verified platforms or registered NGOs." },
            { text: "Verify the NGO first", isCorrect: true, reason: "You ensured your money goes to a real cause.", lesson: "Always look for a registered charity name and tax-exempt status." },
            { text: "Share to raise awareness", isCorrect: false, reason: "If it's a scam, you are helping them steal from more people.", lesson: "Verify before you amplify." },
            { text: "Comment 'God bless'", isCorrect: false, reason: "This helps the post's visibility without verifying its truth.", lesson: "Be critical of emotional content on social media." }
        ]
    },
    { 
        type: "SOCIAL", title: "The 'Verification' Code", difficulty: "Hard", icon: "🔑",
        desc: "A friend says: 'I accidentally sent my WhatsApp login code to your phone. Can you send it back to me?'",
        options: [
            { text: "Send the code", isCorrect: false, reason: "That code is actually for YOUR account. They are trying to hack you.", lesson: "Never share login codes, even with 'friends' (who might be hacked themselves)." },
            { text: "Refuse and call friend", isCorrect: true, reason: "You saved your account from being stolen.", lesson: "Account takeover often starts with a 'misdirected code' trick." },
            { text: "Forward it to WhatsApp", isCorrect: false, reason: "Forwarding the code might still lead to account loss.", lesson: "Keep all 2FA codes strictly to yourself." },
            { text: "Delete the code", isCorrect: false, reason: "Deleting is good, but warn your friend they might be hacked.", lesson: "Help others by reporting suspicious activity on their behalf." }
        ]
    },
    { 
        type: "SOCIAL", title: "Public Figure Giveaway", difficulty: "Easy", icon: "🌟",
        desc: "A 'Verified' account (with a slightly different name) of a famous celebrity is giving away $500 to everyone who comments.",
        options: [
            { text: "Comment and wait", isCorrect: false, reason: "It's a bot account trying to find active targets for further scams.", lesson: "Celebrities don't give away cash to random commenters." },
            { text: "Check for the real badge", isCorrect: true, reason: "You noticed the handle was slightly different.", lesson: "Look for the official verification badge and follower count." },
            { text: "Click the link in bio", isCorrect: false, reason: "The link will likely lead to a phishing site or malware.", lesson: "Avoid clicking links on unverified 'fan' or 'giveaway' accounts." },
            { text: "Tag your friends", isCorrect: false, reason: "You are exposing your network to a scam.", lesson: "Protect your circle by not engaging with obvious fraud." }
        ]
    },

    // --- PRIVACY (10 Questions) ---
    { 
        type: "PRIVACY", title: "The 'Free' Game App", difficulty: "Easy", icon: "🔦",
        desc: "A new flashlight app asks for access to your Contacts, Camera, and Microphone.", 
        options: [
            { text: "Grant all permissions", isCorrect: false, reason: "A flashlight app doesn't need your contacts. This is 'Data Harvesting'.", lesson: "Only give permissions apps actually need." },
            { text: "Deny and uninstall", isCorrect: true, reason: "Good catch! You protected your personal data.", lesson: "Utility apps shouldn't need personal data." },
            { text: "Allow only camera", isCorrect: false, reason: "A flashlight app uses the LED, not necessarily the camera sensor data.", lesson: "Be skeptical of any permission that seems unnecessary." },
            { text: "Grant only while using", isCorrect: false, reason: "Even temporary access can be used to steal your entire contact list.", lesson: "Permissions should be logical for the app's function." }
        ] 
    },
    { 
        type: "PRIVACY", title: "Browser Extension", difficulty: "Medium", icon: "🧩",
        desc: "A 'Coupon Finder' extension asks for permission to 'Read and change all your data on the websites you visit'.",
        options: [
            { text: "Install extension", isCorrect: false, reason: "This means it can see your passwords and credit cards as you type them.", lesson: "Extensions can be powerful spyware. Only install trusted ones." },
            { text: "Use official coupons", isCorrect: true, reason: "You avoided a major privacy risk.", lesson: "Limit the number of extensions you use." },
            { text: "Use in Incognito only", isCorrect: false, reason: "Extensions can often be enabled in Incognito too.", lesson: "Privacy modes don't always protect against malicious extensions." },
            { text: "Install on second browser", isCorrect: false, reason: "It can still track your habits and data on that browser.", lesson: "Security is about reducing risk, not just moving it." }
        ]
    },
    { 
        type: "PRIVACY", title: "Public Charging Station", difficulty: "Hard", icon: "🔌",
        desc: "Your phone is low at the mall. You see a free USB charging station. What do you do?",
        options: [
            { text: "Plug in directly", isCorrect: false, reason: "This is 'Juice Jacking'. The USB cable can steal your data while charging.", lesson: "Use your own power brick or a 'USB data blocker'." },
            { text: "Use your own brick", isCorrect: true, reason: "You avoided a potential hardware-based hack.", lesson: "Only trust your own charging equipment." },
            { text: "Charge while phone is off", isCorrect: false, reason: "Some devices can still be accessed or have malware injected even when 'off'.", lesson: "Data pins in USB can be active regardless of power state." },
            { text: "Select 'Charge Only' mode", isCorrect: false, reason: "Sophisticated attacks can bypass this software setting.", lesson: "Physical security (your own brick) is better than software settings." }
        ]
    },
    { 
        type: "PRIVACY", title: "Smart Home Privacy", difficulty: "Easy", icon: "🏠",
        desc: "You just bought a smart speaker. Should you leave it on default settings?",
        options: [
            { text: "Leave as is", isCorrect: false, reason: "Default settings often record 'everything' to improve AI, which is a privacy risk.", lesson: "Review privacy settings and turn off 'voice recording storage'." },
            { text: "Review privacy settings", isCorrect: true, reason: "You took control of your home data.", lesson: "Always check the 'Privacy' tab on new gadgets." },
            { text: "Put it in the bedroom", isCorrect: false, reason: "Microphones in private spaces are a major privacy concern.", lesson: "Be mindful of where you place always-on listening devices." },
            { text: "Connect to your main WiFi", isCorrect: false, reason: "Smart devices are often less secure and can be a bridge to your laptop.", lesson: "Use a guest network for IoT devices." }
        ]
    },
    { 
        type: "PRIVACY", title: "Incognito Mode Myth", difficulty: "Easy", icon: "🕶️",
        desc: "Does 'Incognito' or 'Private' mode hide your activity from your Internet Provider (ISP)?",
        options: [
            { text: "Yes, I'm invisible", isCorrect: false, reason: "Incognito only hides history *on your device*. Your ISP still sees everything.", lesson: "Use a VPN for actual network-level privacy." },
            { text: "No, ISP can still see", isCorrect: true, reason: "You understand the limits of browser privacy.", lesson: "Incognito is for hiding history from other people *using the same computer*." },
            { text: "Yes, it hides my IP", isCorrect: false, reason: "Incognito doesn't change your IP address.", lesson: "Only a VPN or proxy can mask your IP address." },
            { text: "It stops all trackers", isCorrect: false, reason: "Trackers can still identify you via 'Browser Fingerprinting'.", lesson: "Privacy requires more than just clearing local history." }
        ]
    },
    { 
        type: "PRIVACY", title: "Location Sharing", difficulty: "Medium", icon: "📍",
        desc: "A photo-editing app asks to 'Always' access your location, even when not using the app.",
        options: [
            { text: "Allow Always", isCorrect: false, reason: "This lets the app track your movements 24/7 and sell the data.", lesson: "Use 'While Using App' or 'Never' for most apps." },
            { text: "Set to 'While Using'", isCorrect: true, reason: "You minimized your tracking footprint.", lesson: "Apps rarely need 'Always' location access." },
            { text: "Allow for 24 hours", isCorrect: false, reason: "The app can still build a significant profile of your habits in 24 hours.", lesson: "Be stingy with location data." },
            { text: "Grant only if it fails", isCorrect: false, reason: "Many apps will function fine without location; they just want the data.", lesson: "Test app functionality before granting invasive permissions." }
        ]
    },
    { 
        type: "PRIVACY", title: "Old Account Security", difficulty: "Medium", icon: "🗑️",
        desc: "You have an old social media account you haven't used in 5 years. What should you do?",
        options: [
            { text: "Leave it there", isCorrect: false, reason: "If that site gets hacked, your old data (and reuse passwords) are exposed.", lesson: "Delete accounts you no longer use." },
            { text: "Delete the account", isCorrect: true, reason: "You reduced your 'Attack Surface'.", lesson: "Digital hygiene includes cleaning up old profiles." },
            { text: "Change the password", isCorrect: false, reason: "While better, your old data is still sitting on their servers.", lesson: "Deletion is the only way to ensure data isn't leaked later." },
            { text: "Remove your profile pic", isCorrect: false, reason: "Your personal info and messages remain even without a photo.", lesson: "A 'blank' profile is still a data goldmine for hackers." }
        ]
    },
    { 
        type: "PRIVACY", title: "Two-Factor (2FA) Choice", difficulty: "Hard", icon: "🛡️",
        desc: "Which 2FA method is generally more secure against SIM swapping?",
        options: [
            { text: "SMS Codes", isCorrect: false, reason: "SMS can be intercepted via SIM swap. It's better than nothing, but not the best.", lesson: "Use Authenticator Apps or Security Keys for high-value accounts." },
            { text: "Authenticator App", isCorrect: true, reason: "You chose the more robust security layer.", lesson: "Authenticator apps are tied to the device, not the SIM card." },
            { text: "Email codes", isCorrect: false, reason: "If your email is hacked, your 2FA is also compromised.", lesson: "Avoid using the same channel for primary and secondary login." },
            { text: "Security questions", isCorrect: false, reason: "Answers are often easy to find via social engineering.", lesson: "Questions are the least secure form of 2FA." }
        ]
    },
    { 
        type: "PRIVACY", title: "Sharing Boarding Passes", difficulty: "Easy", icon: "✈️",
        desc: "You're excited for your trip! Is it okay to post a photo of your boarding pass on Instagram?",
        options: [
            { text: "Post it! (Hide name)", isCorrect: false, reason: "The barcode contains your full name, flight info, and frequent flyer data.", lesson: "Never post barcodes or QR codes from tickets online." },
            { text: "Wait until after trip", isCorrect: true, reason: "You protected your travel and personal data.", lesson: "Scammers can use ticket info to cancel your flights or steal miles." },
            { text: "Post with barcode blurred", isCorrect: false, reason: "Sometimes blur filters can be reversed or enough data remains.", lesson: "It's safer to just share a photo of the destination." },
            { text: "Share in a private group", isCorrect: false, reason: "Private groups aren't always private; members can screenshot and share.", lesson: "Limit sharing of sensitive documents anywhere online." }
        ]
    },
    { 
        type: "PRIVACY", title: "Cookie Consent", difficulty: "Medium", icon: "🍪",
        desc: "A website shows a giant 'Accept All Cookies' button and a tiny 'Manage Preferences' link.",
        options: [
            { text: "Accept All", isCorrect: false, reason: "This allows tracking cookies that follow you across the web to build a profile.", lesson: "Take 10 seconds to 'Reject All' non-essential cookies." },
            { text: "Reject non-essentials", isCorrect: true, reason: "You limited third-party tracking.", lesson: "Cookies are the primary way advertisers track your browsing habits." },
            { text: "Ignore the banner", isCorrect: false, reason: "Many sites assume consent if you continue scrolling.", lesson: "Be proactive about your cookie choices." },
            { text: "Clear cookies later", isCorrect: false, reason: "Tracking can happen instantly; clearing later doesn't undo the profile built.", lesson: "Prevention is better than cleanup." }
        ]
    },

    // --- INTERN (10 Questions) ---
    { 
        type: "INTERN", title: "The Dream Job Offer", difficulty: "Medium", icon: "💼",
        desc: "WhatsApp: 'Work from home! Earn ₹5000/day liking videos. Pay ₹500 for registration.'", 
        options: [
            { text: "Pay registration fee", isCorrect: false, reason: "Legit jobs never ask you to pay to join.", lesson: "Never pay money to get a job." },
            { text: "Block and report", isCorrect: true, reason: "Excellent! You spotted the 'Easy Money' trap.", lesson: "Verify companies on official websites." },
            { text: "Ask for a sample task", isCorrect: false, reason: "They will give a fake task to make the scam seem more real.", lesson: "Process doesn't matter if the initial premise is a scam." },
            { text: "Share with your classmates", isCorrect: false, reason: "You are putting your friends at financial risk.", lesson: "Warn others about the scam type, not the specific link." }
        ] 
    },
    { 
        type: "INTERN", title: "Unpaid 'Training'", difficulty: "Easy", icon: "🎓",
        desc: "An internship asks you to work for 3 months for free, then pay ₹2000 for a 'certificate' at the end.",
        options: [
            { text: "Accept for experience", isCorrect: false, reason: "This is a 'Certificate Mill'. Real internships don't sell certificates.", lesson: "Value your time. Certificates you buy have zero value to recruiters." },
            { text: "Look for paid roles", isCorrect: true, reason: "You avoided exploitation.", lesson: "A real internship should teach you skills, not sell you paper." },
            { text: "Negotiate the certificate fee", isCorrect: false, reason: "The entire business model is based on selling useless paper.", lesson: "Don't engage with 'pay-for-paper' schemes." },
            { text: "Do it but don't pay", isCorrect: false, reason: "You are still giving away your labor for free to a dishonest entity.", lesson: "Your time is valuable; spend it at reputable organizations." }
        ]
    },
    { 
        type: "INTERN", title: "Task-Based Scam", difficulty: "Medium", icon: "📈",
        desc: "You're hired to 'boost ratings'. You're told to buy products with your own money, and they'll 'refund + 20% commission'.",
        options: [
            { text: "Complete first task", isCorrect: false, reason: "They might refund the first small one, but will vanish on the large ones.", lesson: "This is a 'Task Scam'. Never use your own money for work 'tasks'." },
            { text: "Quit and block", isCorrect: true, reason: "You recognized the 'Prepayment' trap.", lesson: "If a job requires you to 'spend to earn', it's a scam." },
            { text: "Try with a very small amount", isCorrect: false, reason: "Scammers use small initial 'wins' to build trust for a big theft.", lesson: "Don't 'test' a scam; just walk away." },
            { text: "Ask for an advance", isCorrect: false, reason: "They will use this as an excuse to ask for 'bank verification fees'.", lesson: "Real jobs have standard payroll cycles." }
        ]
    },
    { 
        type: "INTERN", title: "Data Entry Deposit", difficulty: "Easy", icon: "⌨️",
        desc: "A data entry job asks for a ₹1000 'Security Deposit' for the software they'll send you.",
        options: [
            { text: "Pay for the software", isCorrect: false, reason: "Companies provide tools for free. Deposits are scams.", lesson: "No legitimate employer asks for a 'software deposit'." },
            { text: "Decline the offer", isCorrect: true, reason: "You protected your wallet from a common entry-level scam.", lesson: "Software for work is always provided by the employer." },
            { text: "Ask for a monthly deduction", isCorrect: false, reason: "They want the money upfront; they won't agree to deductions.", lesson: "The 'deposit' is the scam; there is no real job." },
            { text: "Use your own software", isCorrect: false, reason: "They will claim their 'special' software is mandatory for tracking.", lesson: "Scammers use 'special tools' as a pretext for fees." }
        ]
    },
    { 
        type: "INTERN", title: "Interview via Chat", difficulty: "Medium", icon: "💬",
        desc: "You are 'hired' for a $30/hr job after just a 5-minute chat on Telegram with no video call.",
        options: [
            { text: "Share bank info for pay", isCorrect: false, reason: "Real hiring involves video/in-person interviews and formal contracts.", lesson: "Telegram-only hiring for high pay is a massive red flag." },
            { text: "Ask for video interview", isCorrect: true, reason: "You insisted on professional standards.", lesson: "Scammers hide behind text to avoid being identified." },
            { text: "Start working immediately", isCorrect: false, reason: "You'll be working for free, and they'll use your work to scam others.", lesson: "Formalize employment before starting any tasks." },
            { text: "Send a copy of your ID", isCorrect: false, reason: "This is for identity theft, not for a real job.", lesson: "Only share ID docs after a verified hiring process." }
        ]
    },
    { 
        type: "INTERN", title: "The 'Official' Email", difficulty: "Hard", icon: "📧",
        desc: "You get a job offer from 'careers-google@gmail.com' with a very professional PDF attachment.",
        options: [
            { text: "Open the PDF", isCorrect: false, reason: "Big companies use their own domains (e.g., @google.com), never @gmail.com.", lesson: "Always check the domain of a 'corporate' sender." },
            { text: "Check sender domain", isCorrect: true, reason: "You noticed the unprofessional email address.", lesson: "Recruiters from major firms never use free public email services." },
            { text: "Reply with your resume", isCorrect: false, reason: "You are giving personal data to a scammer.", lesson: "Don't interact with obviously fake professional emails." },
            { text: "Forward to a friend for advice", isCorrect: false, reason: "The PDF could contain malware that infects your friend's computer.", lesson: "Don't spread suspicious files." }
        ]
    },
    { 
        type: "INTERN", title: "Personal Info Request", difficulty: "Medium", icon: "📝",
        desc: "Before the first interview, a 'recruiter' asks for a photo of your Passport and Bank Statement for 'verification'.",
        options: [
            { text: "Send the documents", isCorrect: false, reason: "This is identity theft. Verification happens AFTER a formal offer.", lesson: "Never share sensitive ID docs before meeting the team." },
            { text: "Refuse until hired", isCorrect: true, reason: "You protected your identity.", lesson: "Sensitive data is only for onboarding, not for 'applying'." },
            { text: "Send with blurred numbers", isCorrect: false, reason: "Even partial data can be used for sophisticated identity fraud.", lesson: "Keep your documents safe until the final stage of a real process." },
            { text: "Ask why they need it now", isCorrect: false, reason: "They will give a professional-sounding fake reason about 'company policy'.", lesson: "Trust your knowledge of standard hiring practices over their excuses." }
        ]
    },
    { 
        type: "INTERN", title: "The 'Overpayment' Trick", difficulty: "Hard", icon: "💸",
        desc: "Your new remote boss sends you a check for $2000 for 'home office gear', then says they sent too much and to 'return $500' via UPI.",
        options: [
            { text: "Return the $500", isCorrect: false, reason: "The original check is fake and will bounce in 3 days. Your $500 is real and gone.", lesson: "This is the 'Fake Check' scam. Never 'return' money from a check you just got." },
            { text: "Wait for check to clear", isCorrect: true, reason: "You avoided a costly financial trap.", lesson: "Banks make funds 'available' before the check actually 'clears'." },
            { text: "Spend the $2000", isCorrect: false, reason: "The money isn't real. You'll owe the bank the full $2000 when the check bounces.", lesson: "Never spend money from a suspicious source." },
            { text: "Donate the $500 to charity", isCorrect: false, reason: "You are still losing $500 of your own real money.", lesson: "The 'overpayment' is the core of the scam." }
        ]
    },
    { 
        type: "INTERN", title: "MLM 'Internship'", difficulty: "Easy", icon: "🕸️",
        desc: "The 'internship' turns out to be selling health supplements to your friends and recruiting others to do the same.",
        options: [
            { text: "Start selling", isCorrect: false, reason: "This is a Multi-Level Marketing (MLM) scheme, not a professional internship.", lesson: "Internships should teach industry skills, not sales-recruitment loops." },
            { text: "Leave immediately", isCorrect: true, reason: "You recognized a pyramid-style scheme.", lesson: "If the 'job' is just recruiting others, it's not a job." },
            { text: "Buy a starter kit", isCorrect: false, reason: "The company makes money from interns buying products, not from selling to customers.", lesson: "Avoid 'pay-to-work' recruitment models." },
            { text: "Recruit your family", isCorrect: false, reason: "You are putting your family's finances and relationships at risk.", lesson: "Don't mix professional growth with predatory recruitment." }
        ]
    },
    { 
        type: "INTERN", title: "The 'Secret' Project", difficulty: "Medium", icon: "🕵️",
        desc: "A startup asks you to build a 'clone of Amazon' for free as a 'test' before they decide to hire you.",
        options: [
            { text: "Build the whole clone", isCorrect: false, reason: "This is 'Spec Work'. They are using you for free labor without intent to hire.", lesson: "A hiring test should be small (2-4 hours), not a full project." },
            { text: "Offer a small demo", isCorrect: true, reason: "You set professional boundaries.", lesson: "Don't provide full commercial value for 'free' under the guise of an interview." },
            { text: "Ask for payment for the test", isCorrect: false, reason: "Scammers won't pay for tests; they just want the free work.", lesson: "Professional firms might pay for long tests, but startups asking for clones rarely do." },
            { text: "Sign an NDA first", isCorrect: false, reason: "An NDA doesn't protect your labor from being stolen for free.", lesson: "Protect your time and skills first." }
        ]
    },

    // --- MALWARE (10 Questions) ---
    { 
        type: "MALWARE", title: "The Free Movie Link", difficulty: "Medium", icon: "🦠",
        desc: "Site: 'Watch latest movies free! Download our special player to start streaming.'", 
        options: [
            { text: "Download player", isCorrect: false, reason: "Special 'players' are often Trojans.", lesson: "Use official streaming services." },
            { text: "Leave website", isCorrect: true, reason: "Safe choice! You avoided a drive-by download.", lesson: "Keep browser updated." },
            { text: "Try on a different browser", isCorrect: false, reason: "The file is the threat, regardless of the browser used to download it.", lesson: "Don't seek out dangerous files." },
            { text: "Install in a virtual machine", isCorrect: false, reason: "Unless you are a security pro, malware can still leak or steal data.", lesson: "Prevention is safer than containment." }
        ] 
    },
    { 
        type: "MALWARE", title: "Software 'Cracks'", difficulty: "Hard", icon: "🔑",
        desc: "You want Photoshop for free. A YouTube video has a link to a 'crack.exe' that says 'Disable Antivirus before running'.",
        options: [
            { text: "Disable and run", isCorrect: false, reason: "If it tells you to disable antivirus, it IS a virus. Cracks are the #1 way to get Ransomware.", lesson: "Never disable security software to run unknown files." },
            { text: "Use free alternatives", isCorrect: true, reason: "Smart! GIMP or Canva are safer than 'cracked' software.", lesson: "Pirated software is a delivery system for credential stealers." },
            { text: "Run in Sandbox mode", isCorrect: false, reason: "Advanced malware can detect and escape sandboxes.", lesson: "The safest way to use premium software is to buy it." },
            { text: "Ask a friend to test it", isCorrect: false, reason: "You are putting your friend's computer at risk.", lesson: "Don't spread potentially malicious tools." }
        ]
    },
    { 
        type: "MALWARE", title: "The USB Found", difficulty: "Easy", icon: "💾",
        desc: "You find a USB drive in the office parking lot labeled 'Salary_Details_2024'.",
        options: [
            { text: "Plug in to see", isCorrect: false, reason: "This is a 'Rubber Ducky' attack. It can type commands or steal files instantly.", lesson: "Never plug in unknown USB drives." },
            { text: "Give to IT Security", isCorrect: true, reason: "You followed proper protocol.", lesson: "Unknown hardware is a major security risk." },
            { text: "Wipe it before using", isCorrect: false, reason: "Just plugging it in to wipe it is enough to trigger an attack.", lesson: "The act of connection is the vulnerability." },
            { text: "Check it on an old laptop", isCorrect: false, reason: "The malware can still steal data or infect your network from an old device.", lesson: "Discard or report unknown hardware." }
        ]
    },
    { 
        type: "MALWARE", title: "Pop-up Warning", difficulty: "Easy", icon: "🚨",
        desc: "A website screams: 'YOUR COMPUTER IS INFECTED! CLICK HERE TO CLEAN NOW!' with a loud siren sound.",
        options: [
            { text: "Click to clean", isCorrect: false, reason: "This is 'Scareware'. Clicking will actually *install* the malware.", lesson: "Real antivirus software doesn't notify you through browser pop-ups." },
            { text: "Close the browser tab", isCorrect: true, reason: "You didn't fall for the fake panic.", lesson: "If a website claims your PC has a virus, it's lying." },
            { text: "Restart your computer", isCorrect: false, reason: "The pop-up is just a website; restarting is unnecessary but safe.", lesson: "Learn to distinguish browser alerts from system alerts." },
            { text: "Call the 'support' number", isCorrect: false, reason: "The number leads to a scam center that will charge you for 'fixing' nothing.", lesson: "Don't use contact info from browser pop-ups." }
        ]
    },
    { 
        type: "MALWARE", title: "The 'Update' Prompt", difficulty: "Medium", icon: "🔄",
        desc: "While reading news, a pop-up says: 'Your Chrome is out of date. Click to install the update.dmg/exe'.",
        options: [
            { text: "Install the update", isCorrect: false, reason: "Browsers update themselves or via system settings, never through random pop-ups.", lesson: "Only update software through its own official 'About' menu." },
            { text: "Check browser settings", isCorrect: true, reason: "You verified the update status safely.", lesson: "Fake updates are a common way to install 'Adware'." },
            { text: "Download but don't open", isCorrect: false, reason: "Having the file on your system is the first step for many attacks.", lesson: "Don't download files from untrusted sources." },
            { text: "Search for 'Chrome update' on Google", isCorrect: false, reason: "Ad-based results might lead you back to a fake update site.", lesson: "Use the built-in update mechanism of the browser itself." }
        ]
    },
    { 
        type: "MALWARE", title: "Macro Warning", difficulty: "Hard", icon: "📈",
        desc: "You open an Excel file from an email. It says 'Enable Macros to view content'.",
        options: [
            { text: "Enable Macros", isCorrect: false, reason: "Macros are scripts. Enabling them lets the file download and run viruses in the background.", lesson: "Never enable macros in files from outside your organization." },
            { text: "Keep them disabled", isCorrect: true, reason: "You prevented a script-based infection.", lesson: "Macros are a legacy feature often abused by hackers." },
            { text: "Enable 'just once'", isCorrect: false, reason: "Once is all it takes to infect your entire system.", lesson: "One-time access is full access for a script." },
            { text: "Open in Google Sheets", isCorrect: false, reason: "While safer, some scripts might still be designed to phish you.", lesson: "Treat suspicious files with caution, even in cloud viewers." }
        ]
    },
    { 
        type: "MALWARE", title: "Mobile 'Battery Booster'", difficulty: "Easy", icon: "🔋",
        desc: "An app on the Play Store promises to 'Double your battery life' but asks for 'Accessibility Services' permission.",
        options: [
            { text: "Grant permission", isCorrect: false, reason: "Accessibility permission lets an app 'read' everything on your screen and click buttons.", lesson: "Accessibility is the most dangerous Android permission. Be extremely careful." },
            { text: "Find a better app", isCorrect: true, reason: "You avoided a potential 'Keylogger'.", lesson: "Apps cannot 'boost' battery via software magic." },
            { text: "Grant only for 5 minutes", isCorrect: false, reason: "Malware can steal your entire contact list and messages in seconds.", lesson: "Time-limited access is still full access." },
            { text: "Grant but use a VPN", isCorrect: false, reason: "A VPN doesn't stop an app from reading your screen locally.", lesson: "Permissions control local access; VPNs control network access." }
        ]
    },
    { 
        type: "MALWARE", title: "PDF or EXE?", difficulty: "Hard", icon: "📑",
        desc: "A file is named 'invoice.pdf.exe'. Your computer shows a PDF icon for it.",
        options: [
            { text: "Open the file", isCorrect: false, reason: "The real extension is .exe (an executable). It's a virus disguised as a PDF.", lesson: "Enable 'Show file extensions' in your OS to see the true type." },
            { text: "Delete immediately", isCorrect: true, reason: "You spotted the double extension trick.", lesson: "Hackers hide .exe behind .pdf or .jpg names." },
            { text: "Right-click and 'Scan'", isCorrect: false, reason: "Antivirus might miss brand-new malware (Zero-day).", lesson: "Common sense is your first line of defense." },
            { text: "Rename it to .pdf", isCorrect: false, reason: "Renaming doesn't change what the file actually *is* or does.", lesson: "A virus by any other name is still a virus." }
        ]
    },
    { 
        type: "MALWARE", title: "The 'Free' VPN", difficulty: "Medium", icon: "🛡️",
        desc: "A free VPN app has no website and 100% positive 5-star reviews that all look the same.",
        options: [
            { text: "Use for security", isCorrect: false, reason: "If the product is free, YOU are the product. They likely sell your data or inject ads.", lesson: "Use reputable, paid VPNs for actual security." },
            { text: "Research the company", isCorrect: true, reason: "You looked for transparency.", lesson: "Fake VPNs are often used for Man-in-the-Middle attacks." },
            { text: "Use for Netflix only", isCorrect: false, reason: "It can still steal your Netflix login and other browser data.", lesson: "Don't use untrusted security tools for *any* purpose." },
            { text: "Install but keep it off", isCorrect: false, reason: "The app itself could contain malware that runs in the background.", lesson: "Uninstalled is the only safe state for suspicious software." }
        ]
    },
    { 
        type: "MALWARE", title: "Social Media 'Video'", difficulty: "Easy", icon: "🎥",
        desc: "A friend sends a link on Messenger: 'Is this you in this video? 😂' followed by a link to a 'Video Player' login page.",
        options: [
            { text: "Log in to see video", isCorrect: false, reason: "This steals your login and then sends the same message to all your friends.", lesson: "Never log into a 'player' to see a video a friend 'sent' randomly." },
            { text: "Ask friend if they sent it", isCorrect: true, reason: "You suspected a compromised account.", lesson: "Viral Messenger scams are a primary way accounts are stolen." },
            { text: "Watch without logging in", isCorrect: false, reason: "The page will likely force a 'plugin download' which is actually malware.", lesson: "Avoid clicking suspicious links even if you don't plan to log in." },
            { text: "Click the link to see site", isCorrect: false, reason: "Just visiting the site can expose you to drive-by download attacks.", lesson: "Don't satisfy your curiosity at the cost of your security." }
        ]
    },

    // --- WIFI (10 Questions) ---
    { 
        type: "WIFI", title: "The Free Airport WiFi", difficulty: "Easy", icon: "🌐",
        desc: "Two networks: 'Airport_Official' (locked) and 'FREE_AIRPORT_WIFI' (open).", 
        options: [
            { text: "Join the FREE network", isCorrect: false, reason: "Open WiFis can be 'Evil Twins'.", lesson: "Avoid 'Open' networks for banking." },
            { text: "Use mobile data", isCorrect: true, reason: "Smart! Mobile data is much more secure.", lesson: "Public WiFi is okay for news, not passwords." },
            { text: "Join but use a VPN", isCorrect: false, reason: "While safer, some attacks can happen before the VPN connects.", lesson: "Prefer trusted networks over 'fixed' untrusted ones." },
            { text: "Ask staff for password", isCorrect: false, reason: "Staff might give you the same insecure open network info.", lesson: "Know the difference between open and encrypted (WPA2/3) networks." }
        ] 
    },
    { 
        type: "WIFI", title: "The Hotel Login", difficulty: "Medium", icon: "🏨",
        desc: "You connect to hotel WiFi. A page asks for your Room Number and Last Name, then says 'Install security certificate to continue'.",
        options: [
            { text: "Install certificate", isCorrect: false, reason: "A certificate lets the WiFi owner 'decrypt' your encrypted traffic (HTTPS).", lesson: "NEVER install 'certificates' to use public WiFi." },
            { text: "Disconnect immediately", isCorrect: true, reason: "You spotted a Man-in-the-Middle setup.", lesson: "Certificates are the key to your digital privacy. Don't hand them out." },
            { text: "Install but delete later", isCorrect: false, reason: "The damage (data theft) happens while the certificate is active.", lesson: "Cleanup doesn't fix a security breach." },
            { text: "Try on your laptop instead", isCorrect: false, reason: "The risk is the same regardless of the device used.", lesson: "Security principles apply across all hardware." }
        ]
    },
    { 
        type: "WIFI", title: "Auto-Connect Feature", difficulty: "Easy", icon: "🔄",
        desc: "Should you keep 'Auto-connect to open networks' enabled on your phone?",
        options: [
            { text: "Yes, it's convenient", isCorrect: false, reason: "Your phone might connect to a hacker's hotspot without you knowing.", lesson: "Turn off 'Auto-connect' to stay in control of your data." },
            { text: "Turn it off", isCorrect: true, reason: "You prevented passive tracking and attacks.", lesson: "Manual connection is the safest connection." },
            { text: "Enable only for home", isCorrect: false, reason: "A hacker can name their network 'Home_WiFi' to trick your phone.", lesson: "Auto-connect relies on names, which are easily spoofed." },
            { text: "Keep on but use a firewall", isCorrect: false, reason: "Firewalls don't stop the initial connection and data leak.", lesson: "Control the connection, not just the traffic." }
        ]
    },
    { 
        type: "WIFI", title: "The 'Admin' Login", difficulty: "Hard", icon: "⚙️",
        desc: "You're at home. Your router's settings page (192.168.1.1) is still using the default 'admin / admin' password.",
        options: [
            { text: "Leave it, it's inside", isCorrect: false, reason: "Malware on any device in your house can now change your router's DNS to steal data.", lesson: "Always change the default ADMIN password of your router." },
            { text: "Change to strong pass", isCorrect: true, reason: "You hardened your home network foundation.", lesson: "Default passwords are found in seconds by any attacker." },
            { text: "Hide the WiFi name (SSID)", isCorrect: false, reason: "Hiding SSID doesn't protect the admin panel password.", lesson: "Security through obscurity is not real security." },
            { text: "Only allow known devices", isCorrect: false, reason: "MAC addresses (device IDs) can be spoofed by attackers.", lesson: "Strong passwords are better than device filters." }
        ]
    },
    { 
        type: "WIFI", title: "Sharing Your Hotspot", difficulty: "Medium", icon: "📶",
        desc: "You share your mobile hotspot with a stranger. Should you set a password?",
        options: [
            { text: "No, it's just for a minute", isCorrect: false, reason: "They could access your shared files or use your data for illegal acts linked to you.", lesson: "Always use WPA2/WPA3 encryption and a strong password for hotspots." },
            { text: "Set a strong password", isCorrect: true, reason: "You protected your data and reputation.", lesson: "An open hotspot is an open door to your device." },
            { text: "Set a simple '1234' password", isCorrect: false, reason: "Simple passwords are easily guessed or cracked.", lesson: "Treat your hotspot security like your home WiFi." },
            { text: "Turn off your mobile data", isCorrect: false, reason: "If you are sharing, you need data on; the question is about security.", lesson: "Balance utility with safety." }
        ]
    },
    { 
        type: "WIFI", title: "Network Name (SSID)", difficulty: "Easy", icon: "🏷️",
        desc: "Is it a good idea to name your home WiFi 'The_Sharma_Family_Apt_402'?",
        options: [
            { text: "Yes, easy to find", isCorrect: false, reason: "It tells hackers exactly which apartment to target and who lives there.", lesson: "Use a neutral name that doesn't identify you or your location." },
            { text: "Use a neutral name", isCorrect: true, reason: "You maintained personal privacy.", lesson: "Obscurity is a small but helpful layer of security." },
            { text: "Name it 'FBI_Surveillance'", isCorrect: false, reason: "Cliche names don't provide real security and attract attention.", lesson: "Professional, boring names are the most secure." },
            { text: "Name it after your router model", isCorrect: false, reason: "Telling hackers your router model helps them find specific exploits.", lesson: "Don't reveal your hardware details in your network name." }
        ]
    },
    { 
        type: "WIFI", title: "Firmware Updates", difficulty: "Medium", icon: "🛠️",
        desc: "How often should you update your home router's firmware?",
        options: [
            { text: "Never, if it works", isCorrect: false, reason: "Routers have security holes that hackers use to take over entire networks.", lesson: "Check for updates every few months or enable 'Auto-update'." },
            { text: "Enable Auto-update", isCorrect: true, reason: "You kept your gateway to the internet patched.", lesson: "An unpatched router is a hacker's favorite target." },
            { text: "Update only if internet is slow", isCorrect: false, reason: "Security updates aren't always about speed.", lesson: "Patch for protection, not just performance." },
            { text: "Buy a new router every year", isCorrect: false, reason: "Expensive and unnecessary if you keep your current one updated.", lesson: "Maintenance is better than constant replacement." }
        ]
    },
    { 
        type: "WIFI", title: "WPS Button", difficulty: "Hard", icon: "🔘",
        desc: "What is the security risk of having 'WPS' (Wi-Fi Protected Setup) enabled?",
        options: [
            { text: "None, it's a feature", isCorrect: false, reason: "WPS PINs can be guessed by hackers in hours, giving them your full WiFi password.", lesson: "Disable WPS in your router settings for better security." },
            { text: "Disable WPS", isCorrect: true, reason: "You closed a well-known security loophole.", lesson: "Convenience features often come at the cost of security." },
            { text: "Use it only for guests", isCorrect: false, reason: "If it's on, it's vulnerable to everyone in range.", lesson: "Vulnerabilities don't discriminate between users." },
            { text: "Change the WPS PIN often", isCorrect: false, reason: "The system itself is flawed; changing the PIN only delays the attack.", lesson: "Disable broken protocols entirely." }
        ]
    },
    { 
        type: "WIFI", title: "The 'Coffee Shop' VPN", difficulty: "Medium", icon: "☕",
        desc: "You're working from a cafe. You use a VPN. Are you 100% safe from everything?",
        options: [
            { text: "Yes, I'm encrypted", isCorrect: false, reason: "A VPN only hides traffic. You can still be phished or download malware.", lesson: "A VPN is a tool, not a complete security solution. Stay alert." },
            { text: "Still be careful", isCorrect: true, reason: "You understand that security has many layers.", lesson: "Encryption doesn't stop you from clicking bad links." },
            { text: "Yes, hackers can't see me", isCorrect: false, reason: "Hackers can still see your device on the local network.", lesson: "Network visibility is different from traffic encryption." },
            { text: "Only use it for banking", isCorrect: false, reason: "You should use it for all traffic on public WiFi.", lesson: "Consistency is key to digital safety." }
        ]
    },
    { 
        type: "WIFI", title: "Network Segmentation", difficulty: "Hard", icon: "🧱",
        desc: "You have many smart bulbs and cameras. Should they be on the same WiFi as your laptop?",
        options: [
            { text: "Yes, easier to manage", isCorrect: false, reason: "Smart devices are often insecure. If a bulb is hacked, they can reach your laptop.", lesson: "Use a 'Guest Network' for smart home (IoT) devices." },
            { text: "Use a Guest Network", isCorrect: true, reason: "You isolated your most important devices.", lesson: "Segmentation prevents a small breach from becoming a total disaster." },
            { text: "Use a strong password for bulbs", isCorrect: false, reason: "The bulb's software itself might have unpatchable holes.", lesson: "Hardware flaws can't always be fixed with passwords." },
            { text: "Turn off bulbs when sleeping", isCorrect: false, reason: "Malware doesn't sleep; it works 24/7 once inside.", lesson: "Security is a continuous requirement." }
        ]
    },

    // --- IDENTITY (10 Questions) ---
    { 
        type: "IDENTITY", title: "The KYC Update Call", difficulty: "Hard", icon: "🆔",
        desc: "Call: 'I am from Telecom Dept. Your SIM will expire. Share the 6-digit code to verify.'", 
        options: [
            { text: "Share the code", isCorrect: false, reason: "That code was an OTP for your bank. Never share codes over a call.", lesson: "Authorities never ask for OTPs over phone." },
            { text: "Hang up and call support", isCorrect: true, reason: "You blocked a SIM-swapping attempt!", lesson: "Caller ID can be spoofed." },
            { text: "Give a fake code", isCorrect: false, reason: "Engaging with scammers can lead to more aggressive tactics.", lesson: "End the interaction immediately without engaging." },
            { text: "Ask for their supervisor", isCorrect: false, reason: "They will just pass the phone to another scammer.", lesson: "The whole 'department' is a scam center." }
        ] 
    },
    { 
        type: "IDENTITY", title: "Social Security Post", difficulty: "Easy", icon: "📄",
        desc: "You're filling out a form and want to ask a question. Is it okay to post a photo of the form (with your SSN/Aadhaar) on a help forum?",
        options: [
            { text: "Yes, if I need help", isCorrect: false, reason: "Identity thieves scan forums for exactly these types of photos.", lesson: "Never post ID numbers, even for 'help'. Blur them out completely." },
            { text: "Blur all sensitive info", isCorrect: true, reason: "You protected your core identity markers.", lesson: "Your ID number is the 'Master Key' to your financial life." },
            { text: "Post in a 'Private' forum", isCorrect: false, reason: "Admins and other users can still see and steal your data.", lesson: "Once it's online, you lose control over who sees it." },
            { text: "Delete it after 5 minutes", isCorrect: false, reason: "Bots can scrape and save images in milliseconds.", lesson: "The internet never forgets." }
        ]
    },
    { 
        type: "IDENTITY", title: "The 'Official' Survey", difficulty: "Medium", icon: "📋",
        desc: "A 'Census' worker calls and asks for your full name, date of birth, and mother's maiden name.",
        options: [
            { text: "Provide the info", isCorrect: false, reason: "Name + DOB + Mother's Maiden Name = Enough to reset most of your passwords.", lesson: "Be extremely stingy with personal history data." },
            { text: "Verify their credentials", isCorrect: true, reason: "You recognized 'Social Engineering'.", lesson: "Real officials will provide ways to verify their identity via official portals." },
            { text: "Ask for a call-back number", isCorrect: false, reason: "They will give you a fake number that they control.", lesson: "Verify independently, not through provided info." },
            { text: "Give slightly wrong dates", isCorrect: false, reason: "Even partial data helps scammers build a profile of you.", lesson: "Refusal is better than misdirection." }
        ]
    },
    { 
        type: "IDENTITY", title: "Physical Mail", difficulty: "Easy", icon: "📬",
        desc: "You're throwing away old bank statements and credit card offers. Should you just put them in the bin?",
        options: [
            { text: "Yes, it's just trash", isCorrect: false, reason: "Scammers 'dumpster dive' to find account numbers and pre-approved offers to steal your identity.", lesson: "Always SHRED documents containing personal or financial info." },
            { text: "Shred them first", isCorrect: true, reason: "You prevented physical identity theft.", lesson: "Identity theft isn't just digital; it's physical too." },
            { text: "Tear them into 4 pieces", isCorrect: false, reason: "Torn pieces can be easily taped back together.", lesson: "Use a cross-cut shredder for real security." },
            { text: "Hide them under food waste", isCorrect: false, reason: "Determined thieves aren't bothered by a bit of mess.", lesson: "Don't rely on 'hiding' your data." }
        ]
    },
    { 
        type: "IDENTITY", title: "Medical ID Theft", difficulty: "Medium", icon: "🏥",
        desc: "Someone asks to 'borrow' your health insurance card to get a checkup since they don't have one.",
        options: [
            { text: "Sure, help a friend", isCorrect: false, reason: "Their medical history will now be mixed with yours, which can be life-threatening in an emergency.", lesson: "Never share insurance or medical IDs. It's fraud and dangerous." },
            { text: "Decline firmly", isCorrect: true, reason: "You protected your medical record integrity.", lesson: "Medical identity theft is one of the hardest types to fix." },
            { text: "Ask for their ID in return", isCorrect: false, reason: "This doesn't fix the fraud or the medical record corruption.", lesson: "Helping with fraud makes you a participant." },
            { text: "Only for a non-urgent visit", isCorrect: false, reason: "Any visit will corrupt your permanent medical history.", lesson: "Data integrity is absolute." }
        ]
    },
    { 
        type: "IDENTITY", title: "Deepfake Video Call", difficulty: "Hard", icon: "👤",
        desc: "Your 'boss' appears on a video call (looks a bit glitchy) and asks you to urgently wire money for a 'secret merger'.",
        options: [
            { text: "Follow instructions", isCorrect: false, reason: "This is a 'Deepfake' AI attack. AI can now mimic voices and faces in real-time.", lesson: "For unusual financial requests, use a second 'out-of-band' way to verify (like a text or a known phone number)." },
            { text: "Verify via another way", isCorrect: true, reason: "You didn't trust the 'glitchy' video.", lesson: "AI is making impersonation much more convincing." },
            { text: "Ask a 'secret' question", isCorrect: false, reason: "AI can sometimes find answers to common 'secrets' from your social media.", lesson: "Use verification methods that AI can't easily bypass." },
            { text: "Record the call", isCorrect: false, reason: "Recording is good for evidence but doesn't stop the immediate theft.", lesson: "Verify before you act, not after." }
        ]
    },
    { 
        type: "IDENTITY", title: "Passport Photo", difficulty: "Medium", icon: "🛂",
        desc: "You need a copy of your passport for a hotel. Should you give them the physical passport to take to the back room?",
        options: [
            { text: "Yes, they need it", isCorrect: false, reason: "They could take photos of every page and sell your data. Always keep your ID in sight.", lesson: "Provide a pre-made photocopy or stay with the ID while it's scanned." },
            { text: "Stay with it", isCorrect: true, reason: "You maintained control of your document.", lesson: "Don't let your primary ID leave your sight in unverified places." },
            { text: "Give a scan on your phone", isCorrect: false, reason: "Handing over your unlocked phone is a huge security risk.", lesson: "Keep your devices and documents separate." },
            { text: "Email them a copy", isCorrect: false, reason: "Emailing sensitive docs is insecure and leaves a permanent copy on their servers.", lesson: "Physical copies are sometimes easier to manage and destroy." }
        ]
    },
    { 
        type: "IDENTITY", title: "Security Questions", difficulty: "Hard", icon: "❓",
        desc: "When setting up security questions, should you use the actual name of your first school?",
        options: [
            { text: "Yes, it's easy to remember", isCorrect: false, reason: "Hackers can find your school name on LinkedIn or Facebook in seconds.", lesson: "Use 'fake' answers for security questions (e.g., Q: School? A: BlueElephant123)." },
            { text: "Use a 'fake' answer", isCorrect: true, reason: "You made your account recovery impossible to guess.", lesson: "Security questions are the weakest link if you use real facts." },
            { text: "Use a complex real answer", isCorrect: false, reason: "If it's a fact, it's discoverable with enough effort.", lesson: "Prefer non-factual 'secrets' for recovery questions." },
            { text: "Skip security questions", isCorrect: false, reason: "Some sites require them; if you must use them, make them secure.", lesson: "Use a password manager to store your 'fake' answers." }
        ]
    },
    { 
        type: "IDENTITY", title: "Credit Report Check", difficulty: "Medium", icon: "📊",
        desc: "How often should you check your credit report for unauthorized accounts?",
        options: [
            { text: "Only when I need a loan", isCorrect: false, reason: "An identity thief could be using your name for months before you notice.", lesson: "Check your credit report at least once a year (it's free!)." },
            { text: "Check once a year", isCorrect: true, reason: "You are monitoring your financial identity proactively.", lesson: "Early detection is key to stopping identity theft." },
            { text: "Check every week", isCorrect: false, reason: "Unnecessary and might lead to 'check fatigue' where you stop looking carefully.", lesson: "Consistency is better than excessive frequency." },
            { text: "Pay for a 'Protection' service", isCorrect: false, reason: "Many services just do what you can do for free yourself.", lesson: "Be your own first line of defense." }
        ]
    },
    { 
        type: "IDENTITY", title: "The 'Grandchild' Scam", difficulty: "Easy", icon: "👵",
        desc: "An elderly person gets a call: 'Grandma? It's me. I'm in jail in Mexico and need bail money. Don't tell my parents!'",
        options: [
            { text: "Send money to help", isCorrect: false, reason: "This exploits family emotions. They use social media to find names of relatives.", lesson: "Hang up and call the grandchild's parents or their actual phone number." },
            { text: "Call parents first", isCorrect: true, reason: "You verified the story before acting.", lesson: "Scammers love to use 'Urgency + Secrecy' to stop you from thinking." },
            { text: "Ask for their middle name", isCorrect: false, reason: "Middle names are often public record or found in data leaks.", lesson: "Trivia isn't verification." },
            { text: "Send a small amount first", isCorrect: false, reason: "Any money sent is gone, and it marks you as a 'successful target'.", lesson: "Don't 'test' a suspicious request with money." }
        ]
    },

    // --- AI SECURITY (10 Questions) ---
    { 
        type: "AI_SECURITY", title: "The Voice Clone", difficulty: "Medium", icon: "🎙️",
        desc: "You get a call from your 'brother' using his exact voice, asking for an immediate bank transfer for an emergency. The background noise sounds like a hospital.",
        options: [
            { text: "Transfer the money", isCorrect: false, reason: "AI can clone any voice from a 3-second clip. The background noise is also AI-generated for emotional pressure.", lesson: "Always hang up and call the person back on their known number." },
            { text: "Hang up and call him back", isCorrect: true, reason: "Smart! You bypassed the 'Direct Audio' link to verify the identity.", lesson: "Voice clones are the new frontier of social engineering." },
            { text: "Ask for his birthday", isCorrect: false, reason: "Scammers find personal info like birthdays from social media data leaks.", lesson: "Trivia is no longer a reliable verification method." },
            { text: "Ask for a photo proof", isCorrect: false, reason: "AI can generate realistic photos (Deepfakes) in seconds.", lesson: "Live, out-of-band communication is the only way to verify." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "Deepfake Interview", difficulty: "Hard", icon: "🎥",
        desc: "During a Zoom interview for a remote job, the interviewer's face occasionally glitches or looks 'too smooth'. They ask for your login credentials for 'onboarding'.",
        options: [
            { text: "Provide credentials", isCorrect: false, reason: "This is a real-time deepfake. Glitches are signs of AI processing. No real company asks for credentials via Zoom.", lesson: "Watch for unnatural blinking or skin texture in video calls." },
            { text: "Ask them to turn sideways", isCorrect: true, reason: "Genius! Many real-time deepfakes fail to render side profiles correctly.", lesson: "Physical movement challenges can often break AI video filters." },
            { text: "Ignore the glitches", isCorrect: false, reason: "Ignoring visual anomalies is how scammers slip through your defenses.", lesson: "If the video looks 'uncanny', it probably is." },
            { text: "Record the meeting", isCorrect: false, reason: "Recording is good for evidence, but it doesn't stop the immediate theft of your data.", lesson: "Stop the interaction if you suspect AI manipulation." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "The AI Phishing Email", difficulty: "Medium", icon: "🤖",
        desc: "You receive an email from your CEO that sounds exactly like her writing style, referencing a project you are actually working on, and asking for a sensitive file.",
        options: [
            { text: "Send the file", isCorrect: false, reason: "AI Large Language Models (LLMs) can mimic any writing style perfectly if given a few samples.", lesson: "Trust the process, not the tone. Verify sensitive requests via a different channel." },
            { text: "Verify via Slack/Phone", isCorrect: true, reason: "You used 'Out-of-Band' verification to defeat an AI-enhanced spear-phishing attack.", lesson: "AI makes phishing emails look 100% professional and error-free." },
            { text: "Reply to the email", isCorrect: false, reason: "Replying keeps you within the attacker's controlled environment.", lesson: "Never use the same channel to verify a suspicious request." },
            { text: "Check for typos", isCorrect: false, reason: "Old advice! AI-generated phishing emails have perfect grammar and zero typos.", lesson: "Look for suspicious intent, not spelling errors." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "The ChatGPT 'Leak'", difficulty: "Easy", icon: "💬",
        desc: "To save time, you want to use an AI chatbot to debug some proprietary company code containing sensitive API keys.",
        options: [
            { text: "Paste the full code", isCorrect: false, reason: "Anything you paste into public AI models becomes part of their training data and can be leaked.", lesson: "Never upload sensitive or proprietary data to public AI tools." },
            { text: "Anonymize code first", isCorrect: true, reason: "Correct. You removed the sensitive keys and data before using the tool.", lesson: "Treat AI chats like public forums. Assume everything is being recorded." },
            { text: "Use it late at night", isCorrect: false, reason: "The time of day doesn't affect how the AI stores or processes your data.", lesson: "Data persistence is 24/7." },
            { text: "Delete chat history later", isCorrect: false, reason: "Deleting history only hides it from your view; the data is already in the provider's servers.", lesson: "Prevention is the only way to protect secrets from AI." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "Generative AI Malware", difficulty: "Hard", icon: "🦠",
        desc: "You find a 'free' AI tool that promises to 'generate professional headshots'. It requires you to download an installer and disable your firewall.",
        options: [
            { text: "Install the tool", isCorrect: false, reason: "Attackers use AI-hype to trick people into installing 'Infostealers'.", lesson: "Never disable security software for a 'free' tool." },
            { text: "Use web-based tools only", isCorrect: true, reason: "Web tools (SaaS) are generally safer than local installers for unknown AI software.", lesson: "Avoid downloading 'AI' executables from untrusted sites." },
            { text: "Run as Administrator", isCorrect: false, reason: "This gives the malware full control over your entire operating system.", lesson: "Least privilege is the best policy." },
            { text: "Scan with one Antivirus", isCorrect: false, reason: "AI-obfuscated malware can often bypass traditional antivirus detection.", lesson: "Rely on behavioral warnings and common sense." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "The 'Smart' Home Hack", difficulty: "Medium", icon: "🏠",
        desc: "An AI-powered smart camera in your home starts moving on its own. You get a notification saying it's an 'Auto-AI Calibration'.",
        options: [
            { text: "Let it finish", isCorrect: false, reason: "Hackers use 'AI features' as a cover story for remote unauthorized access.", lesson: "Unrequested 'calibration' is a major red flag for IoT devices." },
            { text: "Unplug the camera", isCorrect: true, reason: "Physical disconnection is the ultimate security for compromised smart devices.", lesson: "If a device acts weird, cut its power/internet immediately." },
            { text: "Change your WiFi password", isCorrect: false, reason: "While good, it doesn't stop a hacker who is already inside the camera.", lesson: "Isolation first, then remediation." },
            { text: "Update the camera app", isCorrect: false, reason: "If the device is already hacked, an app update might be too late.", lesson: "Address the immediate physical threat first." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "Fake AI Support", difficulty: "Easy", icon: "🎧",
        desc: "A 'Microsoft AI Assistant' pop-up says your computer is slow and offers an 'AI Optimization' scan for $10.",
        options: [
            { text: "Pay for the scan", isCorrect: false, reason: "This is traditional scareware rebranded with 'AI' buzzwords.", lesson: "Real support doesn't pop up in your browser asking for money." },
            { text: "Close the tab", isCorrect: true, reason: "You recognized 'AI-Washing'—using the term AI to make a scam look modern.", lesson: "AI is a tool, not a magical solution for computer speed." },
            { text: "Download the scan tool", isCorrect: false, reason: "The tool is likely a Trojan that will lock your files (Ransomware).", lesson: "Trust only built-in system tools for optimization." },
            { text: "Call the 'AI Expert' number", isCorrect: false, reason: "The number leads to a scam call center using AI scripts to pressure you.", lesson: "Don't engage with unsolicited support." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "AI Image Verification", difficulty: "Hard", icon: "🖼️",
        desc: "A viral news photo shows a major politician doing something scandalous. The photo looks very detailed but the background text is gibberish.",
        options: [
            { text: "Share the news", isCorrect: false, reason: "Gibberish text, extra fingers, or distorted background patterns are hallmarks of AI-generated images.", lesson: "Verify viral images via trusted news agencies before sharing." },
            { text: "Check for 'AI Artifacts'", isCorrect: true, reason: "You noticed the telltale signs of generative AI failure.", lesson: "AI often struggles with text, hands, and logical symmetries." },
            { text: "Trust the high resolution", isCorrect: false, reason: "High resolution doesn't mean high truth. AI can generate 4K fakes.", lesson: "Visual quality is not a measure of authenticity." },
            { text: "Read the comments", isCorrect: false, reason: "Bots can flood comments to make a fake image look real.", lesson: "Popular opinion is not a fact-checking tool." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "The AI Dating Bot", difficulty: "Medium", icon: "💘",
        desc: "You're chatting with someone on a dating app who responds instantly with perfect, long-form poetry and deep emotional insights but refuses to video call.",
        options: [
            { text: "Send a gift", isCorrect: false, reason: "You are likely talking to a 'Love-Bot' powered by LLMs to harvest money.", lesson: "If they won't meet or call, assume they are a bot or a scammer." },
            { text: "Test with a logic puzzle", isCorrect: true, reason: "AI bots can often be tripped up by non-sequiturs or complex logic riddles.", lesson: "Authentic human interaction is messy and inconsistent; bots are too perfect." },
            { text: "Share your work email", isCorrect: false, reason: "They will use your email to start a spear-phishing attack on your company.", lesson: "Protect your professional identity from online strangers." },
            { text: "Tell them your secrets", isCorrect: false, reason: "Data is the goal. Your secrets will be used for blackmail.", lesson: "Privacy is your best defense against social engineering." }
        ]
    },
    { 
        type: "AI_SECURITY", title: "The 'AI' Crypto Bot", difficulty: "Hard", icon: "🪙",
        desc: "An ad promises 'AI-powered trading that never loses money'. It shows a chart with 1000% gains in one week.",
        options: [
            { text: "Invest your savings", isCorrect: false, reason: "There is no such thing as a 'no-loss' AI. This is a Ponzi scheme.", lesson: "High returns + AI Buzzword = Scam." },
            { text: "Report the ad", isCorrect: true, reason: "You identified a fraudulent investment scheme.", lesson: "AI cannot predict the future or bypass market risks." },
            { text: "Try with $100", isCorrect: false, reason: "They will show fake profits to make you 'invest' more later.", lesson: "Don't 'test' a scam; you'll just be targeted more." },
            { text: "Ask for the AI's whitepaper", isCorrect: false, reason: "Scammers use AI-generated whitepapers to look legitimate.", lesson: "Complexity is a tactic to hide fraud." }
        ]
    },
    // --- DIGITAL FOOTPRINTS (10 Questions) ---
    {
        type: "FOOTPRINTS", title: "Boarding Pass Post", difficulty: "Easy", icon: "✈️",
        desc: "You are excited about your vacation and want to post a picture of your boarding pass on Instagram. The barcode and your full name are visible.",
        options: [
            { text: "Post it immediately", isCorrect: false, reason: "Barcodes contain passenger name records (PNR) and frequent flyer info. Scammers can use this to access or cancel your booking.", lesson: "Never post barcodes, full tickets, or key documents online." },
            { text: "Blur details and post", isCorrect: false, reason: "Standard blur tools can often be reversed, and the barcode might still be scannable.", lesson: "Avoid posting boarding passes altogether until your trip is fully complete, and even then, hide all barcodes." },
            { text: "Don't post the pass", isCorrect: true, reason: "Perfect! You kept your travel details private.", lesson: "Your travel documents are high-value targets for identity thieves." },
            { text: "Share in close friends story", isCorrect: false, reason: "Close friends lists are still on public platforms and can be screenshotted or leaked.", lesson: "Control your data at the source, not by relying on platform permissions." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "The OAuth Access Check", difficulty: "Medium", icon: "🔑",
        desc: "You want to use a new online meme maker. It prompts you to 'Log in with Google' and requests full read/write access to your Google Drive files.",
        options: [
            { text: "Accept and continue", isCorrect: false, reason: "Meme makers do not need full access to your personal files. This is a massive privacy risk.", lesson: "Always inspect the specific permissions requested during third-party OAuth logins." },
            { text: "Deny and find another tool", isCorrect: true, reason: "Smart choice. You protected your cloud files from unneeded third-party access.", lesson: "Only grant permissions that are strictly necessary for the tool's function." },
            { text: "Create a dummy Google account", isCorrect: false, reason: "While slightly safer, it still encourages poor security habits and trackable footprints.", lesson: "Inspect scope requirements before agreeing to any third-party app link." },
            { text: "Accept but delete files later", isCorrect: false, reason: "Once permission is granted, they can download your files immediately before you delete them.", lesson: "Access is immediate. Protect files proactively." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "Old Gaming Forum Post", difficulty: "Easy", icon: "🎮",
        desc: "You realize an old forum account you made 8 years ago has your childhood email, real birthday, and a password you still use sometimes.",
        options: [
            { text: "Leave it alone", isCorrect: false, reason: "Old inactive databases are prime targets for data leaks. Your current password could be exposed.", lesson: "Inactive accounts represent 'shadow footprints' that must be cleaned up." },
            { text: "Delete/Deactivate account", isCorrect: true, reason: "Excellent! You minimized your attack surface by deleting old footprint data.", lesson: "Close accounts you no longer use, and update overlapping passwords." },
            { text: "Change the username only", isCorrect: false, reason: "The backend email and password hash remain vulnerable in their database.", lesson: "Changing display names does not protect the underlying database credentials." },
            { text: "Add more dummy posts", isCorrect: false, reason: "This adds more activity to the account, keeping it marked as active in their system.", lesson: "Clean, don't clutter, when retiring old accounts." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "Smart TV Setup", difficulty: "Medium", icon: "📺",
        desc: "Setting up a new smart TV, it asks you to sign in with your primary email to synchronize recommendations and search history across devices.",
        options: [
            { text: "Sign in with primary email", isCorrect: false, reason: "Smart TVs frequently track watch history, local networks, and voice data, linking it to your profile.", lesson: "Keep smart appliances isolated from your main personal email address." },
            { text: "Use a secondary email", isCorrect: true, reason: "Good privacy hygiene. You isolated your main email from TV tracking trackers.", lesson: "Creating a dedicated email for smart home devices limits data correlation." },
            { text: "Skip sign in completely", isCorrect: false, reason: "While private, it completely breaks the smart functionality you paid for.", lesson: "Use dedicated accounts to balance convenience and security." },
            { text: "Link with Facebook log in", isCorrect: false, reason: "Facebook logins share even more cross-app data and user activity patterns.", lesson: "Avoid linking social media accounts to third-party devices." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "Real-Time Location Tags", difficulty: "Easy", icon: "📍",
        desc: "You are at a high-end restaurant and want to post a photo tagging the live location and captioning it: 'Dinner tonight at my favorite spot!'.",
        options: [
            { text: "Post with live location", isCorrect: false, reason: "Live location tags announce to the public that you are away from home and reveal your routine.", lesson: "Avoid posting live location coordinates. Post photos after you leave." },
            { text: "Post without location tag", isCorrect: true, reason: "You shared the memory without giving away your exact real-time physical coordinates.", lesson: "Delayed posting or removing location metadata keeps you safe from physical track-scouts." },
            { text: "Tag a different location", isCorrect: false, reason: "This might confuse friends, but still confirms you are not at home.", lesson: "It's safer to post when you have already returned home." },
            { text: "Send to a public group", isCorrect: false, reason: "Sharing locations in large public group chats exposes your location to strangers.", lesson: "Keep location data limited to personal channels." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "Data Broker Opt-Out", difficulty: "Hard", icon: "📂",
        desc: "You search your name on Google and find a website listing your home address, phone number, and relatives' names for a fee.",
        options: [
            { text: "Pay them to remove it", isCorrect: false, reason: "Paying tells the broker that the details are active and accurate. They may charge you again.", lesson: "Never pay data brokers directly. Use official free opt-out procedures." },
            { text: "Submit a free opt-out request", isCorrect: true, reason: "Perfect. You utilized the broker's compliance page to request removal.", lesson: "Data brokers must legally provide opt-out paths. Monitor these sites periodically." },
            { text: "Ignore the listing", isCorrect: false, reason: "This information is used by stalkers, scammers, and phishers to target you.", lesson: "Proactively reclaiming your personal info limits targeted social engineering." },
            { text: "Threaten them with lawsuits", isCorrect: false, reason: "Legal threats are usually ignored unless sent through formal legal channels.", lesson: "Use standard data protection laws (like GDPR/CCPA) instead of empty threats." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "Browser Tracker Cookies", difficulty: "Medium", icon: "🍪",
        desc: "A shopping website presents a cookie banner: 'We use cookies to personalize ads. Accept all or Manage options.'",
        options: [
            { text: "Click 'Accept All'", isCorrect: false, reason: "Accepting all permits third-party trackers to follow your browsing habits across the web.", lesson: "Accepting trackers builds a digital footprint of your interests and habits." },
            { text: "Reject all optional cookies", isCorrect: true, reason: "Excellent! You only allowed necessary functional cookies, stopping ad tracking.", lesson: "Minimize tracking footprints by spending a few seconds to reject optional cookies." },
            { text: "Close banner without clicking", isCorrect: false, reason: "Some sites interpret closing as implicit consent to default tracking rules.", lesson: "Explicitly opt out of optional tracking categories." },
            { text: "Use incognito tab instead", isCorrect: false, reason: "Incognito still allows trackers to record activity during that session.", lesson: "Incognito does not block cookie tracking on active sites. Opt out directly." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "Public Wishlists", difficulty: "Easy", icon: "🎁",
        desc: "You create a public wishlist on Amazon containing expensive tech items, listing your city and real nickname.",
        options: [
            { text: "Keep it public", isCorrect: false, reason: "Public wishlists can be matched to your real identity and used in phishing campaigns.", lesson: "Keep wishlists private or shareable only via a direct secure link." },
            { text: "Make wishlist private", isCorrect: true, reason: "You secured your shopping preferences and city details from public scraping bots.", lesson: "Limit the personal clues you leave online. Wishlists are details scammers love." },
            { text: "Share it on Twitter", isCorrect: false, reason: "Tweeting links expands the audience of people who know your location and desires.", lesson: "Don't broadcast your purchasing desires to strangers." },
            { text: "Use a fake name on wishlist", isCorrect: false, reason: "While better, your city and wishlist items are still publicly cataloged.", lesson: "Privacy is best achieved by restricting access to the list." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "Personal Domain WHOIS", difficulty: "Hard", icon: "🌐",
        desc: "You register a personal portfolio website. The registrar asks if you want to buy 'WHOIS Privacy Protection' for $2.",
        options: [
            { text: "Skip privacy protection", isCorrect: false, reason: "Without WHOIS privacy, your real name, address, phone number, and email are public.", lesson: "Public domain registries are scraped by spammers and hackers daily." },
            { text: "Enable privacy protection", isCorrect: true, reason: "Crucial choice. The registrar will mask your contact details with placeholder info.", lesson: "Always hide your personal contact data when registering custom domains." },
            { text: "Use fake register details", isCorrect: false, reason: "Providing fake registry info can lead to domain suspension under ICANN rules.", lesson: "Legitimate ownership requires real details, but privacy masking hides them." },
            { text: "Link website to home address", isCorrect: false, reason: "This publishes your physical location directly to the open web.", lesson: "Never expose home addresses on public domains if you can avoid it." }
        ]
    },
    {
        type: "FOOTPRINTS", title: "The Unsubscribe Scam", difficulty: "Medium", icon: "✉️",
        desc: "You receive an unsolicited spam email offering 'Cheap Car Insurance' with a big blue 'Unsubscribe' button at the bottom.",
        options: [
            { text: "Click Unsubscribe", isCorrect: false, reason: "In spam emails, 'Unsubscribe' links confirm to spammers that your email is active.", lesson: "Spammers use unsubscribe links to validate their target lists. Block/Spam instead." },
            { text: "Mark as Spam and block", isCorrect: true, reason: "Perfect. You filtered the sender without confirming your email address is active.", lesson: "Only use unsubscribe links for companies you actually know and trust." },
            { text: "Reply 'Stop emailing me'", isCorrect: false, reason: "Replying is another way to confirm your mailbox is monitored by a real person.", lesson: "Do not interact with spammers. Interacting makes you a priority target." },
            { text: "Forward to your friends", isCorrect: false, reason: "This spreads potential tracking links to others, endangering their mailboxes.", lesson: "Contain spam by reporting it directly to your email provider." }
        ]
    }
];


