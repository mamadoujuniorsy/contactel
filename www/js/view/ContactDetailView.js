const ContactDetailView = (function () {

    /**
     * Génère et injecte le détail d'un contact dans le DOM
     * @param {Object} contact - un objet contact venant du Model
     */
    function render(contact) {
        const html = `
            <div class="contact-detail-header">
                <img src="img/avatar.png" class="contact-detail-avatar">
                <h2 class="contact-detail-name">${contact.displayName}</h2>
            </div>
            <ul data-role="listview" data-inset="true">
                <li data-role="list-divider">Téléphone</li>
                <li><p>${contact.phone}</p></li>
                <li data-role="list-divider">Email</li>
                <li><p>${contact.email || "Pas d'email"}</p></li>
                <li data-role="list-divider">Adresse</li>
                <li><p>${contact.address || "Pas d'adresse"}</p></li>
            </ul>
            <div class="contact-detail-actions">
                <a href="edit.html" id="btnEdit"
                   data-role="button" data-icon="edit">
                    Modifier
                </a>
                <a href="#" id="btnDelete"
                   data-role="button" data-icon="delete" class="btn-danger">
                    Supprimer
                </a>
            </div>`;

        $('#profileContent').html(html).trigger('create');
    }

    function renderNotFound() {
        $('#profileContent').html('<p class="contact-error">Contact introuvable.</p>');
    }

    return {
        render,
        renderNotFound
    };

})();