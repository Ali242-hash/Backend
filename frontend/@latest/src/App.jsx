import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [lista, setlista] = useState([]);
  const [userinput, setuserinput] = useState("");
  const [passinput, setpassinput] = useState("");
  const [titleinput, settitleinput] = useState("");
  const [valueinput, setvalueinput] = useState("");
  const [loggedIn, setLoggedin] = useState(false);

  async function Login() {

    const response = await fetch("http://127.0.0.1:3000/login",{

      method:'POST',
      headers:{

        'Content-Type':'application/json'
      },
      body:JSON.stringify({

        loginUser:userinput,
        loginPass:passinput
      })
    })

    const result = await response.json()
    sessionStorage.setItem("token",result.token)
    if(response.ok)
      setLoggedin(true)
    alert(result.message)

  }

  async function Logout() {
    
    sessionStorage.removeItem("token")
    setLoggedin(false)
  }

  async function LoadData() {
    
    const response = await fetch("http://127.0.0.1:3000/Artworks")
    const result = await response.json()
    setlista(result.data || result)

  }

  useEffect(()=>{

    LoadData()
  },[])

  async function CreateArt () {
    
    const response = await fetch("http://127.0.0.1:3000/Artworks",{

      method:'POST',
      headers:{

        Authorization:sessionStorage.getItem('token'),
        'Content-Type':'application/json'
      },

      body:JSON.stringify({
        
        newTitle:titleinput,
        newValue:valueinput
      })

    })
    const result = await response.json()
    if(response.ok)
      LoadData()
    else
      alert(result.message)
  }

  async function DeleteArt(id) {
    
    const response = await fetch("http://127.0.0.1:3000/Artworks/" +id,{

      method:'DELETE',
      headers:{
        
        Authorization:sessionStorage.getItem('token')
      }
    })
    const result = await response.json()
    if(response.ok)
      LoadData()
    else
      alert(result.message)

  }

  return (
    <>
      <header className="text-center mt-2">
        <h1>Műalkotás gyűjtemény</h1>
      </header>

      <main className="mt-2 p-2">
        <section className="col-12 col-md-6 col-lg-8">
          <h2>Műalkotások listázása:</h2>
        <ul>
           {
            lista.map(item=>{

              return(
             <li key={item.id}>

              Cim {item.title} Ertek: {item.value}
            <button onClick={()=>DeleteArt(item.id)} className="btn btn-sm btn-danger mt-2 mb-2">Torles</button>
             </li>
           
              )

            })
           }
         

        </ul>
        

        </section>
        <div className="col-12 col-md-6 col-lg-4">
          <section>
            {
              loggedIn? <button onClick={Logout} className="w-100 btn btn-secondary mb-2 mt-3 ">Logout</button> :

            <>
            <h2>Bejelentkezés:</h2>
            <label htmlFor="userinput">felhasználónév</label>
            <input type="text" name="userinput" id="userinput" value={userinput} onChange={e=>setuserinput(e.target.value)} /><br />
            <label htmlFor="passinput">jelszó</label>
            <input type="password" name="passinput" id="passinput" value={passinput} onChange={e=>setpassinput(e.target.value)} /><br />
            <button onClick={Login} className="w-100 mb-2 btn btn-primary mt-2">Login</button>
         
              </>
            }
           
          </section>

          <section>
            <h2>Új műalkotás felvétele:</h2>
            <label htmlFor="titleinput">cím</label>
            <input type="text" name="titleinput" id="titleinput" value={titleinput} onChange={e=>settitleinput(e.target.value)} />
            <br />
            <label htmlFor="valueinput">érték</label>
            <input type="text" name="valueinput" id="valueinput" value={valueinput} onChange={e=>setvalueinput(e.target.value)} />
            <br />
            {loggedIn && <button className="w-100 btn-success mb-2 mt-3" onClick={CreateArt}>Letrehozas</button>}
          </section>
        </div>
      </main>

      <footer className="text-center border border-success mt-3 p-2">
        <h3>Ali Ebtekar / 2-14FI / Javito Vizsga</h3>
      </footer>
    </>
  );
}

export default App;
