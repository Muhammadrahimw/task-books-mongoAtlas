import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import {cloudinary} from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "uploads",
		format: (req, file) => {
			const mimeType = file.mimetype.split("/")[1];
			return mimeType === "jpeg" || mimeType === "jpg" ? "jpg" : mimeType;
		},
		public_id: (req, file) => {
			const originalName = file.originalname.split(".")[0];
			return originalName.replace(/[^a-zA-Z0-9]/g, "_");
		},
	},
});

const upload = multer({storage});

export {upload};
