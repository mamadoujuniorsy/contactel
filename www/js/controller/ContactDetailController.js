
const ContactDetailController = (function () {

    function init() {
        document.addEventListener('deviceready', _onDeviceReady, false);
    }

    async function _onDeviceReady() {
        const params = new URLSearchParams(window.location.search);
        const contactId = params.get('id');

        if (!contactId) {
            ContactDetailView.renderNotFound();
            return;
        }

        try {
            await ContactModel.fetchContacts();
            const contact = ContactModel.getContactById(contactId);

            if (contact) {
                ContactDetailView.render(contact);
                _bindEvents(contactId);
            } else {
                ContactDetailView.renderNotFound();
            }
        } catch (error) {
            ContactDetailView.renderNotFound();
        }
    }

    function _bindEvents(contactId) {
        $('#btnEdit').attr('href', 'edit.html?id=' + contactId);
        $('#btnDelete').on('click', async function (e) {
            e.preventDefault();
            if (!confirm('Supprimer ce contact ?')) return;
            try {
                await ContactModel.deleteContact(contactId);
                window.location.href = 'index.html';
            } catch (error) {
                alert('Erreur : ' + error.message);
            }
        });
    }

    return { init };

})();

ContactDetailController.init();