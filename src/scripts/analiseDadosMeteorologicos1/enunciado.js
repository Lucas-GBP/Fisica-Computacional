processData();

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', readFile);

function readFile(event) {

	const reader = new FileReader();
	const file = event.target.files[0];
	// a codificação dos arquivos do inmet é "windows-1252" (ANSI)
	reader.readAsText(file,"windows-1252");

	// função que é executada depois que o arquivo é carregado.
	// lembrar que na Internet isso pode demorar, por isso tem um 
	// esquema "assíncrono" (a função só é executada depois do arquivo carregado)
	reader.addEventListener('load', (event) => {
		// conteúdo "bruto" do arquivo
		const result = event.target.result;
		document.getElementById("fileContent").value = result;
		processData(result);
	});
}

function processData(fileData) {

	// coloca cada linha em um elemento de uma matriz
	// quando carregada, a página carrega os dados de Florianópolis no arquivo .js
	// quando o usuário seleciona o arquivo, os dados são os do arquivo selecionado
	if (fileData) {
		lines = fileData.toString().split("\n");
	}
	else {
		document.getElementById("fileContent").value = lines.join("\n");
	}

	// outra matriz para ficar somente com os dados, sem o cabeçalho
	let regs = [];

	// coloca em regs somente as linhas que começam com um número inteiro (tipo 2022)
	for (let i=0; i<lines.length; i++) {
		let flds = lines[i].split(";");
		if (parseInt(flds[0].split("/")[0])>0) regs.push(flds);
	}
	console.log(regs)

	// descobre em que linha estão os nomes das variáveis 
	// (é uma linha que começa com a palavra "Data")
	let i = 0;
	let tkn;
	let varNames;
	do {
		tkn = lines[i].split(";")[0];
		i++;
	}
	while (tkn!="Data");
	varNames = lines[i-1].split(";");
	console.log(varNames)

	let layout = {
		width: 500, height: 400, 
		margin: { t: 60, b: 60, l: 60, r: 40 },
		title: { text: ""}, 
		xaxis: { title: { text: ""}}, 
		yaxis: { title: {text: ""}} 
	};

	// índice da coluna com "radiação global"
	let ird;
	let varName = "RADIACAO"
	i = 0;
	do {
		tkn = varNames[i].split(" ")[0] 
		i++;
	} while (tkn!=varName);
	ird = i-1;
	let radiacaoGlobal = [];
	for (let i=0; i<regs.length; i++) radiacaoGlobal.push(parseFloat(regs[i][ird].replace(",",".")));
	layout.title.text = "Incidência de radiação na superfície";
	layout.xaxis.title.text = "dias x horas do ano (365 x 24 = 8760 canais)";
	layout.yaxis.title.text = "radiação medida (W/m<sup>2</sup>)";
	Plotly.newPlot("radiacaoGlobal",
		[{ y: radiacaoGlobal, type: "bar" },],
		layout);

	// índice da coluna com "temperatura do ar"
	let ita;
	varName = "TEMPERATURA DO AR";
	i = 0;
	do {
		tkn = varNames[i].split(" ");
		if (tkn.length>3) tkn = tkn[0]+" "+tkn[1]+" "+tkn[2]; 
		i++;
	} while (tkn!=varName);
	ita = i-1;
	let temperaturaDoAr = [];
	for (let i=0; i<regs.length; i++) temperaturaDoAr.push(parseFloat(regs[i][ita].replace(",",".")));
	layout.title.text = "Temperatura do ar (bulbo seco)";
	layout.xaxis.title.text = "dias x horas do ano (365 x 24 = 8760 canais)";
	layout.yaxis.title.text = "temperatura do ar (\u00B0C)";
	Plotly.newPlot("temperaturaDoAr",
		[{ y: temperaturaDoAr, type: "bar" }],
		layout);

	layout.title.text = "Temperatura do ar \u00D7 Radiação";
	layout.xaxis.title.text = "radiação medida (W/m<sup>2</sup>)";
	layout.yaxis.title.text = "temperatura do ar (\u00B0C)";
	Plotly.newPlot("temperaturaDoAr-vs-radiacaoGlobal",
		[{ x: radiacaoGlobal, y: temperaturaDoAr, type: "scatter", mode: "markers", marker: { size: 1 } }],
		layout);

}


