// routes/genderRoutes.js
import express from 'express';
import { createGender, deleteGender, getAllGenders, getGenderById, updateGender } from '../controllers/genderController.js';
const router = express.Router();


// GET all
router.get('/', getAllGenders);

// GET by id
router.get('/:id', getGenderById);

// POST create
router.post('/', createGender);

// PUT update
router.put('/:id', updateGender);

// DELETE
router.delete('/:id', deleteGender);

export default router
