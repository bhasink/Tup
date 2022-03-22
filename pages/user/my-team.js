import { useContext,useEffect,useState } from "react";
import axios from "axios";
import FooterDashboard from "../../components/footer/footer-dashboard";
import { UserContext } from "../../context";
import Link from "next/link";
import { useRouter } from "next/router";


const MyTeam = () => {

    const [state,setState] = useContext(UserContext);
    const [myTeam,setMyTeam] = useState([]);
    const [tl,setTl] = useState([]);
    const router = useRouter();

    useEffect(() =>{

      if(state == null){
        router.push("/login");
      }

      if(state && state.token){
        getMyTeam();
      }
  },[state && state.token]);

    const getMyTeam = async() =>{
      try{
          const {data} = await axios.get("/get-team");
          console.log(data);
          setTl(data.tl);
          setMyTeam(data.users);
        }
        catch(err){
            console.log(err);
        }
    };

    return(
        <>

{ state != null ? (

<div className="noscrol">

<div>
  <section className="userinfowel myteamheads  d-flex align-items-center">
    <div className="container">
      <div className="singuptxthds rightsplsx">
        <img src="/images/tinderulogowht.png" />
      </div>
    </div>
  </section>
  <section className="profileusrdta revonly">
    <div className="container">
      <div className="mainuser mtns">
        <div className="row">
        {tl.profile_img != null && (
          <div className="col-12 col-md-6 mx-auto">
            <div className="goldmem usrprdisdt">
              <Link href="/user/my-profile">
                <a className="inf"><img src="/images/info.svg" /></a>
              </Link>
              
              <img src={`https://tinderu.youthbeat.in/uploads/profile_pic/${tl.profile_img}`} className="thmbur" />

              <h3>{tl.name}</h3>
              <p className="posuse">
                {state && state.data && state.data.is_reps == 1 ? (
                "Team Leader"
                ) : (
                  "Campus Rep"
                )}
             </p>
              <a href="#"><img src="/images/swipenow.svg" /> {tl.ig_link}</a>
            </div>
          </div>

        )}

        </div>
        <div className="othersdts">
          <div className="row">

          {myTeam && myTeam.map((team) => (
            <div className="col-6 col-md-4 mx-auto">
              <div className="usrprdisdt">
               <Link href={`/user/my-team/${team.id}`}>
                  <a className="inf"><img src="/images/info.svg" /></a>
                </Link>
                {team.profile_img == null ? (
                  <img src="/images/user1.png" className="thmbur" />
                ) : (
                  <img src={`https://tinderu.youthbeat.in/uploads/profile_pic/${team.profile_img}`} className="thmbur" />
                )}
                <h3>{team.name}</h3>
                <p className="posuse">Campus Rep</p>
                <a href="#" className="icmd"><img src="/images/swipenow.svg" /> <span>{team.ig_link}</span></a>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    
    </div>
  </section>
</div>


<FooterDashboard />

</div>

   
) : ""}
        
        </>
    );

};

export default MyTeam;