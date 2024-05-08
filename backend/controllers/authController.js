const { hashedPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const test = (request, response) => {
    response.json("Test is working");
};

const registerUser = async (request, response) => {

    try {

        const { name, email, password } = request.body;

        if (!name) {
            return response.json({
                error: "Name is required"
            });
        }

        if (!email) {
            return response.json({
                error: "Email is required"
            });
        }

        if (!password || password.length < 6) {
            return response.json({
                error: "Password is required and must be 6 characters long."
            });
        }

        //Check email

        const exists = await UserModel.findOne({ email: email });
        if (exists) {
            return response.json({
                error: "Email already exists."
            })
        }

        const encryptedPassword = await hashedPassword(password)


        const user = await UserModel.create({
            name, email, password: encryptedPassword
        })


        return response.json(user);
    } catch (error) {
        console.log(error);
    }

}
/*
const loginUser = async (request, response) => {

    try {

        const { email, password } = request.body;

        if (!email) {
            return response.json({
                error: "Email address is not provided"
            });
        }
        if (!password && password.length < 6) {
            return response.json({
                error: "Password is not provided and if it is then the length is not greater than 6"
            })

        }

        const userExists = await UserModel.findOne({ email: email });

        if (!userExists) {
            return response.json({
                error: "User does not exists."
            });
        }



        const passwordMatching = await comparePassword(password, userExists.password);

        if (!passwordMatching) {
            return response.json({
                error: "Password does not match."
            })
        }
        jwt.sign({ email: userExists.email, id: userExists._id, name: userExists.name }, process.env.JWT_SECRET, {}, (error, token) => {
            if (error) {
                throw error;
            }


            response.cookie('token', token);
            return response.json(userExists);
        })




    } catch (error) {
        console.log(error);
    }


}
*/
const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;

        if (!email) {
            return response.json({
                error: "Email address is not provided"
            });
        }
        if (!password || password.length < 6) {
            return response.json({
                error: "Password is not provided or is less than 6 characters"
            });
        }

        const userExists = await UserModel.findOne({ email: email });

        if (!userExists) {
            return response.json({
                error: "User does not exist."
            });
        }

        const passwordMatching = await comparePassword(password, userExists.password);

        if (!passwordMatching) {
            return response.json({
                error: "Password does not match."
            });
        }

        jwt.sign({ email: userExists.email, id: userExists._id, name: userExists.name }, process.env.JWT_SECRET, {}, (error, token) => {
            if (error) {
                throw error;
            }

            response.cookie('token', token);
            return response.json(userExists);
        });
    } catch (error) {
        console.error(error);
        return response.json({ error: "An unexpected error occurred" });
    }
};

const getProfile = (request, response) => {

    const { token } = request.cookies;


    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
            if (error) {
                throw error;
            }
            response.json(user);
        })
    } else {

        response.json(null);
    }
}

module.exports = {
    test, registerUser, loginUser, getProfile
};

