import { Component } from 'react';
import Productos from './components/Productos'
import Layout from './components/Layout'
import Title from './components/Title'
import Navbar from './components/Navbar'

class App extends Component {
    state = {
        productos: [
            { name: 'Tomate', price: 10, img: '/productos/tomate.jpg' },
            { name: 'Arbejas', price: 15, img: '/productos/arbejas.jpg' },
            { name: 'Lechuga', price: 20, img: '/productos/lechuga.jpg' },
        ],
        carro: [],
        esCarroVisible: false
    };

    agregarAlCarro = (producto) => { 
        const { carro } = this.state;
        if (carro.find(x => x.name === producto.name)) { 
            // const newCarro = carro.map(e => { 
            //     if (e.name === producto.name) {
            //         return {...e, cantidad: e.cantidad + 1}
            //     } else {
            //         return e
            //     }
            // });

            const newCarro = carro.map(e => e.name === producto.name
                ? ({
                    ...e,
                    cantidad: e.cantidad + 1
                })
                : e)
            return this.setState({ carro: newCarro});
        }

        return this.setState({
            carro: this.state.carro.concat({...producto, cantidad: 1})
        })
    }

    mostrarCarro = () => { 
        if (!this.state.carro.length) { 
            return
        }
        this.setState({ esCarroVisible: !this.state.esCarroVisible });
        
    }

    render() {
        const { esCarroVisible } = this.state;
        return (
            <div>
                <Navbar
                    carro={this.state.carro}
                    esCarroVisible={esCarroVisible}
                    mostrarCarro={this.mostrarCarro} />
                <Layout>
                    <Title />
                    <Productos agregarAlCarro={this.agregarAlCarro} productos={this.state.productos} />
                </Layout>
            </div>
        );
    }
}

export default App;
