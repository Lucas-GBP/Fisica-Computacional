import { useEffect } from "react"

export function Page(){
    useEffect(()=> {}, []);

    return <>
        <h1>Ajuste de retas por mínimos quadrados</h1>

        <section>
            <p>
                Considere o gráfico a seguir, que contém um conjunto de pontos experimentais, com incertezas ("barras de erro"), e uma reta e um conjunto de pontos calculados de acordo com algum modelo que assume uma relação linear entre \(x\) e \(y\).
            </p>

            <p>
                Indicados no gráfico também estão as "distâncias" \(y_i-y^{"{\\text{mod}}"}_i\) entre os pontos experimentais \(y_i\) e os pontos \(y^{"{\\text{mod}}"}_i\) calculados com o modelo para cada \(x_i\).
            </p>
            <p>
                Um indicador conveniente que expressa a distância entre o modelo e os dados é o \(X^2\), definido como a soma dos quadrados das diferenças entre os valores experimentais e os calculados com o modelo, dividido pela incerteza \(\sigma\):
                \[X^2 = \sum_i{`\\left(`}\frac{"{y_i-y^{\\text{mod}}_i}"}{"{\\sigma_i}"}{`\\right)`}^2\]
            </p>
            <p>
                Este indicador tem duas características convenientes: (1) o "ao quadrado" faz com que todos os termos da soma sejam positivos, evitando que diferenças a maior ou a menor entre os valores dos dados e do modelo cancelem-se total ou parcialmente e (2) a divisão pela incerteza faz com que pontos com incerteza relativamente maior tenham menos peso no resultado do que pontos com incerteza relativamente menor.
            </p>
            <p>
                A melhor reta será aquela que minimiza este indicador e sabemos, do cálculo diferencial, como encontrar o mínimo desse indicador. Os valores de \(y^{"\\text{mod}"}_i\) podem ser computados com a expressão para o modelo:
                \[y^{"\\text{mod}"}_i = A + B x_i\]
            </p>

        </section>
    </>
}