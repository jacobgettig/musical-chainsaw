Source.prototype.getMaxHarvesters = function ()
{
    var result = 0;
    var area = this.room.lookForAtArea(LOOK_TERRAIN, Math.min(Math.max(this.pos.y - 1, 0), 49), Math.min(Math.max(this.pos.x - 1, 0), 49), Math.min(Math.max(this.pos.y + 1, 0), 49), Math.min(Math.max(this.pos.x + 1, 0), 49), true);

    area.forEach(function(p) {
        if ( !(p.x === this.pos.x && p.y === this.pos.y) && p.terrain != 'wall')
        {
            result++;
        }
    }, this);
    
    return result;
};

Source.prototype.getHarvesters = function() {
    return this.room.memory.sources[this.id].harvesters
}

Source.prototype.addHarvester = function() {
    this.room.memory.sources[this.id].harvesters++
}

Source.prototype.subHarvester = function() {
    this.room.memory.sources[this.id].harvesters--
}