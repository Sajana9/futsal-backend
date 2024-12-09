import mongoose from "mongoose";

const futsalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    disclaimer: {
        type: String,
    }
});


const futsal = mongoose.model("Futsal", futsalSchema);
export default futsal;
