const http = require("http")
const url = require("url")
const fs = require("fs")

const server = http.createServer((req,res) => {
    const params = url.parse(req.url,true).query;
    const {archivo, contenido, nombre, nuevoNombre} = params;

    if(req.url.includes('/crear')){
        return fs.writeFile(`archivos/${archivo}.txt`,` ${new Date()}  ${contenido}`,"utf-8", ()=>{
            return res.end('archivo creado con exito', null)
        })
    }
    if(req.url.includes('/leer')){
        return fs.readFile(`archivos/${archivo}.txt`,(err,data) => {
        if(err){
            res.write("no se puede leer el archivo");
            return res.end();
        }
        res.write('Contenido del archivo: ' + data);
        return res.end();
        })
    }
    if(req.url.includes('/renombrar')){
        return fs.rename(`archivos/${nombre}.txt`,`archivos/${nuevoNombre}.txt`,(err,data) =>{
            if(err){
                res.write("no se puede renombrar el archivo")
            }
            return res.end(`Archivo con el nombre '${nombre}' se a renombrado exitosamente a '${nuevoNombre}'`, null)
        })
    }
    if(req.url.includes('/eliminar')){
        
        return fs.unlink(`archivos/${archivo}.txt`,(err,data) =>{
            if(err){
                res.write("no se pudo eliminar el archivo")
            }
             return   res.end(`archivo '${archivo}'eliminado con exito`, null)
        })
    }



    res.end("fin",null);

})

const puerto = 4040
server.listen(puerto,()=> console.log('servidor activo'))