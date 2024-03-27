import { morseCodeMapping } from './morseCodeMapping';

// Encrypts plaintext to Morse code with custom encoding
export function encrypt(plaintext: string): string {
    let ciphertext = '';
    for (let char of plaintext) {
        const isLowercase = char === char.toLowerCase() && /[a-z]/.test(char);
        const isUppercase = char === char.toUpperCase() && /[A-Z]/.test(char);

        if (char.toUpperCase() in morseCodeMapping) {
            ciphertext += morseCodeMapping[char.toUpperCase()].replace(/\./g, '0').replace(/-/g, '1');
            ciphertext += isLowercase ? '2' : '3';
        } else if (char === ' ') {
            ciphertext += '4';
        } else if (!/[a-zA-Z0-9]/.test(char)) { // For special characters
            ciphertext += char;
        }
    }
    return ciphertext;
}