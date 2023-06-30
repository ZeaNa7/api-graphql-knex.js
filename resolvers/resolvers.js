import client from '../db.js';

const resolvers = {
    Query: {
        async getAllStyles() {
            try {
                const styles = await client.select().table('Style');
                return styles;
            }
            catch (err) {
                throw new Error('Erreur lors de la récupération des styles');
            }
        },
        async getAllArtistes() {
            try {
                const artistes = await client.select().table('Artiste');
                return artistes;
            }
            catch (err) {
                throw new Error('Erreur lors de la récupération des artistes');
            }
        },
        async getAllConcerts() {
            try {
                const concerts = await client.select().table('Concert');
                return concerts;
            }
            catch (err) {
                throw new Error('Erreur lors de la récupération des concerts');
            }
        },
        async getVisiteursFromVille(_, {ville}) {
            try {
                const visiteurs = await client.select()
                .from('Visiteur')
                .join('Ville', 'Visiteur.idVille', '=', 'Ville.idVille')
                .where('Ville.nom', '=', ville);
                return visiteurs;
            } catch (err) {
                throw new Error('Erreur lors de la récupération des visiteurs de la ville ' + ville);
            }
        },
        async getConcertsFromVille(_, {ville}) {
            try {
                const concerts = await client.select()
                .from('Concert')
                .join('Ville', 'Concert.idVille', '=', 'Ville.idVille')
                .where('Ville.nom', '=', ville);
                return concerts;
            } catch (err) {
                throw new Error('Erreur lors de la récupération des concerts de la ville ' + ville);
            }
        },
        async getArtistConcerts(_, {artistName}) {
            try {
                const concerts = await client.select()
                .from('Concert')
                .join('Realise', 'Concert.idConcert', '=', 'Realise.idConcert')
                .join('Artiste', 'Realise.idArtiste', '=', 'Artiste.idArtiste')
                .where('Artiste.pseudo', '=', artistName);
                return concerts;
            } catch (err) {
                throw new Error('Erreur lors de la récupération des concerts de l\'artiste ' + artistName);
            }
        },
        async getConcertsFromStyle(_, {ville, styleName}) {
            try {
                const concerts = await client.select()
                .from('Concert')
                .join('Ville', 'Concert.idVille', '=', 'Ville.idVille')
                .join('Joue', 'Concert.idConcert', '=', 'Joue.idConcert')
                .join('Style', 'Joue.idStyle', '=', 'Style.idStyle')
                .where('Ville.nom', '=', ville)
                .andWhere('Style.libelle', '=', styleName);
                return concerts;
            } catch (err) {
                throw new Error('Erreur lors de la récupération des concerts de la ville ' + ville + ' et du style ' + styleName);
            }
        },
    }
}

export default resolvers;