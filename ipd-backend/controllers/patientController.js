import Patient from '../models/Patient.js';

export const createPatient = async (req, res) => {
  try {
    const p = await Patient.create(req.body);
    res.status(201).json(p);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAllPatients = async (_, res) => {
  try {
    const list = await Patient.find();
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


export const getTodaysPatients = async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const patients = await Patient.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });

    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: "Error fetching today's patients" });
  }
};