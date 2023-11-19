import Plot from "react-plotly.js";

const PI = Math.PI;
const data = {
    interpolation1d:{
        x:[0, PI/4, PI/2, 3*PI/4, PI, 5*PI/4, 3*PI/2, 7*PI/4, 2*PI],
        f:[1, -.68, .46, -.31, .21, -.14, .09, -.06, .04]
    },
    interpolation2d:{
        x:[2, 6, 10, 14, 18],
        y:[2, 6, 10, 14, 18],
        //x:[0, 4, 8, 12, 16, 0, 4, 8, 12, 16, 0, 4, 8, 12, 16, 0, 4, 8, 12, 16, 0, 4, 8, 12, 16],
        //y:[0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 12, 12, 12, 12, 12, 16, 16, 16, 16, 16],
        h:[
            [0, 0, 0, 0, 0],
            [0, 200, 200, 400, 0],
            [0, 100, 500, 300, 0],
            [0, 400, 200, 200, 0],
            [0, 0, 0, 0, 0]
        ]
    },
    interpolation3d:{
        x:[-10, -5, 0, 5, 10],
        y:[-10, -5, 0, 5, 10],
        z:[-10, -5, 0, 5, 10],
        T:[
            [
                [9, 39, 65, 39, 9],
                [28, 125, 207, 125, 28],
                [35, 156, 257, 156, 35],
                [18, 79, 10, 79, 18],
                [4, 17, 28, 17, 4]
            ],[
                [28, 125, 207, 125, 28],
                [95, 424, 699, 424, 95],
                [10, 584, 963, 584, 10],
                [76, 342, 564, 342, 76],
                [19, 86, 142, 86, 19]
            ],[
                [35, 156, 257, 156, 35],
                [10, 584, 963, 584, 10],
                [208, 930, 1534, 930, 208],
                [142, 636, 1048, 636, 142],
                [40, 181, 298, 181, 40]
            ],[
                [18, 79, 10, 79, 18],
                [76, 342, 564, 342, 76],
                [142, 636, 1048, 636, 142],
                [10, 492, 810, 492, 10],
                [34, 151, 249, 151, 34]
            ],[
                [4, 17, 28, 17, 4],
                [19, 86, 142, 86, 19],
                [40, 181, 298, 181, 40],
                [34, 151, 249, 151, 34],
                [11, 48, 80, 48, 11]
            ],
        ]
    }
}

console.log(data.interpolation2d.x);
console.log(data.interpolation2d.y);
console.log(data.interpolation2d.h);

export function Page(){
    return <>
        <h1>Interpolação linear <br/> 1D, 2D e 3D</h1>
        <section>
            <p>
                Considere uma função \(f(x)\) cujos valores \(f(x_i)\) são conhecidos somente nos pontos \(x_i\), \(i = 0,1,2,...,n\). Entre dois pontos consecutivos (\(x_i, f(x_i)\)) e (\({`x_{i+1}, f(x_{i+1})`}\) ) é possível traçar uma reta \(g_i(x)\) cuja equação é: \[{`g_i(x) = f(x_i)+(x-x_i)\\frac{f(x_{i+1})-f(x_i)}{ x_{i+1}-x_i }`}\]
            </p><p>
                A tabela a seguir mostra as coordenadas dos pontos cheios do gráfico. Utilize interpolações lineares para determinar as coordenadas dos pontos vazios, que dividem em três partes iguais os intervalos em \(x\) entre os pontos cheios.
            </p>
            <Plot data={[{x:data.interpolation1d.x, y:data.interpolation1d.f}]} layout={{}}/>

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
            <Plot
                data={[
                    {
                        x: data.interpolation2d.x,
                        y: data.interpolation2d.y,
                        z: data.interpolation2d.h, // Deve ser uma matriz bidimensional
                        type: "surface",
                    }
                ]}
                layout={{
                    autosize: false,
                    scene: {
                        xaxis: { range: [0, 20] },
                        yaxis: { range: [0, 20] },
                        zaxis: { range: [0, 500] }, // Ajuste conforme necessário
                    },
                }}
            />
        </section><section>
            <p>
                Para o caso tridimensional, considere uma rede cúbica e periódica \(x_d\) e \(y_d\), e \(z_d\) como a diferença entre cada uma das coordenadas \(x\), \(y\) e \(z\) e a respectiva menor coordenada da rede (isto é,\({`x_i < x < x_{i+1}`}\) e o mesmo para \(y\) e \(z\)): 
            </p><p>
                Os oito pontos azuis são os vértices da célula cúbica dentro da qual o ponto \(x,y,z\) de interesse está incluído, para os quais os valores da função são conhecidos. As coordenadas desses pontos e os valores da função neles são utilizados na primeira etapa da interpolação, gerando os valores para a função nos quatro pontos verdes.
            </p><p>
                As coordenadas dos pontos verdes e os valores da função neles são utilizados na segunda etapa da interpolação, gerando os valores para a função nos dois pontos laranjas.
            </p><p>
                As coordenadas dos pontos laranjas e os valores da função neles são utilizados na terceira etapa da interpolação, gerando o valor da função no ponto amarelo, que é o valor buscado.
            </p><p>
                Fazendo: \[{`\\begin{split}
                    x_d &= \\frac{x-x_i}{x_{i+1}-x_i}\\\\
                    y_d &= \\frac{y-y_i}{y_{i+1}-y_i}\\\\
                    x_d &= \\frac{z-z_i}{z_{i+1}-z_i}\\\\
                \\end{split}`}\]
            </p><p>
                Primeiro interpolamos em relação à coordenada \(x\). Esse procedimento gera quatro novos valores para a função em um plano que passa por \(x\), paralelo ao plano que passa por \(x_i\): \[{`\\begin{split}
                g(x, y_j, z_k) &= f(x_i, y_j, z_k)(1-x_d) + f(x_{i+1}, y_j, z_k)x_d \\\\
                g(x, y_j, z_{k+1}) &= f(x_i, y_j, z_{k+1})(1-x_d) + f(x_{i+1}, y_j, z_{k+1})x_d \\\\
                g(x, y_{j+1}, z_k) &= f(x_i, y_{j+1}, z_k)(1-x_d) + f(x_{i+1}, y_{j+1}, z_k)x_d \\\\
                g(x, y_{j+1}, z_{k+1}) &= f(x_i, y_{j+1}, z_{k+1})(1-x_d) + f(x_{i+1}, y_{j+1}, z_{k+1})x_d \\\\
                \\end{split}`}\]
            </p><p>
                Em seguida, interpolamos em relação à coordenada \(y\), o que gera dois novos valores para a função em uma linha que passa por \(y\) e está contida no plano definido anteriormente: \[{`\\begin{split}
                    g(x, y, z) &= g(x, y_j, z_k)(1-y_d) + g(x, y_{j+1}, z_k)y_d \\\\
                    g(x, y, z_{k+1}) &= g(x, y_j, z_{k+1})(1-y_d) + g(x, y_{j+1}, z_{k+1})y_d \\\\
                \\end{split}`}\]
            </p><p>
                Finalmente, interpolamos em relação à coordenada \(z\), o que gera o valor interpolado para a função no ponto desejado: \[{`
                    g(x, y, z) = g(x, y, z_k)(1-z_d)+g(x, y, z_{k+1})z_d
                `}\]
            </p><p>
                O resultado da interpolação linear tridimensional independe da ordem das interpolações parciais (isto é, interpolar primeiro em \(z\), depois em \(y\) e finalmente em \(x\) levaria ao mesmo resultado).
            </p><p>
                A tabela a seguir contém temperaturas em °C "medidas" a intervalos regulares em uma região cúbica do espaço em que \(x\), \(y\) e \(z\) estão entre -10 cm e 10 cm em intervalos de 5 cm.
            </p><p>
                Implemente o procedimento de interpolação linear tridimensional de modo que utilize os valores desse pontos para estimar as temperaturas nos pontos ao longo do círculo mostrado na figura. O círculo tem raio = 9,4 cm e está no plano \(z\) = 3,4 cm.
            </p><p>
                Com os dados fornecidos, você deverá obter a curva \(n = 5^3\). Apesar de parecer muito ruim, está correta dentro do que pode ser feito com a matriz de dados fornecida. No gráfico, são apresentadas também como seriam as interpolações para conjuntos de dados com \(n = 10^3\) e \(n = 20^3\) pontos, bem como os valores exatos, calculados com o modelo utilizado para gerar os pontos.
            </p>
        </section>
    </>;
}