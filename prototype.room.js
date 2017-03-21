Room.prototype.checkEmpty = function() {
    creeps = this.find(FIND_MY_CREEPS).length
    if ((this.controller.level > 1 && creeps == 0) || (this.controller.level < 2 && creeps < 3))
    {
        return true;
    }
    else
    {
        return false;
    }
}

Room.prototype.initSources = function() {
    var sources = this.find(FIND_SOURCES)
    this.memory.sources = {}
    for (i in sources)
    {
        var container = sources[i].pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (s) => {
                s.structureType == STRUCTURE_CONTAINER
            }
        })[0]
        sources[i] = sources[i].id
        this.memory.sources[sources[i]] = {}
        this.memory.sources[sources[i]].harvesters = 0
        if (container)
        {
            this.memory.sources[sources[i]].container = container.id
        }
    }
}

Room.prototype.findSources = function() {
    var sources = this.find(FIND_SOURCES)
    if (!this.memory.sources)
    {
        this.memory.sources = {}
        for (i in sources)
        {
            var container = sources[i].pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (s) => {
                    s.structureType == STRUCTURE_CONTAINER
                }
            })[0]
            sources[i] = sources[i].id
            this.memory.sources[sources[i]] = {}
            this.memory.sources[sources[i]].harvesters = 0
            if (container)
            {
                this.memory.sources[sources[i]].container = container.id
            }
        }
    }
    else
    {
        for (i in sources)
        {
            sources[i] = sources[i].id
        }
    }
    return (sources)
}

Room.prototype.findOpenSources = function() {
    var sources = this.find(FIND_SOURCES, {
        filter: (s) => {
            return (!this.memory.sources[s.id].static);
        }
    })
    for (i in sources)
    {
        sources[i] = sources[i].id
    }
    if (sources)
    {
        return (sources)
    }
    else
    {
        return ("ERROR")
    }
}

Room.prototype.findSourceContainers = function() {
    var containers = []
    for (i in this.memory.sources)
    {
        if (this.memory.sources[i].container)
        {
            containers.push(this.memory.sources[i].container)
        }
    }
    return containers
}

Room.prototype.getEnergyContainers = function() {
    var containers = this.findSourceContainers()
    for (i in containers)
    {
        var container = Game.getObjectById(containers[i])
        if (container.memory.energy > 200)
        {
            containers.splice(i, 1)
        }
    }
    return containers
}

Room.prototype.updateEnergyContainers = function()
{
    var containers = this.getEnergyContainers()
    for (i in containers)
    {
        var container = Game.getObjectById(containers[i])
        container.memory.energy = container.store[RESOURCE_ENERGY] - container.memory.modifier
    }
}

Room.prototype.updateStore = function()
{
    
}




















































