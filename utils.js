import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// en __dirname se guarda el directory name de de __filename (todo menos el archivo)… en este caso, EL ABSOLUTE PATH DE 09-HBS(el proyecto)
// por ende, utilizando __dirname podemos construir el absolute path de cualquier archivo/directorio dentro del proyecto.

export default __dirname