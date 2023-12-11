import Plot from "react-plotly.js";

export function Page(){
    return <>
        <h1>Retroespalhamento de elétrons</h1>
        <section>
            <Plot
                layout={{
                    xaxis:{
                        title:"$b_3$"
                    }
                }}
                data={[{
                    x:[0,1,2],
                    y:[0, 3, 6]
                }]}
            />
        </section>
    </>;
}