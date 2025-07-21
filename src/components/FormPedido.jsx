import React, { useState, useEffect } from 'react';

export default function FormPedido({ pedido, onSalvar, onDeletar }) {
  const [form, setForm] = useState({ nome: '', itens: '', observacoes: '', valor: '', formaPagamento: '' });

  useEffect(() => {
    if (pedido) setForm(pedido);
  }, [pedido]);

  const atualizar = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  return (
    <div className="form">
      <h2>ADICIONAR PEDIDO</h2>
      <input placeholder="Nome..." value={form.nome} onChange={e => atualizar('nome', e.target.value)} />
      <textarea placeholder="Items..." value={form.itens} onChange={e => atualizar('itens', e.target.value)} />
      <textarea placeholder="Observações" value={form.observacoes} onChange={e => atualizar('observacoes', e.target.value)} />
      <input placeholder="Valor R$" type="number" value={form.valor} onChange={e => atualizar('valor', e.target.value)} />

      <div>
        Forma de Pagamento:<br />
        <label><input type="radio" name="pagamento" value="Dinheiro" checked={form.formaPagamento === 'Dinheiro'} onChange={e => atualizar('formaPagamento', e.target.value)} /> Dinheiro</label>
        <label><input type="radio" name="pagamento" value="PIX" checked={form.formaPagamento === 'PIX'} onChange={e => atualizar('formaPagamento', e.target.value)} /> PIX</label>
        <label><input type="radio" name="pagamento" value="Cartão" checked={form.formaPagamento === 'Cartão'} onChange={e => atualizar('formaPagamento', e.target.value)} /> Cartão</label>
      </div>

      <div className="form-acoes">
        {pedido && <button onClick={() => onDeletar(pedido.id)}>Deletar</button>}
        <button onClick={() => onSalvar(form)}>Salvar</button>
      </div>
    </div>
  );
}