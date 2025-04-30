/**
 * sert à afficher un timer sur la scène
 */
export class Timer
{
    static time = 0; // Temps écoulé en secondes
    static interval = null; // Intervalle pour le timer
    static #vitesse = 1; // Vitesse du timer (1 seconde par seconde par défaut)

    static startTimer()
    {
        // Démarre le timer si ce n'est pas déjà fait
        if(Timer.interval != null)
        {
            return; // Si le timer est déjà en cours, on ne fait rien
        }
        Timer.resetTimer()
        Timer.interval = setInterval(() => {
            Timer.time += 1*this.#vitesse; // Incrémente le temps de 1 seconde
            // console.log(`Temps écoulé : ${Timer.getFormattedTime()}`); // Affiche le temps écoulé dans la console
        }, 1000); // Intervalle de 1 seconde
    }

    static getTime()
    {
        // Retourne le temps écoulé en secondes
        return Timer.time;
    }

    static resetTimer()
    {
        // Réinitialise le timer à 0
        Timer.time = 0;
    }

    static getFormattedTime()
    {
        // Retourne le temps formaté en minutes et secondes
        const minutes = Math.floor(Timer.time / 60);
        const seconds = Timer.time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    static getFormattedTimeWithHours()
    {
        // Retourne le temps formaté en heures, minutes et secondes
        const hours = Math.floor(Timer.time / 3600);
        const minutes = Math.floor((Timer.time % 3600) / 60);
        const seconds = Timer.time % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    static stopTimer()
    {
        // Arrête le timer
        if(Timer.interval == null)
        {
            return; // Si le timer n'est pas en cours, on ne fait rien
        }
        clearInterval(Timer.interval); // Arrête l'intervalle
        Timer.interval = null; // Réinitialise l'intervalle
        Timer.resetTimer();
    }

    static setVitesse(vitesse)
    {
        // Définit la vitesse du timer
        Timer.#vitesse = vitesse;
    }
    static getVitesse()
    {
        // Retourne la vitesse du timer
        return Timer.#vitesse;
    }
}