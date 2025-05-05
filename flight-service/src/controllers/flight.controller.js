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

export const searchFlight = async (req, res) => {
  try {
    const { departure, arrival } = req.query;

    const query = {};

    if (departure) {
      query.departure = { $regex: new RegExp(departure, "i") };
    }
    if (arrival) {
      query.arrival = { $regex: new RegExp(arrival, "i") };
    }
    // if (date) {
    //   query.date = new Date(date);
    // }

    console.log(query);

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (err) {
    res.status(500).json({
      message: "Failed to search flights",
      error: err.message,
    });
  }
};

export const incrementSeats = async (req, res) => {
  const { count } = req.body;
  const { flightId } = req.params;

  try {
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
      });
    }

    flight.availableSeats += count;
    if (flight.availableSeats >= flight.totalSeats) {
      flight.availableSeats = flight.totalSeats;
    }

    await flight.save();
    res.json({
      message: "Flight seats updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating seats",
      error: err.message,
    });
  }
};

export const decrementSeats = async (req, res) => {
  const { count } = req.body;
  const { flightId } = req.params;

  console.log(flightId);

  try {
    const flight = await Flight.findById(flightId);

    if (!flight) {
      res.status(404).json({
        message: "Flight not found",
      });
    }

    if (flight.availableSeats - count < 0) {
      return res.status(400).json({
        message: "Enough seats not available",
      });
    }

    flight.availableSeats -= count;
    await flight.save();
    res.json({
      message: "Flight seats updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating seats",
      error: err.message,
    });
  }
};
