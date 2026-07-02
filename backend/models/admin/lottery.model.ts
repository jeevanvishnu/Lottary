import mongoose from "mongoose";

const lotterySchema = new mongoose.Schema({
    lotteryNo: {
        type: String,
        required: true,
    },
    lotteryName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    jackpotAmount: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const Lottery = mongoose.model("Lottery", lotterySchema);
