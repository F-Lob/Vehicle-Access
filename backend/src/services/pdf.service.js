import PDFModel from "../models/pdf.model.js";
import { handleError } from "../utils/errorHandler.js";
import User from "../models/user.model.js";

async function createPDF(file, id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      const errorMessage = "No se encontro la persona";
      throw new Error(errorMessage);
    }
    const newPDF = new PDFModel({
      name: file.originalname,
      filePath: file.path,
      user: id,
      nombre: user.username,
      request: requestId,
    });

    const PDFSaved = await newPDF.save();
    return [PDFSaved, null];

  } catch (error) {
    const errorMessage = "No se pudo crear el PDF.";
    handleError(error, "pdfService -> createPDF", errorMessage);
    return [null, errorMessage];
  }
}

async function getPDF() {

  try {
    const pdf = await PDFModel.find();

    if (!pdf) {
      return [null, "No hay pdf en la base de datos"];
    }

    return [pdf, null];

  } catch (error) {
    handleError(error, "pdfService -> getPDF");
  }

}

async function getPDFsForPerson(userId) {

  try {

    const pdfs = await PDFModel.find({ user: userId });

    if (!pdfs) {
      return [null, "No hay pdfs para esta persona"];
    }

    return [pdfs, null];

  } catch (error) {
    handleError(error, "pdfService -> getPDFsForPerson");
  }

}

export const getPDFsForRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const pdfs = await PDFModel.find({ requestId: requestId });
    if (!pdfs || pdfs.length === 0) {
      return respondError(req, res, 404, 'No PDFs found for this request');
    }
    respondSuccess(req, res, 200, pdfs);
  } catch (error) {
    handleError(error, 'pdf.controller -> getPDFsForRequest');
    respondError(req, res, 500, 'Server error');
  }
};

export const deletePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await PDFModel.findByIdAndDelete(id);
    if (!pdf) {
      return respondError(req, res, 404, 'PDF not found');
    }
    respondSuccess(req, res, 200, 'PDF deleted successfully');
  } catch (error) {
    handleError(error, 'pdf.controller -> deletePDF');
    respondError(req, res, 500, 'Server error');
  }
};

export default { 
    createPDF, 
    getPDF, 
    getPDFsForPerson, 
    deletePDF ,
    getPDFsForRequest,
};