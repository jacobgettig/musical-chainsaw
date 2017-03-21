StructureSpawn.prototype.bootstrap = function() {
    if (this.room.checkEmpty())
    {
        this.createCreep([MOVE,CARRY,WORK], undefined, {role: "BOOT", moving: false})
    }
}

StructureSpawn.prototype.spawn = function() {
    
}