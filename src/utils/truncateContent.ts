export default function truncateContent(
    markdownInput: string,
    maxCharacters: number,
): {
    truncated: boolean;
    output: string;
} {
    if (!markdownInput || maxCharacters <= 0) {
        return {
            truncated: false,
            output: '',
        };
    }

    let currentCharactersCounted = 0;
    let truncated = false;
    const lines = markdownInput.split('\n');
    const outputLines: string[] = [];

    let inBlockquote = false;
    let truncationPointHit = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const originalLine = line;

        // Update blockquote state
        if (line.startsWith('>')) {
            inBlockquote = true;
        } else if (inBlockquote && line.trim() === '') {
            let nextLineIsBlockquote = false;
            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].startsWith('>')) {
                    nextLineIsBlockquote = true;
                    break;
                }
                if (lines[j].trim() !== '') {
                    break;
                }
            }
            if (!nextLineIsBlockquote) {
                inBlockquote = false;
            }
        } else {
            inBlockquote = false;
        }

        if (inBlockquote) {
            outputLines.push(originalLine);

            if (truncationPointHit) {
                truncated = true;
            }

            continue;
        }

        if (!truncationPointHit) {
            const visibleText = line
                .replace(/^#+\s*/, '')
                .replace(/[*_~`]/g, '')
                .replace(/\[[^\]]*]\([^)]*\)/g, '')
                .replace(/^-+\s*/, '')
                .replace(/^\d+\.\s*/, '')
                .replace(/`{1,3}([^`]+)`{1,3}/g, '$1')
                .replace(/^[>\s]*/, '')
                .trim();

            const remainingChars = maxCharacters - currentCharactersCounted;

            if (visibleText.length <= remainingChars) {
                outputLines.push(originalLine);
                currentCharactersCounted += visibleText.length;
            } else {
                const truncatedVisibleText = visibleText.substring(
                    0,
                    remainingChars,
                );

                outputLines.push(truncatedVisibleText);
                currentCharactersCounted = maxCharacters;
                truncated = true;
                truncationPointHit = true;
            }
        } else {
            break;
        }
    }

    let finalOutput = outputLines.join('\n');

    if (truncated) {
        finalOutput += '...';
    }

    return {
        output: finalOutput,
        truncated: truncated,
    };
}