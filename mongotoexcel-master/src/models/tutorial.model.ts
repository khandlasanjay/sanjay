import mongoose from "mongoose";

interface pdf {
  No: number;
  Name: string;
  Age: number;
  Address: string;
}

const pdfSchema = new mongoose.Schema<pdf>(
  {
    No: { type: Number },
    Name: { type: String },

    Age: { type: Number },
    Address: { type: String },
  },
  { timestamps: true }
);

const pdfschema = mongoose.model<pdf>("pdf", pdfSchema);
export default pdfschema;
