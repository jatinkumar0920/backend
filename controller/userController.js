import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";


export const getAllUser = async (req, res) => {
    try {
        const getUser = await userModel.find({})
        res.status(200).json({
            message: "User fatch success",
            result: getUser,
        })
        //console.log(res.result);
    } catch (err) {
        res.status(404).json({
            message: "error",
            result: err.message,
        })
        // console.log(err.message);
    }
};

export const createUser = async (req, res) => {
    const user = req.body;
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;



    try {
        const emailexist = await userModel.findOne({
            email: email,
        })

        if (emailexist) {
            return res.status(400).json({
                massage: "email already exist",
            })
        }


        const userNameExist = await userModel.findOne({
            username: username,
        })

        if (userNameExist) {
            return res.status(400).json({
                massage: "username already exist",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        const newUser = new userModel(user);
        await newUser.save();
        res.status(201).json({
            message: "user created",
            result: newUser
        })
        

    } catch (err) {
        res.status(404).json({
            message: err.message,
        });
    }

}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const deletedUser = await userModel.deleteOne({
            _id: id,
        });
        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({
                message: "user with given id is not found",
                result: deletedUser
            });
        } else {
            res.status(200).json({
                message: "user deleted successfully",
                result: deletedUser,
            });

        }

    } catch (err) {
        res.status(400).json({
            message: "something went wrong"
        });
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const updateduser = req.body;

    try {
        const result = await userModel.findByIdAndUpdate(id, updateduser)
        return res.status(200).json({
            message: "user updated",
            result: updateduser
        })
        console.log(updateuser)

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

export const getOneUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await userModel.findOne({
            _id: id

        })
        if (!user) {
            res.status(404).json({
                message: "no user found"
            })
        } else {
            res.status(200).json({
                message: `user fatched`,
                result: user
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "something went wrong"
        })
    }
}

export const userLogin = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {

        const user = await userModel.findOne({
            username: username,
        });
        if (!user) {
            return res.status(404).json({
                message: "user does not exist"
            })
        }

        //console.log('pass from login ------------', user.password);
        const ispasswordvalied = await bcrypt.compare(password, user.password)
        if (!ispasswordvalied) {
            return res.status(404).json({
                message: "invailed credential"
            })
        } else {
            res.status(200).json({
                message: "login successfully"
            })
        }


    }
    catch (err) {
        req.status(400).json({
            message: "error"
        })
    }
}

export const deleteAllUser = async (req, res) => {
    const id = req.params.id
    try {
        const deletedUser = await userModel.deleteMany({

        });
        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({
                message: "user with given id is not found",
                result: deletedUser
            });
        } else {
            res.status(200).json({
                message: "user deleted successfully",
                result: deletedUser,
            });

        }

    } catch (err) {
        res.status(400).json({
            message: "something went wrong"
        });
    }
};




