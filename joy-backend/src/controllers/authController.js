import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AuthController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(req.body);

            if (!email || !password) {
                return res.status(400).json({ message: "Please enter all fields" });
            }

            const user = await User.getByEmail(email);

            if (!user) {
                return res.status(400).json({ message: "User does not exist" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { name: user.name, role: user.role },
                process.env.SECRET_KEY,
                { 
                    algorithm: "HS256",
                    allowInsecureKeySizes: true,
                    expiresIn: 86400 
                }
            );
            return res.status(200).json({ message: "Login successful", token: token });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            let token = req.headers.authorization;

            if (!token || !token.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized - Missing or Malformed Token" });
            }
            token = token.split(" ")[1];

            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            if (!decodedToken) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default AuthController;
