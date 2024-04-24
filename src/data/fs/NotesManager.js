import fs from "fs";
import crypto from "crypto";

class NotesManager {
    // exportamos la class para manejarla en el router.
    constructor() {
        this.path = "src/data/fs/files/notes.json"
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 4);
            fs.writeFileSync(this.path, stringData);
            console.log('Archivo creado');
        } else {
            console.log('Archivo localizado')
        } 
    }
    async create(data) {
        try {
            if (!data.text) {
                const error = new Error ('Ingrese Texto')
                throw error // para q lo agarre el catch
            } else {
                const note = { // creación nota
                    id: crypto.randomBytes(12).toString('hex'),
                    text: data.text,
                    category: data.category || 'to do',
                    date: data.date || new Date(),
                    photo: data.photo || 'tbd'
                }; // cargar nota a array
                let allNotes = await fs.promises.readFile(this.path, 'utf-8')
                    allNotes = JSON.parse(allNotes)
                    allNotes.push(note)
                    allNotes = JSON.stringify(allNotes, null, 4)
                    await fs.promises.writeFile(this.path, allNotes)
                    console.log('creado')
                    return note
            };

        } catch(err) {
            throw (err)
        };
    };
    async read(category = 'to do') {
        try {
            let allNotes = await fs.promises.readFile(this.path, 'utf-8')
            allNotes = JSON.parse(allNotes)
            allNotes = allNotes.filter(each => each.category === category)
            if(allNotes.length === 0) {
                return null
            } else {
                console.log(allNotes)
                return allNotes
            }
        } catch (err) {
            throw err
        };
    };
    async readOne(id) {
        try {
            let allNotes = await fs.promises.readFile(this.path, 'utf-8');
            allNotes = JSON.parse(allNotes)
            let selected = allNotes.find((each) => each.id === id)
            return selected;
        } catch (err) {
            throw err
        }; 
    };
    async destroy(id) {
        try {
            let allNotes = await fs.promises.readFile(this.path, 'utf-8');
            allNotes = JSON.parse(allNotes);
            let selected = allNotes.find((each) => each.id === id);
            if(selected) {
                let withoutSelected = allNotes.filter((each) => each.id !== id);
                withoutSelected = JSON.stringify(withoutSelected, null, 4);
                await fs.promises.writeFile(this.path, withoutSelected);
                console.log('Nota eliminada');
                return selected;
            } else {
                const error = new Error(`No existe nota con el id: ${id}`)
                error.statusCode = 404;
                throw error;
            }
        } catch (err) {
            throw err;
            //hace saltar al catch de la función que engloba al método... es decir, el catch de la ruta.
            // si no le pones throw... si le poner x ejemplo, return... el objeto error no entra en el catch de la ruta, sino que entra en el try... se pasa como el "selected" que toma la ruta... por ende, no hace saltar al catch.
        }; 
    };
    async update(id, data) {
        // depende del id y de las propiedades a modificar
        try {
            let allNotes = await this.read(); //todas
            let selected = allNotes.find(each => each.id === id)
            if (selected) {
                for (let prop in data) {
                    selected[prop] = data[prop];
                };
                allNotes = JSON.stringify(allNotes, null, 2);
                await fs.promises.writeFile(this.path, allNotes);
                return selected;
            } else {
                const error = new Error('Not found');
                error.statusCode = 404;
                throw error;
                // throw hace saltar el catch y es exlusivo del constructor de errores.
            };
        } catch(err) {
            throw err;
            // este throw hace saltar el catch del router
        };       
    };
    // data es el objeto que envío para modificar el selected
    // necesito iterar el objeto data, para percibir la o las props (fecha, text, category, etc) que están siendo cambiadas, y entonces aplicarselo al selected.
    // la o las props que matcheen, van a ser actualizadas.

    // por la mutabilidad del metodo find, una vez que altero selected, se altera el valor original del selected en el array... no hace falta hacer manualmente el reemplazo en all.
};

const notesManager = new NotesManager()
export default notesManager



