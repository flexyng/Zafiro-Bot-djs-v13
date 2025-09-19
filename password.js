/**
 * @param {Number} length 
 * @returns {String} 
 */
module.exports = (length) => {
    if (!length) throw new TypeError("The length is not defined");

    const characters = '123456789abcdefghijklmnñopqrstuvwxyzABCDFGHBGBIJKLMNÑOPQRSTUVXYZ';
    let generatedString = "";

    for (let i = 0, n = characters.length; i < length; ++i) {
        generatedString += characters.charAt(Math.floor(Math.random() * n));
    }

    return generatedString;
}
