import { error } from "console";
import { transporter } from "../../config/mail.config.js";
import dotenv from "dotenv";
dotenv.config();

export const sendNotification = async (req, res) => {
  const { email, subject, flightId, seatsBooked, action } = req.body;

  if (!email || !subject || !flightId || !seatsBooked || !action) {
    return res.status(404).json({
      message: "Missing required fields",
    });
  }

  const formattedMessage =
    action == "booking"
      ? `
    Dear Passenger,

      Thank you for booking with SkyFlight Airlines.

      ✈️ Flight ID: ${flightId}
      🎫 Seats Booked: ${seatsBooked}

      We are excited to have you on board. Please arrive at the airport 2 hours before your flight time.

      Safe travels,
      SkyFlight Airlines`
      : `Dear Passenger,

      Your flight booking has been successfully cancelled.

      ✈️ Flight ID: ${flightId}
      ❌ Seats Cancelled: ${seatsBooked}

      We're sorry to see you go. If this was a mistake, feel free to rebook your flight at any time.

      Warm regards,
      SkyFlight Airlines`;

  try {
    await transporter.sendMail({
      from: `"SkyFlight Airlines" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: formattedMessage,
    });

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to send email",
      error: err.message,
    });
  }
};
