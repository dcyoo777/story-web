export const addStringInString = (
    str: string,
    insertStr: string,
    index: number,
) => {
    if (str.length < index) {
        return str;
    }
    return str?.slice(0, index) + insertStr + str?.slice(index, str.length);
};

export const addColon = (str: string) => {
    return addStringInString(str, ':', 2).slice(0, 5);
};
