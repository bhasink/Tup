import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const JoinNow = () =>{

  const router = useRouter();

  useEffect(() => {

    if (window.localStorage.getItem("auth") !== null) {
      router.push("/user/dashboard");
    }

  }, []);
  
  return (
    
  <div>
  
  <section className="signupbgas d-flex align-items-center ">
    <img src="/tinderkb/images/signupdesktopbg.jpg" class="desktopqual" />
    <img src="/tinderkb/images/mobilesignups.jpg" className="mobilequal" />
    <div className="container">
      <div className=" midarksho text-center d-flex  align-self-center flex-column">
        <div className="singuptxthds midplsx">
          <img src="/tinderkb/images/tinderulogo.png" />
        </div>
        <div className="mainheadstop whitetxts">
          <h3 className="subhdblack">
            Epic starts <span> here!  <img src="/tinderkb/images/pinkleveluptxt.png" className="lvlups" /></span>
             
          </h3>
        </div>
        <div className="signbtnshows forjns">
          <ul>
            <li>
            <Link href="/login" >
              <a className="transctas">Login</a>
            </Link>
            </li>
          </ul>
        </div>
      
        <div className="followdbasic">
          <ul>
            <li><a target="_blank" href="https://www.instagram.com/tinderu_india/?hl=en" className="transctas"><img src="/tinderkb/images/instalogo.png" /> Follow for updates</a></li> 
            <li><a href="https://tinder.com/app" target="_blank" className="transctas"><img src="/tinderkb/images/Flame.svg" /> Swipe now</a></li>
          </ul>
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
				{ /*   <p className="hvrbtn">Our Vibe</p> */ }

            </li>


            <li className="nav-item active">
            <Link href="/join-now" >
                <a><img src="/tinderkb/images/person.svg" /></a>
            </Link>
            { /*  <p className="hvrbtn">Login</p> */ }
            </li>
        
          </ul>
      </div>
    </div>
  </footer>
</div>

    );
};

export default JoinNow;