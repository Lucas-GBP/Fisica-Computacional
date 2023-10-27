
export interface JsonType {
    header: Header
    data: Dados[]
}
  
interface Header {
    REGIAO: string
    UF: string
    ESTACAO: string
    "CODIGO (WMO)": string
    LATITUDE: number
    LONGITUDE: number
    ALTITUDE: number
    "DATA DE FUNDACAO": string
}

interface Dados {
    Data: string
    "Hora UTC": string
    "PRECIPITAÇÃO TOTAL, HORÁRIO (mm)": any
    "PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)": any
    "PRESSÃO ATMOSFERICA MAX.NA HORA ANT. (AUT) (mB)": any
    "PRESSÃO ATMOSFERICA MIN. NA HORA ANT. (AUT) (mB)": any
    "RADIACAO GLOBAL (Kj/m²)": any
    "TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)": any
    "TEMPERATURA DO PONTO DE ORVALHO (°C)": any
    "TEMPERATURA MÁXIMA NA HORA ANT. (AUT) (°C)": any
    "TEMPERATURA MÍNIMA NA HORA ANT. (AUT) (°C)": any
    "TEMPERATURA ORVALHO MAX. NA HORA ANT. (AUT) (°C)": any
    "TEMPERATURA ORVALHO MIN. NA HORA ANT. (AUT) (°C)": any
    "UMIDADE REL. MAX. NA HORA ANT. (AUT) (%)": any
    "UMIDADE REL. MIN. NA HORA ANT. (AUT) (%)": any
    "UMIDADE RELATIVA DO AR, HORARIA (%)": any
    "VENTO, DIREÇÃO HORARIA (gr) (° (gr))": any
    "VENTO, RAJADA MAXIMA (m/s)": any
    "VENTO, VELOCIDADE HORARIA (m/s)": any
}
