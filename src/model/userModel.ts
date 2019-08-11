import {Schema, model} from "mongoose";
import {genSaltSync, hashSync} from 'bcryptjs';

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true,
    },
    dob:{
        type: Date,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

userSchema.pre('save', function (next) {
    const user: any = this;

    if(user.isModified("password")) {
        const saltRound = parseInt(process.env.SALT || '');
        const salt = genSaltSync(saltRound);
        const hash = hashSync(user.password, salt);
        user.password = hash;
        next();
    } else {
        next();
    }
})

export const userModel = model('user', userSchema);