class Quadrado extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            value: props.value,
        };
        console.log(props)
    }

    render (){
        return (
            <button
                className="quadrado"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    var temVazio = false;

    squares.forEach((quadrado) => {
        if (!quadrado) {
            temVazio = true;
        }
    })

    if (!temVazio) {
        return 'Ninguém';
    }

    return null;
}

class Tabuleiro extends React.Component{
    constructor (props){
        super (props);
        this.state = {
            quadrados: Array(9).fill(null),
            xIsNext: true
        };
    }

    handleClick(i) {
        //faz uma cópia do vetor
        const quadrados = this.state.quadrados.slice();

        if (calculateWinner (quadrados)){
            alert ('Jogo já acabou');
            return;
        }

        if (quadrados[i]){
            alert ('Quadrado ocupado!')
            return;
        }

        quadrados[i] = this.state.xIsNext ? 'X' : '0';

        this.setState ({
            quadrados: quadrados,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderizarQuadrado (i){
        return (
            <Quadrado
                value={this.state.quadrados[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render (){
        const vencedor = calculateWinner (this.state.quadrados);
        let status;
        if (vencedor) {
            status = 'Vencedor: ' + vencedor;
        } else {
            status = 'Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <br />
                <button onClick={() => {location.reload();}}>Reiniciar</button><br /><br />
                <button onClick={() => {
                    if (!vencedor) {

                        var ganhou = false;
                        this.state.quadrados.forEach((quadrado, index) => {
                            var quadradosSupostos = [...this.state.quadrados];
                            if (!quadrado) {
                                quadradosSupostos[index] = this.state.xIsNext ? 'X' : '0';
                                if (calculateWinner(quadradosSupostos)) {
                                    this.handleClick(index);
                                    ganhou = true;
                                }
                            }
                        })

                        if (!ganhou) {
                            var selected = false;
                            while (!selected) {
                                var randomNumber = (Math.random() * 10).toFixed();

                                if (typeof this.state.quadrados[randomNumber] == "object" && !this.state.quadrados[randomNumber]) {
                                    this.handleClick(randomNumber);
                                    selected = true
                                }
                            }
                        }
                    } else {
                        alert('jogo já acabou!')
                    }
                }}>Jogada aleatória</button>
                <br />
                <br />
                <div className="status">{status}</div>
                    <div className="board-row">
                    {this.renderizarQuadrado(0)}
                    {this.renderizarQuadrado(1)}
                    {this.renderizarQuadrado(2)}
                </div>
                <div className="board-row">
                    {this.renderizarQuadrado(3)}
                    {this.renderizarQuadrado(4)}
                    {this.renderizarQuadrado(5)}
                </div>
                <div className="board-row">
                    {this.renderizarQuadrado(6)}
                    {this.renderizarQuadrado(7)}
                    {this.renderizarQuadrado(8)}
                </div>
            </div>
        );
    }
}

class Jogo extends React.Component {
    render () {
        return (
            <div className="game">
                <div className="game-board">
                    <Tabuleiro quadrados={Array(9).fill().map((value, pos) => pos)}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render (
    <Jogo />,
    document.getElementById("root")
);
