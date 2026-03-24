const ContactEditController = (function () {

    function init() {
        document.addEventListener('deviceready', _onDeviceReady, false);
    }

    async function _onDeviceReady() {
        const params = new URLSearchParams(window.location.search);
        const contactId = params.get('id');

        if (!contactId) {
            window.location.href = 'index.html';
            return;
        }

        try {
            await ContactModel.fetchContacts();
            const contact = ContactModel.getContactById(contactId);
            if (!contact) {
                window.location.href = 'index.html';
                return;
            }
            ContactEditView.render(contact);
            _bindEvents(contactId);
        } catch (error) {
            ContactEditView.renderError(error.message);
        }
    }

    function _bindEvents(contactId) {
        $('#btnSave').on('click', async function () {
            const data = ContactEditView.getFormData();
            try {
                await ContactModel.updateContact(contactId, data);
                window.location.href = 'contact.html?id=' + contactId;
            } catch (error) {
                ContactEditView.renderError(error.message);
            }
        });
    }

    return { init };

})();

ContactEditController.init();