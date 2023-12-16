import { Data } from "plotly.js";
import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { arrayRange } from "../../scripts/arrayManipulation";
import { calculateFda, calculateProbabilityDistribution, returnStatics } from "../../scripts/statistics";
import { N, random137C } from "../../scripts/eletromagnetismo";

export function Page(){
    const [grathBRho, setGrathBRho] = useState<Data>({});
    const [grathE, setGrathE] = useState<Data>({});
    const [grathFda, setGrathFda] = useState<Data>({});
    const [grathProb, setGrathProb] = useState<Data>({});
    const E = useRef<number[]>([]);
    const fda = useRef<number[]>([]);
    const energyEspectrum = useRef<number[]>([]);

    const genRandom = () => {
        const randNumbers = random137C(100000);

        const statistics = returnStatics(E.current[0], E.current[E.current.length-1], E.current[E.current.length-1]/E.current.length, randNumbers);

        setGrathProb(
            {x:E.current, y:statistics, type:"bar"}
        );

    };

    useEffect(() => {
        const B_rho = arrayRange(0, 4000, 1);
        E.current = arrayRange(0, 800, 1);
        energyEspectrum.current = E.current.map((e) => {
            const a_0 = -1630;
            const a_1 = 200;

            const B_rho = a_0 +a_1*Math.sqrt(e);
            return N(B_rho);
        });
        fda.current = calculateFda(calculateProbabilityDistribution({x:E.current,y:energyEspectrum.current}));

        setGrathBRho({
            x:B_rho,
            y:B_rho.map((i) => {
                return N(i);
            })
        })
        setGrathE({
            x:E.current,
            y:energyEspectrum.current
        })
        setGrathFda({
            x:E.current, 
            y:fda.current
        })

        console.log(E.current);
        console.log(energyEspectrum.current);
        console.log(fda.current);
        console.log("");
    }, []);

    return <>
        <h1>Espectro de elétrons do 137Cs</h1>
        <section>
            <p>
                A figura abaixo mostra o espectro de elétrons emitidos no decaimento do 137Cs medido por Y. Yoshizawa em 1957 (Nucl. Phys. 5 (1958), p. 122-140). Trata-se de um decaimento complexo, que inclui elétrons produzidos por decaimentos \(\beta\) de baixa energia (até 514 keV, 92%) e de alta energia (até 1175 keV, 8%) do 137Cs, e elétrons de conversão emitidos pelas camadas \(K\), \(L\) e \(M\) do 137Ba. A contribuição dos elétrons do decaimento \(\beta\) de alta energia é pequena demais para ser vista nesta figura, mas o artigo original traz outros detalhes e figuras para os interessados.
            </p>
            <img 
                style={{maxWidth:"90%", margin:"auto"}}
                alt="grafico-experimental" 
                src="/momentum_spectrum_of_beta_rays_of_Cs127.png"
            />
            <Plot
                layout={{
                    xaxis:{
                        title:"B_rho (G.cm)"
                    }
                }}
                data={[grathBRho]}
            />
            <p>
                O eixo horizontal da figura traz a grandeza \(B_\rho\), onde \(B\) é o campo magnético do espectrômetro, medido em gauss (G) e \(\rho\) é o raio de curvatura da trajetória da partícula através dele, medido em centímetros (cm). Esta grandeza esta relacionada à energia \(E\) e à carga \(q\) e massa \(m\) da partícula segundo:
                \[{`B_\\rho = \\frac{\\sqrt{2m}}{q}\\sqrt{E} \\propto v \\propto p`}\]
            </p><p>
                Note que a raiz quadrada da energia cinética é proporcional à velocidade da partícula e, portanto, proporcional ao momento \(p\). Por isso esse tipo de gráfico é chamado de "espectro de momento" das partículas.
            </p><p>
                Este espectro pode ser representado, em primeira aproximação, por quatro funções simples: um seno ao quadrado para a região da "colina" e três gaussianas para os três "picos" bem definidos. Nesta aproximação, fazendo a variável \(B_\rho = x\), o número de partículas em função de pode ser expresso por:\[{`
                    N(x) = S_1 \\sin^2(kx) + G_1 e^{-\\frac{(x-x_1)^2}{2\\sigma^2_1}} + G_2 e^{-\\frac{(x-x_2)^2}{2\\sigma^2_2}} + G_3 e^{-\\frac{(x-x_3)^2}{2\\sigma^2_3}}
                `}\]
            </p><p>
                \(S_1 = 0,7\) e \(k = 2\pi/6300 (G\cdot cm)^{"{-1}"}\) reproduzem razoavelmente bem a "colina"; \(G_1 = 5,3\), \(G_2 = 1,0\) \(G_3 = 0,3\) \(x_1 = 3370 G\cdot cm\), \(x_2 = 3480 G\cdot cm\) e \(x_3 = 3520 G\cdot cm\), e \(\sigma_1 = 14 G\cdot cm\), \(\sigma_2 = 10 G\cdot cm\) e \(\sigma_3 = 7 G\cdot cm\) reproduzem razoavelmente bem os três picos.
            </p><p>
                O próximo passo é converter essa informação de "espectro de momento" para "espectro de energia". Isso pode ser feito utilizando a relação entre e , e alguns dados fornecidos no artigo, que levam a: \[{`\\begin{split}
                    B_\\rho = a_0 + a_1\\sqrt{E} \\\\
                    a_0 = -1630 G\\cdot cm \\\\
                    a_1 = 200 G\\cdot cm/\\sqrt{keV}
                \\end{split}`}\]
            </p>
        </section><section>
            <p>
                As figuras abaixo mostram o gráfico para o espectro acima expresso em função da energia (que é muito semelhante, mas não igual ao do momento: as estruturas ficam levemente assimétricas) o gráfico da função distribuição acumulada (\(fda(E)\)).
            </p>
            <Plot layout={{
                xaxis:{
                    title:"E (keV)"
                }
            }} data={[grathE]}/>
            <Plot layout={{
                xaxis:{
                    title:"E (keV)"
                },
                yaxis:{
                    title:"fda(E)"
                }
            }} data={[grathFda]}/>
        </section><section>
            <p>
                De posse da \(fda(E)\) podemos sortear números que obedeçam a uma distribuição uniforme (entre 0 e 1, com igual probabilidade) e utilizá-lo para buscar a energia da partícula sorteada. Por exemplo, se o número sorteado for próximo de 0,2, a energia da partícula será próxima a 210 keV; se o número sorteado for próximo de 0,6, a energia da partícula será próxima de 350 keV. A figura a seguir mostra um espectro de energia simulado com o 10 mil sorteios.
            </p>
            <Plot 
                layout={{
                    xaxis:{
                        title:"E (keV)",
                        range:[0, 800]
                    },
                    yaxis:{
                        range:[0, 2500]
                    }
                }} 
                data={[grathProb]}
            /><br/>
            <button onClick={genRandom}>Gerar Numeros Aleatórios</button>
        </section>
    </>;
}