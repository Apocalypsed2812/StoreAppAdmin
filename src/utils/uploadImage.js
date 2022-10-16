import { fs } from 'fs-react';

function UploadImage(oldPath, name) {
    let newPath = '~/assets/images/' + name;
    fs.copyFile(oldPath, newPath, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Upload successfully!');
    });
}

export default UploadImage;
