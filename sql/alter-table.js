import client from '../db.js';

client.schema.alterTable('Artiste', function(table) {
    table.string('AjoutColonne', 255);
    })
    .then(function() {
        console.log('Colonne ajoutée avec succès !');
    })
    .catch(function(error) {
        console.error('Une erreur s\'est produite :', error);
    })
    .finally(function() {
        client.destroy();
    });