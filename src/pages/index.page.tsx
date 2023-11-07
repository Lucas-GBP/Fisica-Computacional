import { Link } from "../components/Link"

export function Page() {
  return (
    <>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href='.\listas\aquecimento1'>Aquecimento 1</Link>
        </li>
        <li>
          <Link href='.\listas\aquecimento2'>Aquecimento 2</Link>
        </li>
        <li>
          <Link href='.\listas\aquecimento3'>Aquecimento 3</Link>
        </li>
        <li>
          <Link href='.\listas\aquecimento4'>Aquecimento 4</Link>
        </li>
        <li>
          <Link href='.\listas\analiseDadosMeteorologicos1'>Analise de Dados Meteorologicos 1</Link>
        </li>
        <li>
          <Link href='.\listas\analiseDadosMeteorologicos2'>Análise de Dados Meteorológicos 2</Link>
        </li>
        <li>
          <Link href=".\listas\numerosAleatoriosNaoUniformes1">Números Aleatórios Não Uniformes 1</Link>
        </li>
        <li>
          <Link href='.\listas\minimosQuadrados'>Minimos Quadrados</Link>
        </li>
      </ul>
    </>
  )
}
