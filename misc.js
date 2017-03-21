var misc = {
    flush: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                if (Memory.creeps[name].flag != undefined && Game.flags[Memory.creeps[name].flag])
                {
                    Game.flags[Memory.creeps[name].flag].memory.creeps--;
                }
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory');
            }
        }
    },
    
    getSpawnRooms: function() {
        var spawnRooms = []
        for (i in Game.spawns)
        {
            spawnRooms.pop(Game.spawns[i].room.name)
        }
        spawnRooms = _.uniq(spawnRooms)
    },
    
    init: function() {
        for (i in Game.spawns)
        {
            room = Game.spawns[i].room
            room.initSources()
        }
    }
}

module.exports = misc