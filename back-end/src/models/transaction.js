import { Schema, model } from "mongoose";
  
const schema = new Schema({
    user: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: [true,'wallet address is undefined'],
    },
    amount: {
        type: Number,
        default: Math.floor(Math.random() * 5001),
    },
},{ timestamps: true });

const Transaction = model('Transaction',schema);

export default Transaction;

