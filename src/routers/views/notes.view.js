import { Router } from "express";
import notesManager from "../../../src/data/fs/NotesManager.js";

const notesViewRouter = Router();

notesViewRouter.get('/', async (req, res, next) => {
    try {
        const allNotes = await notesManager.read()
        return res.render('notes', { allNotes })
    } catch(err) {
        return next(err);
    };
});
notesViewRouter.get('/:nid', async(req, res, next) => {
    try {
        const { nid } = req.params;
        const selected = await notesManager.readOne(nid);
        return res.render('detail', { note: selected });
    } catch(err) {
        return next(err);
    };
});

export default notesViewRouter;
// exporto para importar en index.view.js