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

export const getFlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findById(id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        flight,
      },
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to get flights",
      error: e.message,
    });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({
      success: true,
      message: "Flight updated successfully",
      data: {
        updatedFlight,
      },
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to get flights",
      error: e.message,
    });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);

    if (!deletedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({
      success: true,
      message: "Flight deleted successfully",
      data: {
        deletedFlight,
      },
    });
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
