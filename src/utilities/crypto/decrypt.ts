import { morseCodeMapping } from './morseCodeMapping';

export function decrypt(ciphertext: string): string {
    let plaintext = '';
    let buffer = '';
    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        if (char === '2' || char === '3') {
            if (buffer) {
                const letterMorse = buffer.slice(0, -1).replace(/0/g, '.').replace(/1/g, '-');
                const letter = Object.keys(morseCodeMapping).find(key => morseCodeMapping[key] === letterMorse);
                plaintext += char === '2' ? letter?.toLowerCase() : letter?.toUpperCase();
                buffer = '';
            }
        } else if (char === '4') {
            plaintext += ' ';
            buffer = '';
        } else if (/[a-zA-Z0-9]/.test(char)) {
            buffer += char;
        } else {
            // Directly append special characters to plaintext
            plaintext += char;
        }
    }
    // Handle any remaining buffer
    if (buffer) {
        const letterMorse = buffer.replace(/0/g, '.').replace(/1/g, '-');
        const letter = Object.keys(morseCodeMapping).find(key => morseCodeMapping[key] === letterMorse);
        plaintext += letter ?? '';
    }
    return plaintext;
}
