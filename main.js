require("require")
misc = require('misc')

misc.init()

module.exports.loop = function() {
    for (i in Game.spawns)
    {
        Game.spawns[i].bootstrap()
        
    }
    for (i in Game.rooms)
    {
        Game.rooms[i].updateEnergyContainers()
    }
    for (i in Game.creeps)
    {
        creep = Game.creeps[i]
        ROLES[creep.memory.role](creep)
    }
    misc.flush()
}