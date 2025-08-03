export default function addLinkToPost() {
    setTimeout(() => {
        const addPostLinkHandlers = () => {
            const postItems = document.querySelectorAll(
                '[class*="ListCard-card"], [class*="GridCard-card"]',
            );

            postItems.forEach(item => {
                const link = item.firstChild as HTMLLinkElement;

                if (!link) {
                    return;
                }

                if (
                    link.firstChild?.nodeName === 'DIV'
                        ? (link.firstChild?.childNodes.length || 0) > 1
                        : link.children.length > 1
                ) {
                    return;
                }

                const rawHref = link.href;

                if (!rawHref) {
                    return;
                }

                const url = new URL(rawHref);

                const urlParts = url.hash.split('/');

                if (!urlParts.includes('posts')) {
                    return;
                }

                const id = urlParts.length
                    ? urlParts[urlParts.length - 1]
                    : null
                ;

                if (!id) {
                    return;
                }

                const createdElement = document.createElement('a');

                createdElement.title = 'Натисніть для перегляду допису';
                createdElement.setAttribute('href', `/post/${id}`);
                createdElement.setAttribute('target', '_blank');
                createdElement.style.zIndex = '10';
                createdElement.style.position = 'relative';
                createdElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" style="fill: #000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>';
                createdElement.addEventListener('click', event => {
                    event.preventDefault();
                    event.stopPropagation();
                    window.open(`/post/${ id }`, '_blank');
                });

                const firstChild = link.firstChild as HTMLDivElement;

                if (firstChild && firstChild.nodeName === 'DIV') {
                    firstChild.style.display = 'flex';
                    firstChild.style.justifyContent = 'space-between';
                    firstChild.appendChild(createdElement);

                    return;
                }

                link.style.display = 'flex';
                link.style.justifyContent = 'space-between';
                link.appendChild(createdElement);

                const linkContent =
                    link?.firstChild?.firstChild as HTMLHeadingElement;

                if (linkContent && linkContent.innerText) {
                    linkContent.innerText = linkContent.innerText?.replaceAll(
                        '\n\n',
                        '\n',
                    );
                }
            });
        };

        addPostLinkHandlers();

        const observer = new MutationObserver(() => {
            addPostLinkHandlers();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false,
        });
    }, 1000);
}