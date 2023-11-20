const { connection } = require("../db");

module.exports.getData = async (req, res) => {
  try {
    const query = `
        SELECT id, sensor1, sensor2, sensor3, sensor4, sensor5, sensor6, time 
        FROM device2 
        ORDER BY id DESC 
        LIMIT 10
      `;

    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching the data" });
      } else {
        const reversedResults = results.reverse();
        console.log("Data fetched successfully");
        res.status(200).json({ data: reversedResults });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in fetching the data" });
  }
};
