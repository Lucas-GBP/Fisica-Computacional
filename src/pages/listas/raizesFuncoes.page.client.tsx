export function Page(){
    return <>
        <h1>Raízes de funções</h1>
        <section>
            <p>
                Encontrar as raízes de uma função \(f(x)\) é encontrar os valores de \(x\) para os quais \(f(x)=0\). É o que fazemos frequentemente quando utilizamos a equação quadrática para encontrar as raízes (reais ou imaginárias) de uma equação de segundo grau ( \(f(x)=ax^2+bx+c\)).
            </p><p>
                Equivalentemente, é o que precisamos fazer para encontrar os pontos em que duas funções \(f(x)\) e \(g(x)\) têm o mesmo valor, pois podemos definir uma função \(h(x)=f(x)-g(x)\) e buscar as raízes de \(h(x)\). Os valores encontrados não serão raízes de \(f(x)\) e \(g(x)\), mas os valores para os quais \(f(x)=g(x)\).
            </p><p>
                Às vezes é possível encontrar as raízes de uma função analiticamente, mas em geral esse não é o caso. Considere, por exemplo, as funções \(f(x)=x^2\) e \({`g(x)=e^{-x}`}\). Como encontrar o ponto em que são iguais? Uma possibilidade é utilizar o "método gráfico", que implica em fazer um gráfico das duas funções sobre o mesmo "papel" e estimar onde as duas se encontram, como na figura a seguir, onde se vê que \(x \simeq 0,70\).
            </p><p>
                Frequentemente, entretanto, desejamos uma ferramenta mais "automatizada" e precisa para fazer esse serviço, e alguns métodos numéricos vêm a calhar. São muitos os métodos (bissecção, regula falsi, interpolação, secante, Newton-Raphson, Steffensen, Brent, Ridders...), cada um com suas especificidades e eficiência. No que segue apresentamos o método da bissecção, provavelmente o mais intuitivo e simples de implementar, mais do que suficiente para situações que não exigem alta performance.
            </p><p>
                O método da bissecção pode ser usado para encontrar as raízes de uma função contínua \(f(x)\) no intervalo \([a, b]\), dado que \(f(a)\) e \(f(b)\) tenham sinais opostos, ou seja \({`f(a)\\cdot f(b) < 0`}\). Nestas condições, o teorema do valor intermediário garante a existência de uma raiz no intervalo \([a, b]\).
            </p><p>
                O método consiste em dividir o intervalo no seu ponto médio \({`c = \\frac{(a+b)}{c}`}\), e então verificar em qual dos dois subintervalos está a raiz. Se \({`f(a)\\cdot f(c) < 0`}\), existe pelo menos uma raiz no intervalo \([a, c]\); caso contrário, há pelo menos uma raiz no intervalo \([c, b]\). O procedimento é repetido para o subintervalo correspondente à raiz até que aproxime a raiz com a precisão desejada.
            </p>
            <p>
                É possível demonstrar que o número máximo de iterações necessárias para que a aproximação fornecida pelo método esteja dentro de uma determinada margem de erro (ou tolerância) é dado por: \[{`n = \\log_2 \\left(\\frac{b-a}{\\epsilon}\\right ) = \\frac{\\log (b-a) - \\log \\epsilon}{\\log 2}`}\] Note que a forma da expressão mais à direita independe da base utilizada para o cálculo do logaritmo.
            </p>
        </section>
        <section>
            <p>
                Implemente o método da bissecção para encontrar o ponto de interseção das funções \(f(x)=x^2\) e \({`g(x) = e^{-x}`}\) com uma precisão da ordem de \({`10^{-3}`}\). Quantas interações são necessárias partindo-se do intervalo \(a = 0\) e \(b = 1\)?
            </p><p>
                Quantas interações são necessárias partindo-se do intervalo \(a = 0,6\) e \(b = 0,6\)?
            </p><p>
            Quantas interações são necessárias, nos dois casos, para uma tolerância de \({`10^{-6}`}\)?
            </p><p>
                E para \({`10^{-9}`}\)?
            </p>
        </section>
        <section>
            <p>
                Em determinada circustância, a população \(N(t)\) de uma localidade em função do tempo \(t\) pode ser descrita por: \[{`N(t) = N_0 e^{\\lambda} + \\frac{\\nu}{\\lambda}(e^{\\lambda t}-1)`}\] onde \(N_0\) é a população em \(t = 0\), \(\lambda\) a taxa de natalidade e \(\nu\) a taxa de imigração. Determine a taxa de natalidade anual para \(N_0 = 1,532\times 10^6\), \(\nu = 0,393\times 10^6\) \({`\\text{ano}^{-1}`}\) e \({`N(1 \\text{ano}) = 2,123\\times 10^6`}\).
            </p>
        </section>
        <section>
        </section>
    </>
}