export const renameFile = file => {
    const newFile = new File([file], encodeURIComponent(file.name), {
        type: file.type,
        lastModified: file.lastModified,
    });
    return newFile;
};
