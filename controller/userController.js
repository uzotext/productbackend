const bcrypt = require("bcrypt");
const User = require("../module/userModule.js");

// register user

const registerUser = async (req, res) => {
    try {
        let { name, email, userName, password, phoneNumber, sex, maritalStatus } = req.body;
        //validate required fields
        if (
            !name ||
            !email ||
            !userName ||
            !password ||
            !phoneNumber ||
            !sex ||
            !maritalStatus
        ) {
            return res
            .status(400)
            .json({message: "All Required Fields Must Be Provided"});
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

// save user in database
const newUser = new User ({
    name,
    email,
    userName,
    password: hashedPassword,
    phoneNumber,
    sex,
    maritalStatus,
});

//REGISTER USER IN DATABASE

const registeredUser = await newUser.save();
res.status(201).json(registeredUser);

} catch (err) {
    console.error("registration Error", err);
    // handle duplicate key errors
    if (err.code === 11000) {
        return res.status(400).json({
            message: "User Ready Exist",
            field: Object.keys(err.keyValue),
        });
    }
    res
    .status(500)
    .json({ message: "Error registering user", err: err.message });

}
};

// login user
const loginUser = async (req, res) => {
    try {
        const { userName, password}  = req.body;
        if (!userName || !password) {
            return res
            .status(400)
            .json({ message: "email and password are required" });
        }

        //find the user by email
        const user = await User.findOne({ userName});
        if (!user) {
            return res.status(400).json({ message: "Username not found" });
        }
        console.log(user);

        // COMPARE PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json(user);
   } catch (error) {
    res.status(500).json({ message: "Error logging in", error});
   }
};

// update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        //find user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        //find user fields
        const updatedData = req.body;

        //Only hash password if its being updated
        if(updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password= await bcrypt.hash(updatedData.password,salt);
        }
        // update user in the database
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true, //return the updated document
            runValidators: true, // enforce validate rule
        });
        res
          .status(200)
          .json({ message: "User Updated Successfully", updatedUser});
    } catch (err) {
        console.error("Error updating user", err);
        res
            .status(500)
            .json({ message: "Error updating user", err: err.message });
    }
};

// GET ALL User

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


// GET USER BY ID
const getUsertById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// DELETE USER
let deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User Not Found" });
        }
        // Delete the user
        await user.deleteOne();
        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        console.error("Error deleting user", error);
        res
            .status(500)
            .json({ message: "Error deleting user", error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getAllUsers,
    getUsertById,
    deleteUser,
};