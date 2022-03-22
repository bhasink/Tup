import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import {notification} from "antd";

const Login = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [state, setState] = useContext(UserContext);
  
    const router = useRouter();

    useEffect(() => {

      if (window.localStorage.getItem("auth") !== null) {
        router.push("/user/dashboard");
      }

    }, []);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        if (email == "") {
            openNotificationWithIcon('error','Please enter the email!');
            return false;
        }

        if (IsEmail(email)==false) {
            openNotificationWithIcon('error','Incorrect email!');
            return false;
        }

        if (password == "") {
            openNotificationWithIcon('error','Please enter the password!');
            return false;
        }

        if (password.length < 6) {
            openNotificationWithIcon('error','Minimum password length must be six character!');
            return false;
        }

        try{
            const data = await axios.post(`/custom-login`,{
                "email":email,
                "password":password
            });

            window.localStorage.setItem("auth", JSON.stringify(data.data));
            
            setState({
              auth: data.data,
            });

            router.push("/user/dashboard");

        }
        catch(err){
            console.log(err);
            openNotificationWithIcon('error','Invalid credentials! Please try again.');
          }
        
    }

    const IsEmail = (email) => {
        let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
            return false;
        }else{
            return true;
        }
    }

    const openNotificationWithIcon = (type,msg) => {
      notification[type]({
        message: 'Error!',
        description:msg,
        duration: 5,
        placement: 'bottomRight',
        bottom: 65,
      });
    }
	
	
	function myFunction() {
    var x = document.getElementById("password");
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
          <div className="stpformares">
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
                    type="text" 
                    className="form-control" 
                    placeholder="Email*" 
                    name="email" 
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
                    name="password" 
                />
				<i className="far fa-eye"  onClick={myFunction}/> 
              </div>
              <div className="submitctacenter text-center">
                <button type="submit" className="trasluccta">Submit</button>
                <p className="alrsdy">
                  Lost the password?<br />

                  <Link href="/forgot-password" >
                    <a className="transctas">Forgot Password</a>
                  </Link>
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
			{ /* <p className="hvrbtn">Home</p> */ }

            </li>
            

            <li className="nav-item">
                <Link href="/ourvibe" >
                    <a><img src="/tinderkb/images/Flame.svg" /></a>
                </Link>
				{ /*    <p className="hvrbtn">Our Vibe</p> */ }

            </li>


            <li className="nav-item active">
            <Link href="/join-now" >
                <a><img src="/tinderkb/images/person.svg" /></a>
            </Link>
			{/*<p className="hvrbtn">Login</p> */ }
            </li>
        

      </ul>


      </div>
    </div>
  </footer>
</div>
    
    );
};

export default Login;