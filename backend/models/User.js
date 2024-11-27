import mongoose from "mongoose";
import bcrpyt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrpyt.hash(this.password, 10); // 10 salt rounds we are doing currently
    }
    next();
})

const User = mongoose.model("User", userSchema);

export default User;