import occurrences from './ocurrences.mjs';

export const isEmailValid = (email) => {
    if (!email) return false;

    if (!email.includes('@')) return false;

    if (occurrences(email, '@') > 1) return false;

    const parts = email.split('@');
    const direction = parts[0];
    const domain = parts[1];

    // Check if the email has a direction and a domain
    if (!direction || !domain) return false;

    // Check if the direction and the domain doesn't starts or ends with a dot
    if (
        direction.startsWith('.') ||
        direction.endsWith('.') ||
        domain.startsWith('.') ||
        domain.endsWith('.')
    )
        return false;

    // Check domain and direction length
    if (direction.legth < 3 || domain.length < 3) return false;

    // Check if the domain have at least one dot
    if (!domain.includes('.')) return false;

    // check if the domain contains two dots
    if (domain.contains('..')) return false;
};

export const isUsernameValid = (username) => {
    const invalidChars = [
        '"',
        ':',
        ';',
        '\\',
        '/',
        '+',
        '=',
        '-',
        '~',
        "'",
        '|',
        'º',
        'ª',
        '<',
        '>',
        '{',
        '}',
        '[',
        ']',
    ];

    const containsInvalidChars = invalidChars.some((char) =>
        username.includes(char)
    );

    return !containsInvalidChars;
};
