const spawn = require("child_process").spawn;
const path = require("path");

exports.parseCSV = (req, res, next) => {
  try {
    const pythonProcess = spawn("python3", [
      path.join(__dirname, "..", "services", "csvParser", "index.py"),
      path.join(__dirname, "..", "services", "csvParser", "jobs.csv"),
    ]);
    pythonProcess.stderr.on("data", () => {
      res.status(500);
      pythonProcess.removeAllListeners();
      return next(new Error("Error occured while running python script"));
    });
    pythonProcess.stdout.on("data", (data) => {
      if (data.toString().includes("Created")) {
        pythonProcess.removeAllListeners();
        return res.json({
          ok: true,
        });
      }
    });
  } catch (err) {
    return next(err);
  }
};
