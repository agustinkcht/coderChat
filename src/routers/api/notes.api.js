// siempre mismo patron: importo, genero, exporto.

import { Router } from "express";
import notesManager from "../../data/fs/NotesManager.js"

const notesRouter = Router();


// routes 
notesRouter.get('/', read);
notesRouter.get('/:nid', readOne);
notesRouter.post('/', create);
notesRouter.put('/:nid', update);
notesRouter.delete('/:nid', destroy);
// indexRouter ya plantea el /api... aca se agrega otro /


// functions lectura
async function read (req, res, next) {
    try {
        const { category } = req.query;
        const allNotes = await notesManager.read(category);
        if (allNotes) {
            return res.json({
                statusCode: 200,
                response: allNotes,
                category,
                success: true
            });
        } else {
            const error = new Error("NOT FOUND")
            error.status = 404
            throw error
        };
    } catch(err) {
        return next(err);
    };
};
async function readOne (req, res, next) {
    try {
        const { nid } = req.params;
        const selected = await notesManager.readOne(nid);
        if (selected) {
            return res.json({
                statusCode: 200,
                response: selected,
                success: true
            });
        } else {
            const error = new Error('NOT FOUND')
            error.statusCode = 404;
            throw error;
        };
    } catch(err) {
        return next(err);
    };
};

// functions create, update, destroy 
async function create (req, res, next) {
    try {
        const data = req.body
        // body= datos que envía el cliente, es el cuerpo de lo que se envía.
        const newNote = await notesManager.create(data)
        return res.json({
            statusCode: 201,
            message: `Note created successfully with id + ${newNote.id}`
        }); // siempre tras realizar lo que el cliente pidió, enviamos respuesta
    } catch(err) {
        return next(err);
    };
};

async function update (req, res, next) {
    try {
        const { nid } = req.params;
        const data = req.body;
        // el cuerpo del request es la data a pasar
        const selected = await notesManager.update(nid, data)
        return res.json({
            statusCode: 200,
            response: selected,
            message: `Note with ID ${nid} updated successfully`
        });
    } catch(err) {
        return next(err);
    };
};

async function destroy (req, res, next) {
    try{
        const { nid } = req.params;
        const selected = await notesManager.destroy(nid)
        return res.json({
            statusCode: 200,
            message: 'Note deleted successfully',
            response: selected
        });
    } catch(err) {
        return next(err);
    };
};

export default notesRouter;