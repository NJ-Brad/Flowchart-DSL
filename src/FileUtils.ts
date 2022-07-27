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
}