import { Router } from 'express';
import multer from 'multer';

import {
    uploadMultipleHandler,
    handleUpload
} from './upLoad.controller';

const router = Router();
const upload = multer({ dest: './temp' });

router.post('/file', upload.single('file'), handleUpload)
router.post('/files', upload.array('files'), uploadMultipleHandler)

export default router;