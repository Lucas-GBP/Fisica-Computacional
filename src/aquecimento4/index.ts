import trainGraphics from "./trainGraphics"
import inclinedPlane from "./inclinedPlane";
import waveSumsGraph from "./wavesums";
//
// HTML Elements and Constants
//
const e4_1 = {
    output: [
        document.getElementById("1_output_y(x)") as HTMLOutputElement,
        document.getElementById("1_output_y(t)x(t)") as HTMLOutputElement,
    ]
}
const e4_2 = {
    output: document.getElementById("2_output") as HTMLOutputElement
}
const e4_3 = {
    output: document.getElementById("3_output") as HTMLOutputElement
}


// Questão 1
trainGraphics(e4_1.output);

//Questão 2
inclinedPlane(e4_2.output);

//Questão 3
waveSumsGraph(e4_3.output);