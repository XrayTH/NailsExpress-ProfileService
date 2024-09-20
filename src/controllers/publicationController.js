const Publication = require('../models/publication');

// Obtener todas las publicaciones
exports.getAllPublications = async (req, res) => {
    try {
        const publications = await Publication.find();
        res.status(200).json(publications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las publicaciones', error });
    }
};

// Obtener publicaciones por correo
exports.getPublicationsByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const publications = await Publication.findOne({ profesionalEmail: email });
        if (!publications) return res.status(404).json({ message: 'Publicaciones no encontradas' });
        res.status(200).json(publications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las publicaciones', error });
    }
};

// Crear nuevas publicaciones
exports.createPublication = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el email de los parámetros de la URL

        const newPublication = new Publication({
            profesionalEmail: email,
            listaPublicaciones: [] // Inicializa la lista de publicaciones como vacía
        });

        await newPublication.save();
        res.status(201).json(newPublication);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la publicación', error });
    }
};


// Borrar todas las publicaciones por correo
exports.deletePublications = async (req, res) => {
    try {
        const { email } = req.params;
        const deletedPublication = await Publication.findOneAndDelete({ profesionalEmail: email });
        if (!deletedPublication) return res.status(404).json({ message: 'Publicaciones no encontradas' });
        res.status(200).json({ message: 'Publicaciones eliminadas correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar las publicaciones', error });
    }
};

// Añadir una nueva publicación
exports.addPublication = async (req, res) => {
    try {
        const { email } = req.params;
        const { titulo, contenido, imagen } = req.body;

        const updatedPublication = await Publication.findOneAndUpdate(
            { profesionalEmail: email },
            { $push: { listaPublicaciones: { titulo, contenido, imagen } } },
            { new: true }
        );

        if (!updatedPublication) return res.status(404).json({ message: 'Publicaciones no encontradas' });
        res.status(200).json(updatedPublication);
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir la publicación', error });
    }
};

// Borrar una publicación
exports.removePublication = async (req, res) => {
    try {
        const { email, index } = req.params;

        const updatedPublication = await Publication.findOneAndUpdate(
            { profesionalEmail: email },
            { $unset: { [`listaPublicaciones.${index}`]: 1 } },
            { new: true }
        );

        if (!updatedPublication) return res.status(404).json({ message: 'Publicaciones no encontradas' });

        await Publication.updateOne(
            { profesionalEmail: email },
            { $pull: { listaPublicaciones: null } } // Eliminar publicación nula
        );

        res.status(200).json(updatedPublication);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la publicación', error });
    }
};

// Editar una publicación
exports.updatePublication = async (req, res) => {
    try {
        const { email, index } = req.params;
        const { titulo, contenido, imagen } = req.body;

        const updatedPublication = await Publication.findOneAndUpdate(
            { profesionalEmail: email },
            { $set: { [`listaPublicaciones.${index}`]: { titulo, contenido, imagen } } },
            { new: true }
        );

        if (!updatedPublication) return res.status(404).json({ message: 'Publicaciones no encontradas' });
        res.status(200).json(updatedPublication);
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la publicación', error });
    }
};

// Cambiar estado activo
exports.toggleActiveStatus = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el email de los parámetros de la URL
        const publication = await Publication.findOne({ profesionalEmail: email });

        if (!publication) return res.status(404).json({ message: 'Publicaciones no encontradas' });

        // Cambiar el estado activo
        publication.activo = !publication.activo;
        await publication.save();

        res.status(200).json(publication);
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado activo', error });
    }
};
