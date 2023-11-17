export function Page(){
    return <>
        <h1>Interpolação linear <br/> 1D, 2D e 3D</h1>
        <section>
            <p>
                Considere uma função \(f(x)\) cujos valores \(f(x_i)\) são conhecidos somente nos pontos \(x_i\), \(i = 0,1,2,...,n\). Entre dois pontos consecutivos (\(x_i, f(x_i)\)) e (\({`x_{i+1}, f(x_{i+1})`}\) ) é possível traçar uma reta \(g_i(x)\) cuja equação é: \[{`g_i(x) = f(x_i)+(x-x_i)\\frac{f(x_{i+1})-f(x_i)}{ x_{i+1}-x_i }`}\]
            </p><p>
                A tabela a seguir mostra as coordenadas dos pontos cheios do gráfico. Utilize interpolações lineares para determinar as coordenadas dos pontos vazios, que dividem em três partes iguais os intervalos em \(x\) entre os pontos cheios.
            </p>
        </section><section>
            <p>
                No caso bidimensional, o valor interpolado \({`g_{ij}(x, y)`}\) da função no ponto de interesse é a média dos valores da função nos 4 pontos conhecidos que o cercam, ponderados pelo complemento da distância até eles:
            </p><p>
                Fazendo \({`p = \\frac{x-x_i}{x_{i+1}-x_i}`}\) e \({` q = \\frac{y - y_j}{y_{j+1}-y_j} `}\) obtemos: \[{`\\begin{split}
                    g_{ij}(x,y) &= (1-p)(1-q)f(x_i, y_j)\\\\
                    &+ p(1-q)f(x_{i+1}, y_j)\\\\
                    &+ (1-p)qf(x_i, y_{j+1})\\\\
                    &+ pqf(x_{i+1}, y_{j+1})
                \\end{split}`}\]
            </p><p>
                Imagine uma "ilha" quadrada de 20 km × 20 km, sobre a qual você tem medidas de altitude feitas em uma malha 5 × 5. A figura a seguir mostra, em preto, os valores medidos da altitude, e em cinza valores interpolados, em metros. Reproduza a figura.
            </p>
        </section>
    </>;
}