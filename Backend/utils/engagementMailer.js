import User from "../models/User.js";
import sendEmail from "./sendEmail.js";

export const checkActiveUsers = async () => {
  try {
    const users = await User.find();

    const now = new Date();

    for (let user of users) {

      if (!user.loginTime) continue;

      const duration = (now - user.loginTime) / 1000; // seconds

      // 🔥 if active more than 60 sec
      if (duration > 60 && !user.offerSent) {

        await sendEmail(
          user.email,
          "🎉 Special Offer Just for You!",
          "Hey! You’ve been browsing for a while. Enjoy 25% OFF on your next order!"
        );

        console.log("Offer sent to:", user.email);

        // mark to avoid multiple emails
        user.offerSent = true;
        await user.save();
      }
    }

  } catch (err) {
    console.log("Mailer Error:", err);
  }
};