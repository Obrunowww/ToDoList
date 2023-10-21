import { useState } from 'react'

import './App.css'

function App() {
  const [ tarefas, setTarefas] =useState([])
  const [ infoInput, setInfoInput] = useState("")
  const [ todasTarefasFeitas, setTodasTarefasFeitas] = useState(false)
  const [mudarImagem, setMudarImagem] = useState(false)

  const pegarInput = (e) =>{
    const texto = e.target.value
    setInfoInput(texto)
  }
  const enviarTarefa = () =>{
    setTarefas([...tarefas, {texto: infoInput, feita: false}])
    setInfoInput("")
    console.log(tarefas)
  }

  const excluirTarefa = (tarefa) =>{
    console.log(`Essa tarefa é a ${tarefa}`)
    const attDasTarefas = [...tarefas]
    attDasTarefas.splice(tarefa,1)
    setTarefas(attDasTarefas)
  }
  const marcarTarefa = (indice) =>{
      const NovaTarefa = [...tarefas]
      if(NovaTarefa[indice].feita == true){
        NovaTarefa[indice].feita = false
      }else{
        NovaTarefa[indice].feita = true
      }
      setTarefas(NovaTarefa)
      const todasConcluidas = tarefas.every((tarefa) => tarefa.feita === true);

      if (todasConcluidas) {
        setTodasTarefasFeitas(true);

        setTimeout(()=>{
          setMudarImagem(true)
        },3000)

        setTimeout(()=>{
          setTodasTarefasFeitas(false)
          setMudarImagem(false)

        },4000)
      } else {
        setTodasTarefasFeitas(false);
      }
  }


  return (
    <>
      <main>
        <section className='caixaDoInput'>
          <input type="text" value = {infoInput} onChange={pegarInput} placeholder='Digite sua tarefa'/>
          <button onClick={enviarTarefa}>Enviar tarefa </button>
        </section>

        <section className='tarefas'>
        {tarefas.length == 0 &&(<p>Escreva uma tarefa</p>)}
          {tarefas.map((tarefa, index)=>(
            <section className='tarefa' style={{backgroundColor: tarefa.feita && "rgba(0, 255, 21, 0.863)"}}>
              <div className='quadradoDeconfirmação'  
              onClick={() => marcarTarefa(index)}>{tarefa.feita && (<p>✔️</p>)}</div>
              <p style={{textDecoration: tarefa.feita? "line-through" : ""}}>{tarefa.texto}</p>
              <button className='excluirTarefa' onClick={()=> excluirTarefa(index)}>x</button>
            </section>
          ))}
        </section>
        {todasTarefasFeitas && (<div className='animação'>
         <figure>{
          mudarImagem?  (<img src= "https://gifs.eco.br/wp-content/uploads/2022/02/gifs-animados-de-fogos-de-artificio-3.gif"></img>) 
          : (<img src="https://gifs.eco.br/wp-content/uploads/2022/02/gifs-animados-de-fogos-de-artificio-20.gif" alt="" />) 
         
          }</figure>
         
        </div>)}

      </main>

    </>
  )
}

export default App
