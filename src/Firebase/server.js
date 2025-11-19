import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Firebase service account key
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const app = express();
app.use(cors());
app.use(express.json());

// Get all users
app.get("/all-users", async (req, res) => {
  try {
    const result = await admin.auth().listUsers(1000); // first 1000 users
    const users = result.users;
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Delete user by UID
app.delete("/delete-user/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    await admin.auth().deleteUser(uid);
    res.json({ message: `User ${uid} deleted from Firebase` });
  } catch (err) {
    console.error(err);
    if (err.code === "auth/user-not-found") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Firebase server running on port ${PORT}`);
});
