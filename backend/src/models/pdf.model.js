import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        request: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request",
            required: true,
        },
    }
);

const PDF = mongoose.model("PDF", pdfSchema);

export default PDF;
