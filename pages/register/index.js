import { useState } from "react";
import Link from "next/link";

const Register = () =>{

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confpassword,setConfpassword] = useState("");

  const handleSubmit = async() =>{
    alert('f');
  }
  
   function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  
  function myFunctionnext() {
    var x = document.getElementById("password-confirm");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
    
  return(
      <div>
  <section className="singnformsbgs d-flex align-items-center">
    <div className="container">
      <div className="midformst text-center d-flex  align-self-center flex-column">
        <div className="singuptxthds">
          <img src="/tinderkb/images/signuptxts.png" />
        </div>
        <div className="singuptxthds rightsplsx">
          <img src="/tinderkb/images/tinderulogo.png" />
        </div>
        <div className="signfrms">
          {/* Steps where all signup process will go */}
          <div id="s1" className="stpformares">
            <div className="mainheadstop whitetxts">
              <h3 className="subhdblack">
                Join an all exclusive <br /> <span> student's community
                  <img src="/tinderkb/images/signlongcomtxt.png" className="lvlups" /></span>
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email" 
                  name="email" 
                  type="email" 
                  className="form-control" 
                  placeholder="Email*" 
                />
              </div>
              <div className="form-group">
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password" 
                  type="password" 
                  className="form-control" 
                  placeholder="Password*"
                />
                <i className="far fa-eye fstics" onClick={myFunction} />
              </div>
              <div className="form-group">
                <input 
                  value={confpassword}
                  onChange={(e) => setConfpassword(e.target.value)}
                  id="password-confirm" 
                  type="password" 
                  className="form-control" 
                  name="password_confirmation" 
                  placeholder="Re-Enter Password*" 
                />
                <i className="far fa-eye sstics" onClick={myFunctionnext} />
              </div>
              <div className="submitctacenter text-center">
                <button value={1} type="submit" className="trasluccta sqnext">Next</button>
                <p className="alrsdy">
                  Already have an account?<br />
                  <a href="/login">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className="sitefootes">
    <div className="blackpart">
      <div className="container">
      <ul className="navbar-nav" id="menu-center">
            <li className="nav-item">
            <Link href="/" >
                
                <a><img src="/tinderkb/images/homeicon.svg" /></a>
                
            </Link>
                
            </li>
            <li className="nav-item">
                <Link href="/ourvibe" >
                <a><img src="/tinderkb/images/Flame.svg" /></a>
                </Link>
            </li>
            <li className="nav-item">
            <Link href="/join-now" >
              <a><img src="/tinderkb/images/person.svg" /></a>
            </Link>
            </li>
          </ul>
          
      </div>
    </div>
  </footer>
</div>


  );
};

export default Register;