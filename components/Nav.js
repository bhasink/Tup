import { useContext,useState,useEffect } from "react";
import  {UserContext} from "../context";

// import Pusher from 'pusher-js';

const Nav = () => {

    const [state,setState] = useContext(UserContext);
    const [profileimg,setProfileimg] = useState({});

    useEffect(() =>{
      if(state && state.data){
          setProfileimg({
            url:"https://tinderu.youthbeat.in/uploads/profile_pic/"+state.data.profile_img
        });
      }
    },[state && state.data]);
    


    return(
        
        <section className="userinfowel onlyinfosur curnttwo">
            <div className="container">
            <div className="profdtls">
                <div className="singuptxthds rightsplsx">
                <img src="/images/tinderulogowht.png" />
                </div>
                <div className="row">
                <div className="col-8 col-lg-6 usdt align-self-center">
                    <h4>{state && state.data && state.data.name}</h4>
                    <p className="userrolls">
                        {state && state.data && state.data.is_reps == 1 ? (
                        "Team Leader"
                        ) : (
                        "Campus Rep"
                        )}
                    </p>
                </div>
                <div className="col-4 col-lg-6 profilepcs align-self-center">
                    <img src={profileimg && profileimg.url} />
                </div>
                </div>
            </div>
            </div>
        </section>
    );

};

export default Nav;