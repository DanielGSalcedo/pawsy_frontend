const API_URL = "https://6dd2de48-17d3-4059-992e-4feb7068963b.mock.pstmn.io";
const API_KEY = "PMAK-68321a03671fac000137a1dc-5a67697d08fc443ed193b1fe9d684a691b";

export const userApi = {
  async signUp(user) {
    alert(user);
    if (user == null) {
      throw new Error("User data is required");
    }
    // return true;
    try {
        const response = await fetch(`${API_URL}/users-signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error("Failed to sign up");
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error during sign up:", error);
        throw error;
    }
  },

  async resetPassword(token, newPassword) {
    if (token == null || newPassword == null) {
      throw new Error("Token and new password are required");
    }
    console.log("Token:", token);
    console.log("New Password:", newPassword);
    return true;
  },

  async signIn(user) {
    // alert(user);
    if (user == null) {
      throw new Error("User data is required");
    }
    // return true;
    try {
        const response = await fetch(`${API_URL}/users-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error("Failed to sign in");
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error during sign in:", error);
        throw error;
    }
  },
};
