
import { Entite } from "./Entite.js";

/**
 *  représente les ennemis de base du jeu
 */
export class Cauchemar extends Entite
{
    constructor(vitesse, vitesseMax, nom, position, scene, nomModele, scale,  patrolPoints = [])
    {
        super(vitesse, vitesseMax, nom, position, scene, false, nomModele, scale);
        this.nav = scene.navigationPlugin;
        this.patrolPoints = patrolPoints;
        this.currentPatrolIndex = 0;
        this.hasTarget = false;
        this.lastSeenPlayerTime = null;
        this.player = null;
    }


    creerAnimations(animationGroups)
    {
        this.idle = animationGroups.find(group => group.name === "skeleton-skeleton|idle");
        this.walk = animationGroups.find(group => group.name === "skeleton-skeleton|run");
        this.attack = animationGroups.find(group => group.name === "skeleton-skeleton|attack");
        this.spawn = animationGroups.find(group => group.name === "skeleton-skeleton|spawn");
        let agentParams = {
            radius: 0.5,
            height: 1.8,
            maxSlope: 45,
            maxSpeed: 12,
            maxAcceleration: 20,
            updatePosition: true,
            updateRotation: true,
            position: this.position.clone(),
            scene: this.scene
        };
        this.transformNode = new BABYLON.TransformNode();
        this.agentIdx = this.crowd.addAgent(this.mesh.position.clone(), agentParams, this.transformNode);

    }

    update(playerPos = null) {
        if(!this.mesh) return;

        const now = performance.now();
        const agentPos = this.crowd.getAgentPosition(this.agentIdx);

        if (this.shouldChasePlayer(agentPos, playerPos)) {
            const pathTarget = this.nav.getClosestPoint(playerPos);
            this.crowd.agentGoto(this.agentIdx, pathTarget);
            this.hasTarget = true;
            this.lastSeenPlayerTime = now;
        } else if (this.hasTarget && now - this.lastSeenPlayerTime > 5000) {
            // Oublier le joueur après 5 secondes
            this.hasTarget = false;
            this.gotoNextPatrol(agentPos);
        } else {
            this.gotoNextPatrol(agentPos);
        }
        


        // --- Déplacement + Animation ---
        const agentVelocity = this.crowd.getAgentVelocity(this.agentIdx);
        const speed = agentVelocity.length();

        // Animation en fonction de la vitesse
        if (speed > 0.05) {
            if (this.idle && this.walk) {
                this.idle.stop();
                if (!this.walk.isPlaying) this.walk.start(true);
            }

            // Orientation du mesh dans la direction du mouvement
            const angle = Math.atan2(agentVelocity.x, agentVelocity.z);
            const quaternion = BABYLON.Quaternion.FromEulerAngles(0, angle, 0);
            this.mesh.rotationQuaternion = quaternion;

        } else {
            if (this.walk && this.idle) {
                this.walk.stop();
                if (!this.idle.isPlaying) this.idle.start(true);
            }
        }

        // Synchroniser la position
        this.mesh.position.copyFrom(agentPos);
        this.hitbox.position.copyFrom(agentPos);
    }

    shouldChasePlayer(agentPos, playerPos) {
        if (!playerPos) return false;
        const dist = BABYLON.Vector3.Distance(agentPos, playerPos);
        return dist < 40; // distance de détection
    }

    gotoNextPatrol(agentPos) {
        const target = this.nav.getClosestPoint(this.patrolPoints[this.currentPatrolIndex]);
        this.currentDestination = target; 
        this.crowd.agentGoto(this.agentIdx, target);
    
        if (this.reachedPatrolPoint(agentPos)) {
            this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
        }
    }

    reachedPatrolPoint(agentPos) {
        return BABYLON.Vector3.Distance(agentPos, this.currentDestination) < 1;
    }
    

    
}
