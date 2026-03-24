
const ContactListController = (function () {

    function init() {
        document.addEventListener('deviceready', _onDeviceReady, false);
    }

    async function _onDeviceReady() {
        try {
            const contacts = await ContactModel.fetchContacts();
            ContactListView.render(contacts);
            _bindEvents();
        } catch (error) {
            ContactListView.renderError('Impossible de charger les contacts : ' + error.message);
        }
    }

    function _bindEvents() {
        $('#contactList').on('click', 'a.contact-delete-btn', async function (e) {
            e.preventDefault();
            const contactId = $(this).data('contact-id');
            if (!confirm('Supprimer ce contact ?')) return;
            try {
                await ContactModel.deleteContact(contactId);
                const contacts = await ContactModel.fetchContacts();
                ContactListView.render(contacts);
                _bindEvents();
            } catch (error) {
                alert('Erreur suppression : ' + error.message);
            }
        });

        $('#btnAddContact').on('click', function () {
            window.location.href = 'add.html';
        });
    }

    return { init };

})();

ContactListController.init();