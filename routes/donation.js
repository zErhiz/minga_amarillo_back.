import { Router } from 'express';
import donation from '../controllers/donations/donation.js'

let router = Router();

router.post('/', donation)

export default router