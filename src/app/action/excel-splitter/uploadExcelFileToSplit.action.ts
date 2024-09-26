// TEMP koroche mda
export const uploadExcelFileToSplitAction = function (file: File) {
    const data = new FormData();
    data.append('file', file, file.name);

    fetch(__API__ + `/v1/excel-splitter`, {
        method : 'POST',
        body   : data,
        headers: {
            'authorization': 'key.123',
        },
    })
        .then(async (response) => {
            console.log(response);

            if (!response.ok) {
                throw new Error(`Not ok ${ await response.json() }`);
            }

            const reader        = response.body.getReader();
            const contentLength = +response.headers.get('Content-Length');

            let receivedLength = 0;
            const chunks       = [];

            const TRUE = true;
            while (TRUE) {
                const { done, value } = await reader.read();
                if (done) break;

                chunks.push(value);
                receivedLength += value.length;

                console.log(`Received ${ receivedLength } of ${ contentLength }`);
            }

            const chunksAll = new Uint8Array(receivedLength);
            let position    = 0;
            for (const chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }

            const blob = new Blob([ chunksAll ], { type: 'application/zip' });

            const url  = window.URL.createObjectURL(blob);
            const a    = document.createElement('a');
            a.href     = url;
            a.download = 'splitted.zip';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};