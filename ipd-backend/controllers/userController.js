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



// export const deleterece = async (req, res) => {
//   try {
//      const { userId } = req.params
//      const user = await clerkClient.users.getUser(userId)
    

//     console.log(user);

//     if (!user) {
//       return res.status(400).json({ message: "User ID is required." });
//     }

//     await clerkClient.users.deleteUser(userId);

//     res.status(200).json({ message: "User deleted successfully." });
//   } catch (err) {
//     console.error("Error deleting user:", err);

//     // Optional: send detailed error message in development
//     res.status(500).json({ message: "Failed to delete user." });
//   }
// };

export const deleterece = async (req, res) => {
  try {
    const { id } = req.params; // This must be Clerk user ID (like user_abc123)
    console.log("Deleting Clerk user ID:", id);

    if (!id) {
      return res.status(400).json({ message: "Clerk user ID is required." });
    }

    await clerkClient.users.deleteUser(id);
    res.status(200).json({ message: "Receptionist deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting Clerk user:", err);
    res.status(500).json({ message: "Failed to delete user from Clerk." });
  }
};