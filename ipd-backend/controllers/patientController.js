import Patient from '../models/Patient.js';



export const createPatient = async (req, res) => {
  try {
    const { contact, forceCreate } = req.body;

    const existingPatient = await Patient.findOne({ contact });

    if (existingPatient && !forceCreate) {
      return res.status(409).json({ message: "Patient already exists" });
    }

    const newPatient = new Patient(req.body);
    await newPatient.save();

    return res.status(201).json({ message: "Patient created", patient: newPatient });
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(500).json({ message: "Internal server error" });
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

//single patient by id

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateVisitCount = async (req, res) => {
  const { contact } = req.params;

  try {
    const patient = await Patient.findOne({ contact });
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    patient.visitCount += 1;
    await patient.save();

    res.status(200).json({ message: "Visit count updated", patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
