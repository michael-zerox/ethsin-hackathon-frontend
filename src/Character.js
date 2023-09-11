export default class Character {
  constructor({
    name,
    imageFront,
    imageBack,
    tokenId,
    level,
    health,
    damage,
    exp,
    size,
    chainLink
  }) {
    this.name = name;
    this.imageFront = imageFront;
    this.imageBack = imageBack;
    this.size = size;
    this.tokenId = tokenId;
    this.level = level;
    this.health = health;
    this.damage = damage;
    this.exp = exp;
    this.chainLink = chainLink;
  }

  attack(target, logAction) {
    // Implement the logic for character's ability here
    // For simplicity, let's assume it decreases target's health
    const damageDealt = this.damage;
    if (Array.isArray(target)) {
      const logs = [];
      target.forEach((t) => {
        if (damageDealt >= t.health) {
          // Ensure health doesn't go negative
          t.health = 0;
        } else {
          t.health -= damageDealt;
          logs.push({ attacker: this, target: t, isNew: true });
        }
      });
      logAction(logs);
    } else {
      if (damageDealt >= target.health) {
        // Ensure health doesn't go negative
        target.health = 0;
      } else {
        target.health -= damageDealt;
        logAction([{ attacker: this, target, isNew: true }]);
      }
    }
  }

  gainExp(exp) {
    if (this.exp + exp >= 100) {
      this.level += 1;
      this.damage += this.damage * 0.05;
      this.exp = this.exp + exp - 100;
    } else {
      this.exp += exp;
    }
  }
}
