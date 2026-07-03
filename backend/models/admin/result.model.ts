import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    draw_date: { type: String, required: true },
    draw_name: { type: String, required: true },
    draw_code: { type: String, required: true },
    first: {
        ticket:    { type: String, default: "" },
        location:  { type: String, default: "" },
        agent:     { type: String, default: "" },
        agency_no: { type: String, default: "" },
    },
    prizes: {
        consolation: { type: [String], default: [] },
        "2nd":       { type: [String], default: [] },
        "3rd":       { type: [String], default: [] },
        "4th":       { type: [String], default: [] },
        "5th":       { type: [String], default: [] },
        "6th":       { type: [String], default: [] },
        "7th":       { type: [String], default: [] },
        "8th":       { type: [String], default: [] },
        "9th":       { type: [String], default: [] },
        amounts: {
            "1st":        { type: String, default: "" },
            consolation:  { type: String, default: "" },
            "2nd":        { type: String, default: "" },
            "3rd":        { type: String, default: "" },
            "4th":        { type: String, default: "" },
            "5th":        { type: String, default: "" },
            "6th":        { type: String, default: "" },
            "7th":        { type: String, default: "" },
            "8th":        { type: String, default: "" },
            "9th":        { type: String, default: "" },
        },
        guess: { type: [String], default: [] },
        mc:    { type: [String], default: [] },
    },
    mc: { type: [String], default: [] },
}, { timestamps: true });

export const Result = mongoose.model("Result", resultSchema);
