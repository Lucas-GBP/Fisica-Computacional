import Plot from "react-plotly.js"
import { average, leastSquares, stdDeviation } from "../../scripts/statistics"

const data = [
    {
        x: [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5],
        y: [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68]
    },
    {
        x: [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5],
        y: [9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74]
    },
    {
        x: [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5],
        y: [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73]
    },
    {
        x: [8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8],
        y: [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.50, 5.56, 7.91, 6.89]
    }
]

export function Page(){

    return <>
        <h1>Ajuste de retas por mínimos quadrados</h1>

        <section>
            <p>
                Considere o gráfico a seguir, que contém um conjunto de pontos experimentais, com incertezas ("barras de erro"), e uma reta e um conjunto de pontos calculados de acordo com algum modelo que assume uma relação linear entre \(x\) e \(y\).
            </p><p>
                Indicados no gráfico também estão as "distâncias" \(y_i-y^{"{\\text{mod}}"}_i\) entre os pontos experimentais \(y_i\) e os pontos \(y^{"{\\text{mod}}"}_i\) calculados com o modelo para cada \(x_i\).
            </p><p>
                Um indicador conveniente que expressa a distância entre o modelo e os dados é o \(X^2\), definido como a soma dos quadrados das diferenças entre os valores experimentais e os calculados com o modelo, dividido pela incerteza \(\sigma\):
                \[X^2 = \sum_i{`\\left(`}\frac{"{y_i-y^{\\text{mod}}_i}"}{"{\\sigma_i}"}{`\\right)`}^2\]
            </p><p>
                Este indicador tem duas características convenientes: (1) o "ao quadrado" faz com que todos os termos da soma sejam positivos, evitando que diferenças a maior ou a menor entre os valores dos dados e do modelo cancelem-se total ou parcialmente e (2) a divisão pela incerteza faz com que pontos com incerteza relativamente maior tenham menos peso no resultado do que pontos com incerteza relativamente menor.
            </p><p>
                A melhor reta será aquela que minimiza este indicador e sabemos, do cálculo diferencial, como encontrar o mínimo desse indicador. Os valores de \(y^{"\\text{mod}"}_i\) podem ser computados com a expressão para o modelo:
                \[y^{"\\text{mod}"}_i = A + B x_i\]
            </p><p>
                Substituindo esta expressão na expressão \(X^2\) para obtemos: \[{`X^2=\\sum_i\\left(\\frac{y_i-A-Bx}{\\sigma_i}\\right)^2`}\]
            </p><p>
                Os valores de \(A\) e \(B\) que minimazam este indicador podem ser encontrados calculando-se as derivadas parciais com relação a \(A\) e \(B\) e igualando-as a zero: \[{`\\begin{split}
                    \\frac{\\partial X^2}{\\partial A} &= -2\\sum_i\\frac{(y_i-A-Bx_i)}{\\sigma_i^2} = 0\\\\
                    \\frac{\\partial X^2}{\\partial B} &= -2\\sum_i\\frac{(y_i-A-Bx_i)x_i}{\\sigma_i^2} = 0
                \\end{split}`}\]
            </p><p>
                Distribuindo as somatórias e rearranjando os termos ficamos com: \[{`\\begin{split}
                    \\sum_i\\frac{y_i}{\\sigma_i^2} &= A\\sum_i\\frac{1}{\\sigma_i^2}+B\\sum_i\\frac{x_i}{\\sigma_i^2}\\\\
                    \\sum_i\\frac{x_iy_i}{\\sigma_i^2} &= A\\sum_i\\frac{x_i}{\\sigma_i^2}+B\\sum_i\\frac{x_i^2}{\\sigma_i^2}
                \\end{split}`}\]
            </p><p>
                Cada uma das somatórias nas expressões acima são simples quantidades (números, tipo 3,18 etc.). Talvez uma simplificação na notação deixe isso mais claro. Se: \[{`\\begin{split}
                    S &= \\sum_i\\frac{1}{\\sigma_i^2} \\\\
                    S_x &= \\sum_i\\frac{x_i}{\\sigma_i^2} \\\\
                    S_y &= \\sum_i\\frac{y_i}{\\sigma_i^2} \\\\
                    S_{x^2} &= \\sum_i\\frac{x_i^2}{\\sigma_i^2} \\\\
                    S_{xy} &= \\sum_i\\frac{x_iy_i}{\\sigma_i^2} \\\\
                \\end{split}`}\]
            </p><p>
                Então: \[{`\\begin{split}
                    S_y &= AS+BS_x \\\\
                    S_{xy} &= AS_x + BS_{x^2}
                \\end{split}`}\]
            </p><p>
                As incertezas em \(A\) e \(B\) podem ser associadas à sua variância. A variância no valor de qualquer função é dada por: \[\sigma_f^2 = \sum_i \sigma_i^2 \left({`\\frac{\\partial f}{\\partial y_i}`}\right)^2\]
            </p><p>
                Para a reta, as derivadas de \(A\) e \(B\) com relação a \(y_i\) são: \[{`\\begin{split}
                    \\frac{\\partial A}{\\partial y_i} &= \\frac{S_{x^2}-S_x x_i}{\\sigma_i^2(SS_{x^2}-(S_x)^2)} \\\\
                    \\frac{\\partial B}{\\partial y_i} &= \\frac{S_{x_i}-S_x}{\\sigma_i^2(SS_{x^2}-(S_x)^2)} \\\\
                \\end{split}`}\]
            </p><p>
                Fazendo os somatórios, temos: \[{`\\begin{split}
                    \\sigma_A^2 &= \\frac{S_{x^2}}{SS_{x^2}-(S_x)^2} \\\\
                    \\sigma_B^2 &= \\frac{S}{SS_{x^2}-(S_x)^2}
                \\end{split}`}\]
            </p><p>
                Se as incertezas \(\sigma_i\) das medidas não são conhecidas, fazemos \(\sigma_i = 1\) em todas as equações, o que faz com que \(S = \sum_i 1/\sigma_i^2 = N\) (o número de dados) e multiplicamos os valores encontrados para \(\sigma_A\) e \(\sigma_B\) por \({`\\sqrt{X^2/(N-2)}`}\), onde \(X^2\), definido acima.
            </p><p>
                Podemos escrever \(x\) como função de \(y\) também como uma reta com coeficientes \({`A^{'}`}\) e \({`B^{'}`}\) dados por: 
                \[{`\\begin{split}
                    y &= A + Bx\\\\
                    x = -\\frac{A}{B}+\\frac{1}{B}y
                \\end{split}`}\]
                \[{`\\begin{split}
                    A^{'} &= -\\frac{A}{B} \\\\
                    B^{'} &= \\frac{1}{B}
                \\end{split}`}\]
                \[{`\\begin{split}
                    x = A^{'} + B^{'}y
                \\end{split}`}\]
            </p><p>
                A partir do fato de que \({`BB^{'} = 1`}\), o coeficiente de correlação \({`R = \\sqrt{BB^{'}}`}\), cujo valor, no caso ideal, é 1, pode ser escrito em termos das somatórias: \[{`
                    R = \\frac{ NS_{xy}-S_xS_y }{ \\sqrt{(NS_{x^2}-S_x^2)(NS_{y^2}-S_y^2)} }
                `}\]
            </p><p>
                Em 1973 Francis Anscombe publicou um artigo (Graphs in Statistical Analysis, The American Statistician, Vol. 27, Issue 1, p. 17-21) em que apresenta quatro conjuntos de dados, cada um com 11 pontos. Até duas casas decimais, os 4 conjuntos de dados apresentam as mesmas médias e variâncias para os valores de e de , a mesma correlação e os mesmos coeficientes para o ajuste de uma reta pelo método dos mínimos quadrados.
            </p><p>
                Para mais informações, sugerimos a página sobre o assunto na Wikipdia (https://en. wikipedia.org/wiki/Anscombe%27s_quartet) e um interessante artigo que estende essas possibilidades virtualmente para o infinito (https://www.autodesk.com/research/publicat ions/same-stats-different-graphs).
            </p><p>
                Esses conjuntos de dados são frequentemente utilizados para enfatizar a importância de observar o gráfico dos dados antes de assumir que o seu resumo estatístico de fato os representa (cada vez mais necessário nessa era de "algoritmos", "AI" etc.), e são mostrado a seguir.
            </p>
        </section><section>
            <PlotGraphics/>
        </section><section>
            <p>
                A sua missão é fazer os gráficos dos conjuntos de Anscomb, calcular os seus indicadores estatísticos (médias e desvios padão das duas variáveis) e os coeficientes das retas ajustadas e o coeficiente de correlação com o seu próprio método dos mínimos quadrados (pode ser na sua versão básica, sem incluir as incertezas).
            </p><p>
                Nas tabelas acima, os valores de \(\sigma_x\) (e, semelhantemente, \(\sigma_yu\)) foram calculados utilizando a definição usual de desvio padrão: \[{`\\sigma_x = \\sqrt{\\frac{ \\sum_{i = 1}^N (x_i-\\bar{x})^2 }{N-1}}`}\]
            </p><p>
                A parte deste documento sobre o método dos mínimos quadrados segue em grande medida a linha de raciocínio e a notação utilizadas no capítulo sobre modelagem de dados em um dos livros mais clássicos sobre métodos numéricos, Numerical Recipes: The Art o Scientific Computing, 3rd. Edition (2007), de W. H. Press, S. A. Teukolsky, W. T. Wetterling, B. P. Flannary, da Cambridge University Press, disponível online em http://numerical.recipes.
            </p>
        </section>
    </>
}

function PlotGraphics(){
    return <>
        {data.map((element, index) => {
            const line = {
                x_avr: average(element.x),
                y_avr: average(element.y),
                sigma_x: stdDeviation(element.x),
                sigma_y: stdDeviation(element.y),
                ...leastSquares(element.x, element.y)
            };        

            return <div key={index}>
                <table>
                    <tbody>
                        <tr><th>Grandeza</th><th>Valor</th></tr>
                        <tr><td>\({`\\bar{x} =`}\)</td><td>{line.x_avr.toFixed(2)}</td></tr>
                        <tr><td>\({`\\bar{y} =`}\)</td><td>{line.y_avr.toFixed(2)}</td></tr>
                        <tr><td>\({`\\sigma_x =`}\)</td><td>{line.sigma_x.toFixed(2)}</td></tr>
                        <tr><td>\({`\\sigma_y =`}\)</td><td>{line.sigma_y.toFixed(2)}</td></tr>
                        <tr><td>\({`A =`}\)</td><td>{line.A?.toFixed(2)}</td></tr>
                        <tr><td>\({`B =`}\)</td><td>{line.B?.toFixed(2)}</td></tr>
                        <tr><td>\({`R =`}\)</td><td>{line.R?.toFixed(2)}</td></tr>
                    </tbody>
                </table>
                <Plot
                    data={[
                        {
                            x:[0, 20],
                            y:[line.A!, (line.A!+20*line.B!)],
                            type:"scatter",
                            mode:"lines",
                            name: "Regressão Linear"
                        },{
                            x:element.x,
                            y:element.y,
                            type: "scatter",
                            mode: 'markers',
                            name: "Pontos"
                        }
                    ]}
                    layout={{
                        xaxis:{range: [0,20]},
                        yaxis:{range: [0,15]},
                    }}
                />
            </div>
        })}
    </>
}