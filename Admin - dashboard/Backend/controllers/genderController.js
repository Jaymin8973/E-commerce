import Gender from "../models/gender.model.js";

// GET all genders
export const getAllGenders = async (req, res) => {
  try {
    const genders = await Gender.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(genders);
  } catch (error) {
    console.error('Error fetching genders:', error);
    res.status(500).json({ message: 'Failed to fetch genders' });
  }
};

// GET single gender by id
export const getGenderById = async (req, res) => {
  try {
    const gender = await Gender.findByPk(req.params.id);
    if (!gender) return res.status(404).json({ message: 'Gender not found' });
    res.status(200).json(gender);
  } catch (error) {
    console.error('Error fetching gender:', error);
    res.status(500).json({ message: 'Failed to fetch gender' });
  }
};

// CREATE new gender
export const createGender = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const gender = await Gender.create({ name });
    res.status(201).json(gender);
  } catch (error) {
    console.error('Error creating gender:', error);
    res.status(500).json({ message: 'Failed to create gender' });
  }
};

// UPDATE gender
export const updateGender = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const gender = await Gender.findByPk(id);
    if (!gender) return res.status(404).json({ message: 'Gender not found' });

    gender.name = name || gender.name;
    await gender.save();

    res.status(200).json(gender);
  } catch (error) {
    console.error('Error updating gender:', error);
    res.status(500).json({ message: 'Failed to update gender' });
  }
};

// DELETE gender
export const deleteGender = async (req, res) => {
  try {
    const { id } = req.params;
    const gender = await Gender.findByPk(id);
    if (!gender) return res.status(404).json({ message: 'Gender not found' });

    await gender.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting gender:', error);
    res.status(500).json({ message: 'Failed to delete gender' });
  }
};
