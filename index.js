document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cibler le conteneur du carrousel par son ID
    const carouselContainer = document.getElementById('tpCarousel');
    // 2. Cibler les boutons par leurs IDs
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Vérification de sécurité (pour éviter les erreurs si les éléments ne sont pas trouvés)
    if (!carouselContainer || !prevBtn || !nextBtn) {
        // Cette erreur apparaîtra dans la console si les IDs sont incorrects.
        console.error("Échec du chargement du carrousel. Vérifiez les IDs HTML ('tpCarousel', 'prevBtn', 'nextBtn').");
        return; 
    }
    
    // Calcul de la distance de défilement: on utilise la largeur visible du conteneur.
    // Cette valeur est dynamique et donc plus fiable que 320px fixe.
    // On peut aussi utiliser 320 si on veut défiler carte par carte, mais clientWidth est plus sûr.
    const scrollDistance = carouselContainer.clientWidth; 

    // --- Fonction pour le bouton 'Suivant' ---
    nextBtn.addEventListener('click', () => {
        // Utilisation de scrollBy pour défiler, ce qui peut prendre en compte le défilement fluide
        carouselContainer.scrollBy({
            left: scrollDistance, // Déplace vers la droite
            behavior: 'smooth'    // Force un défilement fluide
        });
    });

    // --- Fonction pour le bouton 'Précédent' ---
    prevBtn.addEventListener('click', () => {
        carouselContainer.scrollBy({
            left: -scrollDistance, // Déplace vers la gauche
            behavior: 'smooth'     // Force un défilement fluide
        });
    });
    
    // NOTE sur le bouton "Retour en Haut" :
    // S'il ne fonctionne pas, il faut vérifier :
    // 1. La présence de <header id="top"> dans index.html.
    // 2. La présence de html { scroll-behavior: smooth; } dans global.css.
    // L'ajout de 'behavior: smooth' ci-dessus est pour le carrousel uniquement.
});