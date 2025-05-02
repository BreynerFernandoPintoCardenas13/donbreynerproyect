'use client'

import React, { useState } from "react";
import { setupLucid } from "@/lucidSetup";

export default function Principal() {
  const [txHash, setTxHash] = useState<string | null>(null); // ⬅️ nuevo estado para el hash
  const [FormVisible, SetFormVisible]= useState(false)
  const [direccion, setDireccion] = useState("");
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");

  const ManejoFormulario = async (e: React.FormEvent) =>{
    e.preventDefault();
    if (!nombre || !cedula || !direccion){
        alert("Faltan campos por rellenar por favor completelos")
        return;
    }
    try{
        const response = await fetch("https://68144b32225ff1af16286cfe.mockapi.io/taxis",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                cedula,
                direccion
            }),
        })
        const data = await response.json();
        if (data){
            alert("Datos subidos correctamente :)")
            SetFormVisible(false)
            PedirTaxi()
        }else{
            alert("Error al subir los datos al mockAPI")
        }
    }catch(error){
        console.error("errorr al guardar los datos", error)
        alert("error al intentar acceder a la API")
    }
  }
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
      <button className="button__header" onClick={()=> SetFormVisible(true)}>
        Pedir taxi
      </button>
{/*       {txHash && <p className="wallet">Transacción enviada: {txHash}</p>} MUESTRA EL HASHHHHHHHHHHHH
 */}    
        {FormVisible &&(
        <div className="div__formulario">
            <button onClick={()=> SetFormVisible(false)} className="button__back"> Back</button>
            <form onSubmit={ManejoFormulario} className="form">
                <label htmlFor="" className="label">
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required  className="input"/>
                </label>
                <label htmlFor="" className="label">
                    Cedula:
                    <input type="number" value={cedula} onChange={(e) => setCedula(e.target.value)} required className="input"/>
                </label>
                <label htmlFor="" className="label">
                    Direccion:
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required className="input"/>
                </label>
                <button type="submit" className="button__formulario">Enviar y Pagar</button>
            </form>
        </div>
        )}
    </header>

    
  );
}
