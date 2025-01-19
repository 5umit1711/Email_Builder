import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    logo: {
        type: String,
    },
    title: {
        text: { type: String, required: true }, 
        font_size: { type: String, default: "20px" },
        color: { type: String, default: "#000000" }, 
    },
    body: {
        text: { type: String, required: true }, 
        font_size: { type: String, default: "16px" }, 
        color: { type: String, default: "#000000" }, 
    },
    footer: {
        text: { type: String }, 
        font_size: { type: String, default: "14px" }, 
        color: { type: String, default: "#000000" }, 
      },
    image: {
        type: String,
    },
    background: {
        type: String,
        default: 'black',
    } 
}, {timestamps : true});

const Email = mongoose.model('Email', emailSchema);

export default Email;