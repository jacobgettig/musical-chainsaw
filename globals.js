global.ROLES = {
    BOOT: function(creep) {
        if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity && !creep.memory.moving)
        {
            Game.getObjectById(creep.memory.source).subHarvester()
            creep.memory.moving = true
            creep.say('working')
            if (!Game.getObjectById(creep.memory.site))
            {
                var site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
                if (site)
                {
                    creep.memory.site = site.id;
                }
            }
        }
        else if (creep.carry[RESOURCE_ENERGY] == 0 && creep.memory.moving)
        {
            creep.memory.moving = false
            creep.say('harvesting')
            if (creep.memory.source != undefined)
            {
                Game.getObjectById(creep.memory.source).addHarvester();
            }
        }
        
        if (creep.memory.moving == false)
        {
            var source = creep.findSource()
            if (!creep.memory.source)
            {
                creep.memory.source = source.id
                source.addHarvester();
            }
            else if (creep.memory.source != source.id)
            {
                Game.getObjectById(creep.memory.source).subHarvester()
                creep.memory.source = source.id
                source.addHarvester();
            }
            
            var source = Game.getObjectById(creep.memory.source)
            if (creep.pos.isNearTo(source))
            {
                var harvest = creep.harvest(source);
                if (harvest != OK)
                {
                    console.log("Harvesting Error in room " + creep.room.name + ": " + harvest)
                }
            }
            else
            {
                creep.moveTo(source)
            }
        }
        else if (creep.memory.moving)
        {
            if (creep.room.energyAvailable >= 2/3 * creep.room.energyCapacityAvailable)
            {
                var struct = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
                if (struct && creep.room.controller.ticksToDowngrade > 200)
                {
                    
                    if (creep.memory.site) {
                        var target = Game.getObjectById(creep.memory.site);
                        
                        
                        if (creep.pos.inRangeTo(target, 3))
                        {
                            var build = creep.build(target)
                            if (build != OK)
                            {
                                console.log("Building Error in room " + creep.room.name + ": " + build)
                            }
                        }
                        else
                        {
                            creep.moveTo(target)
                        }
                    }
                    else
                    {
                        creep.memory.site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES).id;
                    }
                }
                else
                {
                    var controller = creep.room.controller;
                    
                    if (creep.pos.inRangeTo(controller, 3))
                    {
                        var upgrade = creep.upgradeController(controller);
                        if (upgrade != OK)
                        {
                            console.log("Upgrading Error in room " + creep.room.name + ": " + upgrade)
                        }
                    }
                    else
                    {
                        creep.moveTo(controller)
                    }
                }
            }
            else
            {
                var struct = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => {
                        return((s.structureType == STRUCTURE_SPAWN || s.structuretype == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity)
                    }
                })[0]
                if (struct)
                {
                    
                    if (creep.pos.isNearTo(struct))
                    {
                        var transfer = creep.transfer(struct, RESOURCE_ENERGY);
                        if (transfer != OK)
                        {
                            console.log("Transfer Error in room " + creep.room.name + ": " + transfer)
                        }
                    }
                    else
                    {
                        creep.moveTo(struct)
                    }
                }
            }
        }
    },
        
    HRV: function(creep) {
        if (!creep.memory.source)
        {
            var sources = creep.room.findOpenSources();
            if (sources)
            {
                creep.memory.source = sources[0];
                creep.room.memory.sources[sources[0]].static = true;
            }
            else
            {
                console.log("Harvesting Error in room " + creep.room.name + ": No open sources")
            }
        }
        else
        {
            var container = Game.getObjectById(Game.getObjectById(creep.memory.source).room.memory.sources[creep.memory.source].container)
            if (creep.memory.atSource)
            {
                if (container.hits < (3/4) * container.hitsMax && creep.energy > 25)
                {
                    creep.repair(container)
                }
                creep.harvest(Game.getObjectById(creep.memory.source))
            }
            else
            {
                var harvest = creep.harvest(Game.getObjectById(creep.memory.source))
                
                if(creep.pos.isEqualTo(container))
                {
                    var harvest = creep.harvest(Game.getObjectById(creep.memory.source))
                    if (harvest != OK)
                    {
                        console.log("Harvesting Error in room " + creep.room.name + ": " + harvest)
                    }
                    else
                    {
                        creep.memory.atSource = true
                    }
                }
                else
                {
                    creep.moveTo(container)
                }
            }
        }
    },
    
    MULE: function(creep) {
        if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity && !creep.memory.moving)
        {
            creep.memory.moving = true
            creep.say('hauling')
            
        }
        else if (creep.carry[RESOURCE_ENERGY] == 0 && creep.memory.moving)
        {
            creep.memory.moving = false
            creep.say('fetching')
        }
        
        if (creep.memory.moving)
        {
            
        }
        else
        {
            if (!creep.memory.container)
            {
                var container = creep.room.getEnergyContainers()[0]
                container = Game.getObjectbyId(container)
                creep.memory.take = container.modify(creep.carryCapacity-_.sum(creep.carry))
            }
                    
            if (creep.pos.isNearTo(struct))
            {
                var transfer = creep.transfer(struct, RESOURCE_ENERGY);
                if (transfer != OK)
                {
                    console.log("Transfer Error in room " + creep.room.name + ": " + transfer)
                }
            }
            else
            {
                creep.moveTo(struct)
            }
        }
    }
}

global.BODY = {
    HRV: {
        2: [MOVE,CARRY,WORK,WORK,WORK,WORK],
        3: [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
        4: [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
        5: [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
        6: [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
        7: [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
        8: [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK]
    },
    
    MULE: {
        2: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],
        3: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],
        4: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK],
        5: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK],
        6: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK],
        7: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK],
        8: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK]
    },
    
    BLD: {
        2: [MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK],
        3: [MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        4: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        5: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        6: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        7: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        8: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK]
    },
    
    RPR: {
        2: [MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK],
        3: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK],
        4: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        5: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        6: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        7: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK],
        8: [MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK]
    },
    
    DEF: {
        2: undefined,
        3: [MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK],
        4: [MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK],
        5: [MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK],
        6: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,HEAL],
        7: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,HEAL],
        8: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,HEAL]
    },
    
    RSV: {
        2: undefined,
        3: [MOVE,CLAIM],
        4: [MOVE,CLAIM],
        5: [MOVE,CLAIM,MOVE,CLAIM],
        6: [MOVE,CLAIM,MOVE,CLAIM],
        7: [MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM],
        8: [MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM]
    }
}










































