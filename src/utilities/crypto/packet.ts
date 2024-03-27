export function packet(ciphertext: string): string {
    const timestamp = new Date().toISOString();
    const messageLength = ciphertext.length;

    let checksum = 0;
    for (let i = 0; i < ciphertext.length; i++) {
        checksum += ciphertext.charCodeAt(i);
    }
    checksum = checksum % 256;

    // Constructing the final message without explicit names
    const finalMessage = `${messageLength};${timestamp};${ciphertext};${checksum}`;
    return finalMessage;
}
