import Flight from "../models/flight.model.js";

export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({
      success: true,
      data: {
        flights,
      },
    });
    console.log("Flights: ", flights);
  } catch (e) {
    res.status(500).json({
      message: "Failed to get flights",
      error: e.message,
    });
  }
};

export const createFlight = async (req, res) => {
  try {
    const newFlight = await Flight.create(req.body);
    res.status(201).json({
      message: "New flight created successfully",
      newFlight,
    });
    console.log(newFlight);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Failed to create flight",
      error: e.message,
    });
  }
};
