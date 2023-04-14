import './App.css'
//'React ⚛️', 'Vite ⚡', 'Replit 🌀'

import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

class ListaDeItens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itens: [
        { id: 1, nome: 'React ⚛️' },
        { id: 2, nome: 'Vite ⚡' },
        { id: 3, nome: 'Replit 🌀' }
      ],
      novoItem: '',
      itemEmEdicao: null
    };
  }

  handleChange = (event) => {
    this.setState({ novoItem: event.target.value });
  }

  adicionarItem = () => {
    const { itens, novoItem } = this.state;
    if (novoItem) {
      const novoItemObj = { id: Date.now(), nome: novoItem };
      const novaListaDeItens = [...itens, novoItemObj];
      this.setState({ itens: novaListaDeItens, novoItem: '' });
    }
  }

  excluirItem = (id) => {
    const { itens } = this.state;
    const novaListaDeItens = itens.filter((item) => item.id !== id);
    this.setState({ itens: novaListaDeItens });
  }

  editarItem = (item) => {
    this.setState({ itemEmEdicao: item });
  }

  salvarEdicao = () => {
    const { itens, itemEmEdicao } = this.state;
    const index = itens.findIndex((item) => item.id === itemEmEdicao.id);
    const novaListaDeItens = [...itens];
    novaListaDeItens[index] = itemEmEdicao;
    this.setState({ itens: novaListaDeItens, itemEmEdicao: null });
  }

  cancelarEdicao = () => {
    this.setState({ itemEmEdicao: null });
  }

  handleChangeEdicao = (event) => {
    const { itemEmEdicao } = this.state;
    const novoItem = { ...itemEmEdicao, nome: event.target.value };
    this.setState({ itemEmEdicao: novoItem });
  }

  render() {
    const { itens, novoItem, itemEmEdicao } = this.state;
    return (
      <div>
        <h1>Minha lista de itens:</h1>
        <ul>
          {itens.map((item) => (
            <li key={item.id}>
              {itemEmEdicao && itemEmEdicao.id === item.id ? (
                <>
                  <input type="text" value={itemEmEdicao.nome} onChange={this.handleChangeEdicao} />
                  <button className="btn-save" onClick={this.salvarEdicao}>
                    <FaEdit />
                  </button>
                  <button className="btn-cancel" onClick={this.cancelarEdicao}>
                    <FaTrash />
                  </button>
                </>
              ) : (
                <>
                  <span>{item.nome}</span>
                  <button className="btn-edit" onClick={() => this.editarItem(item)}>
                    <FaEdit />
                  </button>
                  <button className="btn-delete" onClick={() => this.excluirItem(item.id)}>
                    <FaTrash />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="novo-item">
          <input type="text" value={novoItem} onChange={this.handleChange} />
          <button className="btn-add" onClick={this.adicionarItem}>
            Adicionar
          </button>
        </div>
        <hr />
      </div>
    );
  }
}

export default ListaDeItens;