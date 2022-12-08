import {useState, useEffect} from "react"
import './App.css';

function App() {
  const [arrondissement,setArrondissement] = useState([]);
  const [genre,setGenre] = useState([]);


  useEffect(()=>{
    fetch("http://localhost:5000/arbre/")
      .then((response)=>{response.json()
      .then((newGenre)=>{setGenre(newGenre)})
    })

    fetch("http://localhost:5000/arrondissement/")
      .then((response)=>{response.json()
      .then((newArr)=>{setArrondissement(newArr)})
    })
  },[]);


  return (
    <body>
        <div className="App1">
          <header className="App-header">La liste triée des arrondissements avec le nombre d'arbres dans chaque arrondissement :</header>
          {arrondissement.map((result)=>{
            return(
              <div>
                {result.ARRONDISSEMENT} : {result.nbARBRE} arbres
              </div>
            )
          })}
        </div>

        <div className="App2" >
          <header className="App-header">La liste qui pour chaque genre d'arbre donne le nombre d'arbres de ce genre :</header>
          {genre.map((result)=>{
              return(
                <div>
                  {result.GENRE} : {result.nbARBRE} arbre(s)
                </div>
              )
            })}
      </div>
  </body>
    
  );
}

export default App;
