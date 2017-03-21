StructureContainer.prototype.modify = function(takeAmount)
{
    if (-takeAmount > this.memory.energy)
    {
        takeAmount = -this.memory.energy
    }
    this.memory.modifier += takeAmount
    return takeAmount
}