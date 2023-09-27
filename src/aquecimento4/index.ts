import trainGraphics from "./trainGraphics"
//
// HTML Elements and Constants
//
const e4_1 = {
    output: [
        document.getElementById("1_output_y(x)") as HTMLOutputElement,
        document.getElementById("1_output_y(t)x(t)") as HTMLOutputElement,
    ]
}

//
// Questão 1
//
trainGraphics(e4_1.output);