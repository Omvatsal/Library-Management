const users =require('../model/user')


const handleGetDashboard = async (req, res) => {
    try {
        const userId = req.user.id; 
        const userData = await users.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ users: userData });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports={handleGetDashboard}
