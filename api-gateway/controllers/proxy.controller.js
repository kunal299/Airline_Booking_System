import axios from "axios";

export const authServiceProxyHandler = async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.AUTH_SERVICE_URL}/api/v1/auth${req.url}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch the auth data",
    });
  }
};

export const flightServiceProxyHandler = async (req, res) => {
  const method = req.method.toLowerCase();
  try {
    console.log(`${process.env.FLIGHT_SERVICE_URL}${req.originalUrl}`);
    const response = await axios({
      method,
      url: `${process.env.FLIGHT_SERVICE_URL}${req.originalUrl}`,
      data: req.body,
      headers: {
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch the flight data",
    });
  }
};

export const bookingServiceProxyHandler = async (req, res) => {
  const method = req.method.toLowerCase();
  try {
    console.log(`${process.env.BOOKING_SERVICE_URL}${req.originalUrl}`);
    const response = await axios({
      method,
      url: `${process.env.BOOKING_SERVICE_URL}${req.originalUrl}`,
      data: req.body,
      headers: {
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
        "x-user-id": req.headers["x-user-id"],
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch the booking data",
    });
  }
};
