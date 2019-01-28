/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
    constructor() {
        this.Pattern = new Pattern()
        this.Simulation = new Simulation()
    }
    RegisterOnReady() {
        this.Pattern.RegisterOnReady()
        this.Simulation.RegisterOnReady()

        $($.proxy(this.onReady, this))
    }
    onReady() {
        this.Grid = new Grid("Grid", this.Simulation.Size)
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY)
        this.displayAntInfo()

        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this))
        $("#Reset").on("click", $.proxy(this.resetGrid, this))
        $("#MoveForward").on("click", $.proxy(this.moveForward, this))
        $("#Start").on("click", $.proxy(this.startSim, this))
        $("#Stop").on("click", $.proxy(this.stopSim, this))

        console.log("Langton.onReady")
        console.log(this.Simulation.interval)
    }

    resetGrid() {
        this.Grid = new Grid("Grid", this.Simulation.Size)
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY)
        this.resetAntInfo()
    }

    displayAntInfo() {
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color)
        $(".ant-x").append(this.Ant.X)
        $(".ant-y").append(this.Ant.Y)
        $(".ant-direction").append(this.Ant.Direction)
        $(".ant-nb-steps").append(this.Ant.NbSteps)
    }

    resetAntInfo() {
        $(".ant-x").empty()
        $(".ant-y").empty()
        $(".ant-direction").empty()
        $(".ant-nb-steps").empty()

        this.displayAntInfo()
    }

    moveForward() {
        if(this.Ant.Direction == "Up"){
            if(this.Grid.GetColor(this.Ant.X + 1, this.Ant.Y) == "#FFFFFF"){
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, "#000000")
                this.Ant.TurnRight()
                this.resetAntInfo()
            } else {
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, "#FFFFFF")
                this.Ant.TurnLeft()
                this.resetAntInfo()
            }
        }
        else if(this.Ant.Direction == "Right") {
            if(this.Grid.GetColor(this.Ant.X , this.Ant.Y + 1) == "#FFFFFF"){
                this.Grid.SetColor(this.Ant.X , this.Ant.Y, "#000000")
                this.Ant.TurnRight()
                this.resetAntInfo()
            } else {
                this.Grid.SetColor(this.Ant.X , this.Ant.Y, "#FFFFFF")
                this.Ant.TurnLeft()
                this.resetAntInfo()
            }
        }
        else if(this.Ant.Direction == "Down") {
            if(this.Grid.GetColor(this.Ant.X - 1 , this.Ant.Y) == "#FFFFFF"){
                this.Grid.SetColor(this.Ant.X, this.Ant.Y , "#000000")
                this.Ant.TurnRight()
                this.resetAntInfo()
            } else {
                this.Grid.SetColor(this.Ant.X, this.Ant.Y , "#FFFFFF")
                this.Ant.TurnLeft()
                this.resetAntInfo()
            }
        }
        else if(this.Ant.Direction == "Left") {
            if(this.Grid.GetColor(this.Ant.X , this.Ant.Y - 1) == "#FFFFFF"){
                this.Grid.SetColor(this.Ant.X , this.Ant.Y, "#000000")
                this.Ant.TurnRight()
                this.resetAntInfo()
            } else {
                this.Grid.SetColor(this.Ant.X , this.Ant.Y, "#FFFFFF")
                this.Ant.TurnLeft()
                this.resetAntInfo()
            }
        }
    }

    startSim() {
        /*var interval = this.Simulation.interval

        if(interval = 1){
            interval = 1000
        }*/
        setInterval(() =>{
            if(this.Ant.X == 1 || this.Ant.Y == 1 || this.Ant.X == this.Simulation.Size || this.Ant.Y == this.Simulation.Size){
                console.log("stop interval")
                return
            } else {
                this.moveForward()
            }
        }, 10)

        $("#Start").hide()
        $("#Stop").show()
    }

    stopSim() {
        $("#Stop").hide()
        $("#Start").show()

        this.resetGrid()
        this.resetAntInfo()
        console.log("stop")
        return
    }
}

let langton = new Langton()
langton.RegisterOnReady()
