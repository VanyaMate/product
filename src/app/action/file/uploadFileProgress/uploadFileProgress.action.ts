export const uploadFileProgressAction = async function (file: File, progress: number) {
    return [ file, progress ];
};