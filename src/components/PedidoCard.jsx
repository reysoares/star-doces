import React from 'react';

export default function PedidoCard({ pedido, index, onEditar, onStatusChange }) {
  return (
    <div className={`card ${pedido.entregue ? 'entregue' : ''} ${!pedido.entrega ? 'retirada' : ''}`}>
      <div>{index} | <strong>{pedido.nome}</strong> &nbsp; R$ {Number(pedido.valor).toFixed(2)}</div>
      <label>PAGO <input type="checkbox" checked={pedido.pago} onChange={e => onStatusChange(pedido.id, 'pago', e.target.checked)} /></label>
      <label>ENTREGUE <input type="checkbox" checked={pedido.entregue} onChange={e => onStatusChange(pedido.id, 'entregue', e.target.checked)} /></label>
      <button onClick={onEditar}>{'>'}</button>
    </div>
  );
}
