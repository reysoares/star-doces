import React, { useState, useEffect } from 'react';

const PRECOS = {
  Morango: 7.0,
  Cookie: 7.0,
  'Bolo de Pote': 8.0,
};

export default function FormPedido({ pedido, onSalvar, onDeletar }) {
  const [form, setForm] = useState({
    nome: '',
    itens: {
      Morango: 0,
      Cookie: 0,
      'Bolo de Pote': 0,
    },
    entrega: false,
    endereco: '',
    observacoes: '',
    valor: 0,
    formaPagamento: '',
  });

  useEffect(() => {
    if (pedido) {
      setForm({
        ...pedido,
        itens: {
          Morango: 0,
          Cookie: 0,
          'Bolo de Pote': 0,
          ...pedido.itens
        }
      });
    }
  }, [pedido]);

  useEffect(() => {
    calcularValorTotal();
  }, [form.itens, form.entrega]);

  const atualizarItem = (item, quantidade) => {
    setForm((prev) => ({
      ...prev,
      itens: {
        ...prev.itens,
        [item]: Math.max(0, Number(quantidade))
      }
    }));
  };

  const atualizar = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const calcularValorTotal = () => {
    const valorItens = Object.entries(form.itens).reduce(
      (total, [item, qtd]) => total + (PRECOS[item] * qtd),
      0
    );
    const taxaEntrega = form.entrega && valorItens < 20 ? 3 : 0;
    setForm((prev) => ({ ...prev, valor: valorItens + taxaEntrega }));
  };

  return (
    <div className="form">
      <h2>🧁 Adicionar Pedido</h2>

      <input
        placeholder="Nome..."
        value={form.nome}
        onChange={(e) => atualizar('nome', e.target.value)}
      />

      <div className="checkbox-group">
        {Object.entries(PRECOS).map(([item, preco]) => (
          <div key={item} className="checkbox-card selecionado">
            {item} (R${preco.toFixed(2)})<br />
            <input
              type="number"
              min="0"
              value={form.itens[item]}
              onChange={(e) => atualizarItem(item, e.target.value)}
              style={{ width: '60px', marginTop: '5px' }}
            /> unidade(s)
          </div>
        ))}
      </div>

      <div className="radio-group">
        Tipo:
        <label>
          <input
            type="radio"
            name="tipo"
            value="retirada"
            checked={!form.entrega}
            onChange={() => atualizar('entrega', false)}
          /> Retirada
        </label>
        <label>
          <input
            type="radio"
            name="tipo"
            value="entrega"
            checked={form.entrega}
            onChange={() => atualizar('entrega', true)}
          /> Entrega
        </label>
      </div>

      {form.entrega && (
        <input
          placeholder="Endereço para entrega..."
          value={form.endereco}
          onChange={(e) => atualizar('endereco', e.target.value)}
        />
      )}

      <textarea
        placeholder="Observações"
        value={form.observacoes}
        onChange={(e) => atualizar('observacoes', e.target.value)}
      />

      <div><strong>Valor Total: R$ {form.valor.toFixed(2)}</strong></div>

      <div className="radio-group">
        Forma de Pagamento:
        <label><input type="radio" name="pagamento" value="Dinheiro" checked={form.formaPagamento === 'Dinheiro'} onChange={e => atualizar('formaPagamento', e.target.value)} /> Dinheiro</label>
        <label><input type="radio" name="pagamento" value="PIX" checked={form.formaPagamento === 'PIX'} onChange={e => atualizar('formaPagamento', e.target.value)} /> PIX</label>
        <label><input type="radio" name="pagamento" value="Cartão" checked={form.formaPagamento === 'Cartão'} onChange={e => atualizar('formaPagamento', e.target.value)} /> Cartão</label>
      </div>

      <div className="form-acoes">
        {pedido && (
          <button onClick={() => onDeletar(pedido.id)}>
            ❌ Deletar
          </button>
        )}
        <button onClick={() => onSalvar(form)}>
          💾 Salvar
        </button>
      </div>
    </div>
  );
}
