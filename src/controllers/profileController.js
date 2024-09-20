const Profile = require('../models/profile');

// Crear un nuevo perfil
exports.createProfile = async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el perfil', error });
    }
};


// Obtener todos los perfiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los perfiles', error });
    }
};

// Obtener perfil por email
exports.getProfileByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const profile = await Profile.findOne({ profesionalEmail: email });
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error });
    }
};

// Añadir un servicio
exports.addService = async (req, res) => {
    try {
        const { email } = req.params;
        const { servicio } = req.body;
        const profile = await Profile.findOneAndUpdate(
            { profesionalEmail: email },
            { $push: { servicios: servicio } },
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir el servicio', error });
    }
};

// Borrar un servicio
exports.removeService = async (req, res) => {
    try {
        const { email, index } = req.params;
        const profile = await Profile.findOneAndUpdate(
            { profesionalEmail: email },
            { $unset: { [`servicios.${index}`]: 1 } },
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });
        await Profile.updateOne(
            { profesionalEmail: email },
            { $pull: { servicios: null } }
        ); // Eliminar servicio nulo
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el servicio', error });
    }
};

// Actualizar perfil
exports.updateProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const updatedProfile = await Profile.findOneAndUpdate(
            { profesionalEmail: email },
            { $set: req.body },
            { new: true }
        );
        if (!updatedProfile) return res.status(404).json({ message: 'Perfil no encontrado' });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el perfil', error });
    }
};

// Borrar perfil
exports.deleteProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const deletedProfile = await Profile.findOneAndDelete({ profesionalEmail: email });
        if (!deletedProfile) return res.status(404).json({ message: 'Perfil no encontrado' });
        res.status(200).json({ message: 'Perfil eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el perfil', error });
    }
};

// Cambiar estado de activo
exports.toggleActiveStatus = async (req, res) => {
    try {
        const { email } = req.params;
        const profile = await Profile.findOne({ profesionalEmail: email });

        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });

        profile.activo = !profile.activo; // Cambiar el estado
        await profile.save();

        res.status(200).json({ message: 'Estado actualizado', activo: profile.activo });
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado', error });
    }
};
