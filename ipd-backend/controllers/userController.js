// controllers/userController.js
import { clerkClient } from "@clerk/clerk-sdk-node";


export const createReceptionist = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const user = await clerkClient.users.createUser({
      emailAddress: [email],
      firstName,
      lastName,
      password,
      publicMetadata: { role: "receptionist" },
    });

    res.status(201).json({ message: "Receptionist created", userId: user.id });
  } catch (error) {
    console.error("❌ Error creating receptionist:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getAllReceptionists = async (req, res) => {
  try {
    const response = await clerkClient.users.getUserList(); // Returns { data: [...] }
    const allUsers = response.data;

    const receptionists = allUsers
      .filter(u => u.publicMetadata?.role === "receptionist")
      .map(u => ({
        id: u.id,
        name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
        email: u.emailAddresses?.[0]?.emailAddress || "No email",
      }));

    res.json(receptionists);
  } catch (err) {
    console.error("Error fetching from Clerk:", err);
    res.status(500).json({ message: "Failed to fetch receptionist users." });
  }
};