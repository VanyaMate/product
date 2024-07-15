// TODO: Continue
export const uploadFileAction = async (file: File) => {
    const data = new FormData();
    data.append('file', file, file.name);

    try {
        const request = new XMLHttpRequest();

        request.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                console.log(`Upload progress: ${ percentComplete }%`);
            }
        });

        request.open('POST', 'http://localhost:3000/api/v1/file', true);
        request.send(data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};