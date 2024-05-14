const { spawn } = require("child_process");
const fetch = require("node-fetch");
const treeKill = require("tree-kill");
require("dotenv").config();

let end = ""

if (process.platform === "win32") {
  end = ".cmd";
}

let startVite;
let startElectron;

startVite = spawn("npm"+end, ["run", "dev"]);

startVite.stdout.on("data", (data) => {
  console.log(`Vite: ${data}`);
  if (data.includes("Local")) {
    console.log("Vite has started successfully.");
    startElectronForge();
  }
});

startVite.stderr.on("data", (data) => {
  console.error(`Vite error: ${data}`);
});

function startElectronForge() {
  const checkURL = async () => {
    try {
      const response = await fetch(process.env.VITE_DEV_URL);
      if (response.ok) {
        console.log("Vite server is ready. Starting Electron Forge.");
        const args = ["cross-env", "IS_DEV=true", "electron-forge", "start"];
        startElectron = spawn("npx"+end, args);

        startElectron.stdout.on("data", (data) => {
          console.log(`Electron Forge: ${data}`);
        });
        startElectron.stderr.on("data", (data) => {
          console.error(`Electron Forge error: ${data}`);
        });

        startElectron.on("exit", async (code) => {
          console.log(`Electron Forge process exited with code ${code}`);
          // Terminate both Electron and Vite processes
          treeKill(startVite.pid, "SIGKILL", (err) => {
            if (err) {
              console.error("Error killing Vite process:", err);
            } else {
              console.log("Vite process terminated.");
            }
            process.exit(0); // Exit the program
          });
        });
      } else {
        console.log("Waiting for Vite server to start...");
        setTimeout(checkURL, 1000); // Check again after 1 second
      }
    } catch (error) {
      console.error("Error occurred while checking Vite server:", error);
      process.exit(1);
    }
  };

  checkURL();
}
