
const ContactAddView = (function () {

    function render() {
        const html = `
            <div data-role="fieldcontain">
                <label for="addName">Nom *</label>
                <input type="text" id="addName" placeholder="Nom complet">

                <label for="addPhone">Téléphone *</label>
                <input type="tel" id="addPhone" placeholder="Numéro de téléphone">

                <label for="addEmail">Email</label>
                <input type="email" id="addEmail" placeholder="Adresse email">

                <label for="addAddress">Adresse</label>
                <input type="text" id="addAddress" placeholder="Adresse postale">

                <button id="btnCreate" data-role="button" data-icon="check">
                    Créer le contact
                </button>
            </div>`;

        $('#addContent').html(html).trigger('create');
    }

    function getFormData() {
        return {
            displayName: $('#addName').val().trim(),
            phone:       $('#addPhone').val().trim(),
            email:       $('#addEmail').val().trim(),
            address:     $('#addAddress').val().trim()
        };
    }

    function renderError(message) {
        $('.contact-error').remove();
        $('#addContent').prepend(`<p class="contact-error">${message}</p>`);
    }

    return { render, getFormData, renderError };

})();