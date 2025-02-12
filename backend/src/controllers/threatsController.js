import axios from "axios";
import Threat from "../models/threat.js";

const fetchThreats = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "date_added",
      sortOrder = "desc",
    } = req.query;

    // Ensure sort order is valid
    const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    // Check if we already have threats stored in MongoDB
    let threats = await Threat.find()
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // If no data is found, fetch from external API
    if (threats.length === 0) {
      console.log("Fetching new threats from external API...");
      const externalApiUrl =
        "https://urlhaus-api.abuse.ch/v1/urls/recent/limit/10/";
      const response = await axios.get(externalApiUrl);

      if (!response.data || !response.data.urls) {
        return res
          .status(500)
          .json({ error: "Invalid response from external API" });
      }

      const fetchedThreats = response.data.urls.map((threat) => ({
        host: threat.host,
        url: threat.url,
        threat_type: threat.threat || "unknown", // Ensure threat_type is always present
        date_added: new Date(threat.date_added), // Convert date to proper format
      }));

      await Threat.insertMany(fetchedThreats);
      threats = await Threat.find()
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    }

    const total = await Threat.countDocuments();

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      threats,
    });
  } catch (error) {
    console.error("Error fetching threats:", error.message);
    res.status(500).json({ error: "Failed to fetch threats" });
  }
};

export { fetchThreats };
