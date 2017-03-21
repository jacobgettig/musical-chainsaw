Creep.prototype.findSource = function() {
    return (this.pos.findClosestByRange(FIND_SOURCES, {
        filter: (s) => {
            return (s.getMaxHarvesters() != s.getHarvesters)
        }
    }))
}