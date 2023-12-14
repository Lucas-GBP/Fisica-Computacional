import { Link } from "../components/Link"

export function Page() {
  return (
    <>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href='.\listas\aquecimento1'>Aquecimento 1</Link>
        </li><li>
          <Link href='.\listas\aquecimento2'>Aquecimento 2</Link>
        </li><li>
          <Link href='.\listas\aquecimento3'>Aquecimento 3</Link>
        </li><li>
          <Link href='.\listas\aquecimento4'>Aquecimento 4</Link>
        </li><li>
          <Link href='.\listas\analiseDadosMeteorologicos1'>Analise de Dados Meteorologicos 1</Link>
        </li><li>
          <Link href='.\listas\analiseDadosMeteorologicos2'>Análise de Dados Meteorológicos 2</Link>
        </li><li>
          <Link href=".\listas\numerosAleatoriosNaoUniformes1">Números Aleatórios Não Uniformes I</Link>
        </li><li>
          <Link href=".\listas\numerosAleatoriosNaoUniformes2">Números Aleatórios Não Uniformes II</Link>
        </li><li>
          <Link href=".\listas\numerosAleatoriosNaoUniformes3">Números Aleatórios Não Uniformes III</Link>
        </li><li>
          <Link href=".\listas\numerosAleatoriosNaoUniformes4">Números Aleatórios Não Uniformes IV</Link>
        </li><li>
          <Link href='.\listas\minimosQuadrados'>Minimos Quadrados</Link>
        </li><li>
          Raízes de Funções
        </li><li>
          Derivadas
        </li><li>
          Integrais (trapézio, Simpson)
        </li><li>
          Integrais (Monte Carlo)
        </li><li>
          <Link href=".\listas\interpolacaooLinear1D2D3D">Interpolação linear 1D, 2D e 3D</Link>
        </li><li>
          <Link href=".\listas\edoEuler">Integração de EDOs Método de Euler</Link>
        </li><li>
          Integração de EDOs (Runge-Kutta)
        </li><li>
          Relaxação e Equação de Poisson
        </li><li>
          Transformada de Fourier
        </li><li>
          <Link href=".\listas\espectroEletrons137C">Espectro de elétrons do 137Cs</Link>
        </li><li>
          <Link href=".\listas\retroespalhamentoEletrons">Retroespalhamento de elétrons</Link>
        </li><li>
          Transformações de Coordenadas
        </li><li>
          Lente Magnética
        </li>
      </ul>
    </>
  )
}
