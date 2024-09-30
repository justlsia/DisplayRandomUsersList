// Appeller l'API : random user
const endpoint = "https://randomuser.me/api/?results=50";


// Fonction pour afficher les utilisateurs dans un tableau
function afficherUtilisateurs(users) {
    // Sélectionner le tableau HTML ([0] : accéder au 1er élement du tableau)
    const userTableauBody = document.getElementById('usersTableau').getElementsByTagName('tbody')[0];

    // Boucler sur les utilisateurs 
    users.forEach((user, index) => {

        // Créer une nouvelle ligne
        const row = userTableauBody.insertRow();

        // Créer les cellules du tableau
        const cell_Index = row.insertCell(0);
        const cell_Genre = row.insertCell(1);
        const cell_Nom = row.insertCell(2);
        const cell_Photo = row.insertCell(3);
        const cell_Ville = row.insertCell(4);
        const cell_Pays = row.insertCell(5);

        // Remplir les cellules avec les données de l'utilisateur
        cell_Index.textContent = index + 1; // Numéro/index de l'utilisateur en cours

        // Genre avec icône
        // Si le genre est masculin
        const iconeGenre = user.gender === 'male' 
        ? '<img src="assets/images/iconeHomme.svg" alt="Homme" style="width: 30px; height: auto;">' 
        // Sinon si le genre est féminin
        : '<img src="assets/images/iconeFemme.svg" alt="Femme" style="width: 30px; height: auto;">';
        cell_Genre.innerHTML = iconeGenre;

        // Nom complet (titre (Mr/Ms) + prénom + nom)
        const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
        cell_Nom.textContent = fullName;

        // Photo
        const img = document.createElement('img');          // Crée un nouvel élément d'image.
        img.src = user.picture.thumbnail;                   // Définit la source de l'image à la miniature de la photo de l'utilisateur.
        img.alt = fullName;                                 // Définit le texte alternatif de l'image au nom complet de l'utilisateur.
        img.style.width = '50px';                           // Taille de l'image
        img.style.height = 'auto';                          // Hauteur automatique
        cell_Photo.appendChild(img);                        // Ajoute l'élément d'image à la cellule de photo.

        // Ville
        cell_Ville.textContent = user.location.city;

        // Pays avec drapeau
        // Créer une chaîne HTML pour afficher le drapeau du pays (Appel API : flagpedia.net)
        const drapeauPays = `<img src="https://flagcdn.com/${user.nat.toLowerCase()}.svg" alt="${user.location.country}" style="width: 30px; height: auto;">`;
        // Insèrer le drapeau du pays dans la cellule de pays.
        cell_Pays.innerHTML = drapeauPays; // Afficher le drapeau
    });
}


// Fetch : Effectue une requête HTTP pour récupérer des données
fetch(endpoint)

    // Un fois la réponse reçu
    .then(function(response) {

        //  Afficher le statut de la réponse dans la console
        console.log(response.status);
    
        // Si le statut est bien à 200 (réponse positive)
        if (response.status == 200) {
            // On parse/transforme en json
            response.json()
                // Une fois la conversion du json (promesse) effectuée
                .then((data) => {
                    console.log(data);
                    // Appeler la fonction pour afficher les données
                    afficherUtilisateurs(data.results);
                });
        }
    })

    // Sinon si une erreur c'est produit durant le traitement
    .catch(function(error) {
        // Afficher l'erreur
        console.log(error);
    });

