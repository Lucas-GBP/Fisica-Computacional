//import jsonData from "../../..//data/INMET_S_SC_A806_FLORIANOPOLIS_01-01-2022_A_31-12-2022.json";
import jsonData from "../../assets/data/INMET_S_SC_A806_FLORIANOPOLIS_01-01-2022_A_31-12-2022.json";

console.log("Hello World!");
console.log(jsonData);

export interface JsonType {
    header: Header
    data: Dados[]
}
  
interface Header {
    REGIAO: string
    UF: string
    ESTACAO: string
    "CODIGO (WMO)": string
    LATITUDE: string
    LONGITUDE: string
    ALTITUDE: string
    "DATA DE FUNDACAO": string
}

interface Dados {
    Data: string
    "Hora UTC": string
    "PRECIPITA��O TOTAL, HOR�RIO (mm)": any
    "PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)": any
    "PRESS�O ATMOSFERICA MAX.NA HORA ANT. (AUT) (mB)": any
    "PRESS�O ATMOSFERICA MIN. NA HORA ANT. (AUT) (mB)": any
    "RADIACAO GLOBAL (Kj/m�)": any
    "TEMPERATURA DO AR - BULBO SECO, HORARIA (�C)": any
    "TEMPERATURA DO PONTO DE ORVALHO (�C)": any
    "TEMPERATURA M�XIMA NA HORA ANT. (AUT) (�C)": any
    "TEMPERATURA M�NIMA NA HORA ANT. (AUT) (�C)": any
    "TEMPERATURA ORVALHO MAX. NA HORA ANT. (AUT) (�C)": any
    "TEMPERATURA ORVALHO MIN. NA HORA ANT. (AUT) (�C)": any
    "UMIDADE REL. MAX. NA HORA ANT. (AUT) (%)": any
    "UMIDADE REL. MIN. NA HORA ANT. (AUT) (%)": any
    "UMIDADE RELATIVA DO AR, HORARIA (%)": any
    "VENTO, DIRE��O HORARIA (gr) (� (gr))": any
    "VENTO, RAJADA MAXIMA (m/s)": any
    "VENTO, VELOCIDADE HORARIA (m/s)": any
    "": string
}
