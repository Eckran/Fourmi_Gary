
class Simulation {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Simulation.onReady")
    }
    get Size() {
        return parseInt($("input:radio[name='size']:checked").val())
    }

    get NbStep() {
        return parseInt($("#NbSteps").val())
    }

    get interval(){
        return parseInt($("#Interval option:selected").text())
    }
}
