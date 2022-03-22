import { useEffect,useContext, useState } from "react";
import  {UserContext} from "../../../context";
import axios from "axios";
import FooterDashboard from "../../../components/footer/footer-dashboard";
import { useRouter } from "next/router";

const MyTeamId = () => {
    
    const [state,setState] = useContext(UserContext);
    const [user,setUser] = useState({});
    const router = useRouter();
    const _id = router.query._id;


    useEffect(() =>{
       
        if(state == null){
          router.push("/login");
        }

        if(_id) fetchUser();
    },[_id]);

    const fetchUser = async () => {
        try{
            const {data} = await axios.get(`/get-team/${_id}`);
            console.log(data);
            setUser(data.user);
        }catch(err){
            console.log(err);
        }
    };

    return(
    
        <>

<section className="userinfowel myteamheads  d-flex align-items-center">
    <div className="container">
      <div className="singuptxthds rightsplsx">
        <img src="/images/tinderulogowht.png" />
      </div>
    </div>
  </section>
  
<section className="profilemysho d-flex">
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-lg-6 nomob-pd edipro">
	  <div className="pictxholder">
	   <div className="profthmbs">

        {Object.keys(user).length != 0 && (
            <>
          {user.profile_img == null ? (
            <img src="/images/user1.png" className="usrths" />
          ) : (
            <img src={`https://tinderu.youthbeat.in/uploads/profile_pic/${user.profile_img}`} className="usrths" />
          )}
          </>
        )}

        </div>
		
        
      </div>
	   </div>
	   
      <div className="col-md-6 col-lg-6 align-self-center">
        <div className="profacssd">
          <h3>{user && user.name}</h3>
          <ul className="lts">
            <li><img src="/images/Designation.svg" />
              
                {user && user.is_reps == 1 ? (
                "Team Leader"
                ) : (
                "Campus Rep"
                )}
             
             </li>
            <li><img src="/images/Gender.svg" /> 
                {user && user.gender}
            </li>
            <li><img src="/images/location.svg" />
                {user && user.city}
            </li>
          </ul>
          <p>

          </p>
          <ul className="drk">
            <li><a href="#"><img src="/images/tinder-profile.svg" width="10"/>
            {user && user.facebook_link != null ?  user.facebook_link : "Not updated"}
            </a></li>
            <li><a href="#"><img src="/images/instagram.svg" width="10"/>
            {user && user.ig_link != null ?  user.ig_link : "Not updated"}

            </a></li>
            <li><a href="#"><img src="/images/twitter.svg" width="10"/>
            {user && user.twitter_link != null ?  user.twitter_link : "Not updated"}

            </a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

   <FooterDashboard />

</>

 
    );
};

export default MyTeamId;