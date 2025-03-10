import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
source:{
    type: String,
    enum:["facebook","google","youtube","instagram","whatsapp","other"],
    required: true,
},
name: {
    type: String,
    required: true,
    trim: true,
},
phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/, // Assuming it's a 10-digit mobile number
},
address: {
    type: String,
    required: true,
},
remark: [
    {
    reason: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Default date as current timestamp
    },
],
},{
timestamps: true,
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
