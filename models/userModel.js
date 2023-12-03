import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const userModel = mongoose.model('userModel', userSchema);

export default userModel;