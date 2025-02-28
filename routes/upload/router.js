import {Router} from "express";
import {upload} from "../../middleware/multer.js";

const router = Router();

router.post(`/`, upload.single("image"), async (req, res) => {
	if (!req.file) {
		return res.status(400).json({error: `File not found`});
	}
	res.json({imageUrl: req.file.path});
});

export {router};
