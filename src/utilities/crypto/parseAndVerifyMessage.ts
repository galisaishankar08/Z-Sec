export function parseAndVerifyMessage(message: string): { valid: boolean, body?: string } {
    const parts = message.split(';');
    if (parts.length < 4) {
        // Ensure there are enough parts in the message
        return { valid: false };
    }

    // Extract parts based on their positions
    const messageLength = parseInt(parts[0], 10);
    // parts[1] is the timestamp, which might be used for other validations or logging
    const ciphertext = parts[2];
    const providedChecksum = parseInt(parts[3], 10);

    // Basic validation of message length to match the length of ciphertext
    if (ciphertext.length !== messageLength) {
        return { valid: false };
    }

    // Calculate checksum from the ciphertext
    let recalculatedChecksum = 0;
    for (let i = 0; i < ciphertext.length; i++) {
        recalculatedChecksum += ciphertext.charCodeAt(i);
    }
    recalculatedChecksum = recalculatedChecksum % 256;

    // Verify the recalculated checksum matches the provided checksum
    return { valid: recalculatedChecksum === providedChecksum, body: ciphertext };
}
