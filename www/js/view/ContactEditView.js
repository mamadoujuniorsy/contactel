const ContactEditView = (function () {

    /**
     * Affiche le formulaire pré-rempli avec les données du contact
     * @param {Object} contact
     */
    function render(contact) {
        const html = `
            <div data-role="fieldcontain">
                <label for="editName">Nom</label>
                <input type="text" id="editName" value="${contact.displayName}">

                <label for="editPhone">Téléphone</label>
                <input type="tel" id="editPhone" value="${contact.phone}">

                <label for="editEmail">Email</label>
                <input type="email" id="editEmail" value="${contact.email || ''}">

                <label for="editAddress">Adresse</label>
                <input type="text" id="editAddress" value="${contact.address || ''}">

                <button id="btnSave" data-role="button" data-icon="check">
                    Enregistrer
                </button>
            </div>`;

        $('#editContent').html(html).trigger('create');
    }

    
 
    function getFormData() {
        return {
            displayName: $('#editName').val().trim(),
            phone:       $('#editPhone').val().trim(),
            email:       $('#editEmail').val().trim(),
            address:     $('#editAddress').val().trim()
        };
    }

    function renderError(message) {
        $('#editContent').prepend(
            `<p class="contact-error">${message}</p>`
        );
    }

    return {
        render,
        getFormData,
        renderError
    };

})();