import {Schema,model} from "mongoose";

function validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

const schema = new Schema({
    email: {
        type: String,
        required: [true, "Email Must Be Provided"],
        trim: true,
        lowercase: true,
        unique: [true, "Email Already Exist"],
        validate: [validateEmail, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please select a strong password"],
        minLength: [8, "Min Length is atleast eight characters"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    transaction: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
}, { timestamps: true });

const User = model('User', schema);

export default User;
