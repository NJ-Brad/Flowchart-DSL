import * as fs from 'fs';
import * as path from 'path';
import * as Crypto from 'crypto';
import { tmpdir } from 'os';

export class FileUtils
{
static fileExtension(fileName:string) : string{
    // https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
    var fileExt: string = fileName.split('.').pop()!;
    if(fileExt === fileName){
        fileExt = "";
    }
    return fileExt.toLowerCase();
 }

    //https://stackoverflow.com/questions/7055061/nodejs-temporary-file-name    
    getTempFileName(extension: string = "tmp") :string{
        // Starting with dg. to indicate that the files come from this application.  Easier to identify when cleaninug up garbage.  (Being a good citizen)
        return path.join(tmpdir(),`dg.${Crypto.randomBytes(6).readUIntLE(0,6).toString(36)}.${extension}`);
    }    

    createDirectories(book: string) {
       const dirName = path.resolve();
       book = book.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
       fs.mkdir(path.resolve(dirName, book), { recursive: true }, e => {
           if (e) {
               console.error(e);
           } else {
               console.log('Success');
           }
        });
    }    

    createDirectories2(book: string, section: string) {
        const dirName = path.resolve();
        book = book.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
        fs.mkdirSync(path.resolve(book, section), { recursive: true });
     }    

     static fileNameOnly(fileName:string) : string{
        // https://www.w3schools.com/nodejs/met_path_basename.asp
        var noPath = path.basename(fileName);
        var ext = FileUtils.fileExtension(noPath);
        var nameOnly = noPath.substring(0, noPath.length - ext.length);

        // remove the trailing period if necessary
        if(nameOnly.endsWith('.')){
            nameOnly = nameOnly.substring(0, nameOnly.length - 1);
        }

        return nameOnly;
     }

    static getFolderName(fileName:string) : string{
        // https://www.w3schools.com/nodejs/met_path_basename.asp
        var pathOnly = path.dirname(fileName);
        return pathOnly;
     }
     
    static fixPathName(pathName: string): string{
        var rtnVal:string = pathName;

        rtnVal = rtnVal.split(' ').join('%20');
        rtnVal = rtnVal.split('\\').join('/');
        return rtnVal;
     } 

    static changeExtension(fileName:string, newExtension: string) : string{
        var folder: string = this.getFolderName(fileName);
        var name: string = this.fileNameOnly(fileName);

        return this.fixPathName(`${folder}/${name}.${newExtension}`);
    }
}
