'use client'

import { useState } from "react";
import { setupLucid } from "@/lucidSetup";

export default function Principal() {
  const [txHash, setTxHash] = useState<string | null>(null); // ⬅️ nuevo estado para el hash

  const PedirTaxi = async () => {
    try {
      if (!window.cardano?.eternl) {
        alert("Wallet Eternl no detectada.");
        return;
      }

      const api = await window.cardano.eternl.enable();
      const lucid = await setupLucid(api);

      const tx = await lucid.newTx()
        .payToAddress(
          "addr_test1qz93m5848epa8he7gsm9yyyflp9jmwgsp43lvcetsf02qa8pg6zdx59xqkpp5m6lut92ga4g2sen4ryq6np3j6y594xqk0m3nt",
          { lovelace: 2_000_000n }
        )
        .complete();

      const signedTx = await tx.sign().complete();
      const hash = await signedTx.submit();

      setTxHash(hash); // ⬅️ Guarda el hash
      alert(`Transacción enviada: ${hash}`);
    } catch (err) {
      console.error("Error al pagar el taxi:", err);
      alert("Hubo un error al enviar la transacción.");
    }
  };

  return (
    <header>
      <div className="div__header">
        <h1 className="title">Breyner Company</h1>
        <p className="parrafo">
          Bienvenido a Breyner Company, donde venimos a revolucionar el mundo y ademas el dueño es muy sexy. Pide tu taxi y paga con Cardano.
        </p>
      </div>
      <button className="button__header" onClick={PedirTaxi}>
        Pedir taxi
      </button>
{/*       {txHash && <p className="wallet">Transacción enviada: {txHash}</p>} MUESTRA EL HASHHHHHHHHHHHH
 */}    </header>

    
  );
}
