// On charge les informations utiles

const statut = document.querySelector("h2") // Pour chercher notre balise
let jeuActif = true //Pour savoir si on joue pas
let joueurActif = "X" // Le joueur actif utilise ce symbole pour jouer
let etatJeu = ["", "", "", "", "", "", "", "", ""] //Tableau pour les cases à remplir et avoir en mémoire l'état du jeu actuel


const conditionsVictoire = [

[0, 1, 2],
[3, 4, 5],
[6, 7, 8],    // Ce sont les combinaisons de victoire, un chiffre représente une case. 
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
]


// Messages

const gagne = () => `Le joueur ${joueurActif} est un winner !` //fonction fléché pour indiqué la victoire du joueur
const egalite = () => "Match nul !"
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}` 

statut.innerHTML = tourJoueur()

document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase)) // Cela exécutera la fonction pour cliqué sur la case

document.querySelector(".recommencer").addEventListener("click", recommencer)

function gestionClicCase(e){

    // on check en console qu'on récupère bien la cible du clic
    // console.log(e.target)
if(joueurActif === "X") {
    e.target.style.backgroundImage = "url('images/Agrafe.jpg')";
} else {
    e.target.style.backgroundImage = "url('images/Pikachu.jpg')";
}
    e.target.style.backgroundSize = "cover";
    const indexCase = parseInt(this.dataset.index) // Pour récupérer en nombre entier le numéro de la case cliqué
    console.log(indexCase)
     // On vérifie si la case est déjà remplie ou le jeu terminé
     if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }
//Ça permet de mettre le symbole du joueur actif dans la case
    etatJeu[indexCase]= joueurActif 
    this.innerHTML = joueurActif

    verifGagne()

}

// Création du fichier audio lorsqu'on clique sur une case

let beat = new Audio('/path/to/my/beat.mp3');


// va vérifier si le joueur actuel a gagner le jeu
function verifGagne(){
   let tourGagnant = false 

// Pour récuperer les conditions de victoire de la const conditionsVictoire. Une valeur est attribué pour chaque condition
   for(let conditionVictoire of conditionsVictoire){
    let val1 = etatJeu[conditionVictoire[0]]
    let val2 = etatJeu[conditionVictoire[1]]
    let val3 = etatJeu[conditionVictoire[2]]

   // Si l'une des cases est vide
  if(val1 === "" || val2 === "" || val3 === ""){
    continue // pour continuer si les conditions de victoires ne sont pas remplis
}
// Si les 3 cases sont identiques
if(val1 === val2 && val2 === val3){
    // On gagne
    tourGagnant = true
    break
}
}
// Si on a gagné la partie
if(tourGagnant){
    statut.innerHTML = gagne()
    jeuActif = false
    return
}

// Si toutes les cases sont remplies
if(!etatJeu.includes("")){
    statut.innerHTML = egalite()
    jeuActif = false 
    return 

}
// On change de playeur 
joueurActif = joueurActif === "X" ? "O" : "X" 
    statut.innerHTML = tourJoueur()



   }


// function recommencer(){
// joueurActif = "X"
// jeuActif = true
// etatJeu = ["", "", "", "", "", "", "", "", ""]
// statut.innerHTML = tourJoueur()
// document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
// }

// Elle va permettre de réinialiser le jeu
