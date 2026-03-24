const ContactListView = (function () {

    /**
     * Génère et injecte la liste des contacts dans le DOM
     * @param {Array} contacts - tableau de contacts venant du Model
     */
    function render(contacts) {
        let html = '';

        if (contacts.length === 0) {
            html = '<li><p>Aucun contact trouvé.</p></li>';
        } else {
            for (const contact of contacts) {
                html += `
                    <li>
                        <a href="contact.html?id=${contact.id}" class="contact-link">
                            <img src="img/avatar.png" class="ui-li-thumb contact-avatar">
                            <h2>${contact.displayName}</h2>
                            <p>${contact.phone}</p>
                        </a>
                        <a href="#" class="contact-delete-btn" data-contact-id="${contact.id}">Supprimer</a>
                    </li>`;
            }
        }

        $('#contactList').html(html).listview('refresh');
    }

    /**
     * Affiche un message d'erreur dans la liste
     * @param {string} message
     */
    function renderError(message) {
        $('#contactList')
            .html(`<li><p class="contact-error">${message}</p></li>`)
            .listview('refresh');
    }

    return {
        render,
        renderError
    };

})();