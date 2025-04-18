const express = require("express");
const app = express();
const mongoose = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const studentServiceRoutes = require("./routes/studentServiceRoutes");
const guestRoutes = require("./routes/guestRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const constraintRoutes = require("./routes/constraintRoutes");
const cors = require("cors");

// Cấu hình middleware
app.use(express.json());
app.use(cors());

// Định tuyến
app.use("/api", studentRoutes);
app.use("/api", studentServiceRoutes);
app.use("/api", guestRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/constraints", constraintRoutes);

// Lắng nghe server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
