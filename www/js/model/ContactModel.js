
const ContactModel = (function () {
    let _contacts = [];
    function fetchContacts() {
        return new Promise(function (resolve, reject) {
            const fields = ['displayName', 'phoneNumbers', 'emails', 'addresses'];
            const options = new ContactFindOptions();
            options.multiple = true;
            options.hasPhoneNumber = true;

            navigator.contacts.find(fields, function (contacts) {
                // On normalise les contacts pour avoir un format cohérent
                _contacts = contacts.map(function (c) {
                    return {
                        id:          c.id,
                        displayName: c.displayName || 'Sans nom',
                        phone:       c.phoneNumbers  ? c.phoneNumbers[0].value  : 'Pas de numéro',
                        email:       c.emails        ? c.emails[0].value        : null,
                        address:     c.addresses     ? c.addresses[0].formatted : null,
                        _raw:        c   // on garde le contact natif pour édition/suppression
                    };
                });
                resolve(_contacts);
            }, function (error) {
                reject(new Error('Impossible de lire les contacts : ' + error.code));
            }, options);
        });
    }

    
    function getContactById(id) {
        return _contacts.find(c => c.id == id) || null;
    }

    
    function deleteContact(id) {
        return new Promise(function (resolve, reject) {
            const contact = getContactById(id);
            if (!contact) {
                reject(new Error('Contact introuvable'));
                return;
            }
            contact._raw.remove(function () {
                // On le retire aussi de la liste en mémoire
                _contacts = _contacts.filter(c => c.id != id);
                resolve();
            }, function (error) {
                reject(new Error('Erreur suppression : ' + error.code));
            });
        });
    }

    /**
     * Met à jour un contact du téléphone
     * @param {string} id - id du contact
     * @param {Object} data - { displayName, phone, email, address }
     * Retourne une Promise
     */
    function updateContact(id, data) {
        return new Promise(function (resolve, reject) {
            const contact = getContactById(id);
            if (!contact) {
                reject(new Error('Contact introuvable'));
                return;
            }

            const raw = contact._raw;

            if (data.displayName) {
                raw.displayName = data.displayName;
            }
            if (data.phone) {
                raw.phoneNumbers = [new ContactField('mobile', data.phone, true)];
            }
            if (data.email) {
                raw.emails = [new ContactField('home', data.email, true)];
            }
            if (data.address) {
                const addr = new ContactAddress();
                addr.formatted = data.address;
                raw.addresses = [addr];
            }

            raw.save(function (updatedContact) {
                // On met à jour aussi notre liste en mémoire
                const index = _contacts.findIndex(c => c.id == id);
                if (index !== -1) {
                    _contacts[index] = {
                        id:          updatedContact.id,
                        displayName: updatedContact.displayName || 'Sans nom',
                        phone:       updatedContact.phoneNumbers  ? updatedContact.phoneNumbers[0].value  : 'Pas de numéro',
                        email:       updatedContact.emails        ? updatedContact.emails[0].value        : null,
                        address:     updatedContact.addresses     ? updatedContact.addresses[0].formatted : null,
                        _raw:        updatedContact
                    };
                }
                resolve(_contacts[index]);
            }, function (error) {
                reject(new Error('Erreur modification : ' + error.code));
            });
        });
    }

    /**
     * Crée un nouveau contact sur le téléphone
     * @param {Object} data - { displayName, phone, email, address }
     */
    function createContact(data) {
        return new Promise(function (resolve, reject) {
            const contact = navigator.contacts.create();

            contact.displayName = data.displayName;
            contact.name = new ContactName();
            contact.name.formatted = data.displayName;

            if (data.phone) {
                contact.phoneNumbers = [new ContactField('mobile', data.phone, true)];
            }
            if (data.email) {
                contact.emails = [new ContactField('home', data.email, true)];
            }
            if (data.address) {
                const addr = new ContactAddress();
                addr.formatted = data.address;
                contact.addresses = [addr];
            }

            contact.save(function (newContact) {
                resolve(newContact);
            }, function (error) {
                reject(new Error('Erreur création : ' + error.code));
            });
        });
    }

    return {
        fetchContacts,
        getContactById,
        createContact,
        deleteContact,
        updateContact
    };

})();