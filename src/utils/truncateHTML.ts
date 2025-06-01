import { Parser } from 'htmlparser2';

export default function truncateHTML(html: string, maxCharacters: number): {
    truncated: boolean;
    html: string
} {
    let textContent = '';
    let charactersCounted = 0;
    let truncated = false;

    let stopParsing = false;

    const parser = new Parser({
        ontext(text) {
            if (stopParsing) return;

            const remainingChars = maxCharacters - charactersCounted;

            if (text.length <= remainingChars) {
                textContent += text;
                charactersCounted += text.length;
            } else {
                textContent += text.substring(0, remainingChars);
                charactersCounted = maxCharacters;
                truncated = true;
                stopParsing = true;
            }
        },
    });

    parser.write(html);
    parser.end();

    if (!truncated && textContent.length <= maxCharacters) {
        return {
            html: textContent,
            truncated: false,
        };
    }

    return {
        html: truncated ? textContent + '...' : textContent, // Add ellipsis only if truncated
        truncated: truncated,
    };
}