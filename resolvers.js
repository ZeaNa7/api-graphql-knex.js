import client from './db.js';

const resolvers = {
    Query: {
        async getAllStyles() {
            try {
                const styles = await client.select().table('Style');
                return styles;
            }
            catch (err) {

            }
        },
        async getAllArtistes() {
            try {
                const artistes = await client.select().table('Artiste');
                return artistes;
            }
            catch (err) {

            }
        },
        async getAllConcerts() {
            try {
                const concerts = await client.select().table('Concert');
                return concerts;
            }
            catch (err) {

            }
        },
        async getVisiteursFromVille(_, {ville}) {
            return client.select()
                .from('Visiteur')
                .join('Ville', 'Visiteur.idVille', '=', 'Ville.idVille')
                .where('Ville.nom', '=', ville);
        },
        async getConcertsFromVille(_, {ville}) {
            return client.select()
                .from('Concert')
                .join('Ville', 'Concert.idVille', '=', 'Ville.idVille')
                .where('Ville.nom', '=', ville);
        },
        async getArtistConcerts(_, {artistName}) {
            return client.select('Concert.*')
                .from('Concert')
                .join('Realise', 'Concert.idConcert', '=', 'Realise.idConcert')
                .join('Artiste', 'Realise.idArtiste', '=', 'Artiste.idArtiste')
                .where('Artiste.pseudo', '=', artistName);
        },
        async getConcertsFromStyle(_, {ville, styleName}) {
            return client.select('Concert.*')
                .from('Concert')
                .join('Ville', 'Concert.idVille', '=', 'Ville.idVille')
                .join('Joue', 'Concert.idConcert', '=', 'Joue.idConcert')
                .join('Style', 'Joue.idStyle', '=', 'Style.idStyle')
                .where('Ville.nom', '=', ville)
                .andWhere('Style.libelle', '=', styleName);
        }
    }
}

export default resolvers;