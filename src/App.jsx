// --- App.jsx ---
import React, { useState, useEffect } from 'react';
import PedidoCard from './components/PedidoCard';
import FormPedido from './components/FormPedido';

const getPedidosSalvos = () => {
  const data = localStorage.getItem('pedidos');
  return data ? JSON.parse(data) : [];
};

export default function App() {
  const [pedidos, setPedidos] = useState(getPedidosSalvos);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [pedidoEditando, setPedidoEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const adicionarPedido = () => {
    setPedidoEditando(null);
    setModoEdicao(true);
  };

  const salvarPedido = (pedido) => {
    if (pedido.id != null) {
      setPedidos(pedidos.map(p => (p.id === pedido.id ? pedido : p)));
    } else {
      const novoPedido = {
        ...pedido,
        id: pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1,
        pago: false,
        entregue: false,
      };
      setPedidos([...pedidos, novoPedido]);
    }
    setModoEdicao(false);
  };

  const deletarPedido = (id) => {
    setPedidos(pedidos.filter(p => p.id !== id));
    setModoEdicao(false);
  };

  const atualizarStatus = (id, campo, valor) => {
    setPedidos(
      pedidos.map(p =>
        p.id === id ? { ...p, [campo]: valor } : p
      )
    );
  };

  const limparDados = () => {
    if (confirm('Tem certeza que deseja apagar todos os dados?')) {
      setPedidos([]);
      localStorage.removeItem('pedidos');
    }
  };

  const entregues = pedidos.filter(p => p.entregue).length;
  const totalEntregues = pedidos.reduce(
    (soma, p) => soma + (p.entregue ? Number(p.valor || 0) : 0),
    0
  );

  const pedidosOrdenados = [
    ...pedidos.filter(p => !p.entregue),
    ...pedidos.filter(p => p.entregue),
  ];

  return (
    <div className="container">
      <h1 className="logo">STAR <span>Doces</span></h1>
      <button className="botao" onClick={adicionarPedido}>+ ADICIONAR PEDIDO</button>
      <button className="botao limpar" onClick={limparDados}>LIMPAR DADOS</button>

      <div className="status">
        Pedidos Entregues: {entregues}/{pedidos.length} &nbsp;
        Valor total R$: {totalEntregues.toFixed(2)}
      </div>

      {modoEdicao && (
        <FormPedido
          pedido={pedidoEditando}
          onSalvar={salvarPedido}
          onDeletar={deletarPedido}
        />
      )}

      {pedidosOrdenados.map((pedido, index) => (
        <PedidoCard
          key={pedido.id}
          pedido={pedido}
          index={index + 1}
          onEditar={() => {
            setPedidoEditando(pedido);
            setModoEdicao(true);
          }}
          onStatusChange={atualizarStatus}
        />
      ))}
    </div>
  );
}