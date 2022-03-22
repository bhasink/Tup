import { useContext,useState,useEffect } from "react";
import {UserContext} from "../../context";
import axios from "axios";
import Link from "next/link";
import FooterDashboard from "../../components/footer/footer-dashboard";
import { useRouter } from "next/router";

const Dashboard = () =>{

    const [state,setState] = useContext(UserContext);
    const [badges,setBadges] = useState([]);
    const [profile,setProfile] = useState({});
    const router = useRouter();

    useEffect(() => {

      if(state == null){
        router.push("/login");
      }

      if(state && state.token){
        badge();
        userProfile();
      }

    }, [state && state.token]);

    const badge = async () => {
      try{
        const {data} = await axios.get("/get-user-badges");
        setBadges(data.get_badges);
      }
      catch(err){
          console.log(err);
      }
    };

    const userProfile = async () => {
      try{
        const {data} = await axios.get("/user-profile");
        setProfile(data.authenticated_user);
      }
      catch(err){
          console.log(err);
      }
    };

    return(

        <>

{ state != null ? (

  <div>

  <section className="userinfowel">
    <div className="container">
      <div className="profdtls mainddon">
        <div className="singuptxthds rightsplsx">
          <img src="/images/tinderulogowht.png" />
        </div>
        <div className="row">
          <div className="col-8 col-lg-6 usdt">
		  { /* <p>Welcome back!</p> */ }
            <h4>{profile && profile.name}</h4>
            <p className="userrolls">     

            {profile && profile.is_reps == 1 ? (
            "Team Leader"
            ) : (
              "Campus Rep"
            )}
             
            </p>
            <p className="pontersns">Points: <span>{profile && profile.points ? profile.points : 0}</span></p>
          </div>
          <div className="col-4 col-lg-6 profilepcs align-self-center">

          {Object.keys(profile).length != 0 && (
            <>
            {profile && profile.profile_img == null ? (
              <img src={`/images/user1.png`} />
            ) : (
              <img src={`https://tinderu.youthbeat.in/uploads/profile_pic/${profile.profile_img}`} />
            )}
            </>
          )}

          </div>
        </div>
      </div>
      <div className="badgarespls">
        <p>Badges Earned</p>
        <div className="badgeiconssh">
          <ul>
          {badges && badges.slice(0, 3).map((badge) => (

            <li>
              {badge.badge_type == "Rep Of The Month" ?
                 <img src="/images/badges/ROTM.png" className="earnbds" /> : badge.badge_type == "Tweleb Material" ?
                 <img src="/images/badges/Tweleb.png" className="earnbds" /> : badge.badge_type == "Creator OP" ?
                 <img src="/images/badges/Creator.png" className="earnbds" /> : badge.badge_type == "The Underdog" ?
                 <img src="/images/badges/Underdog.png" className="earnbds" /> : badge.badge_type == "Peak Creatiwitty" ?
                 <img src="/images/badges/Creatiwitty.png" className="earnbds" /> : badge.badge_type == "A1 Since Day 1" ?
                 <img src="/images/badges/A1_since_day1.png" className="earnbds" /> : ''
                }              
            </li>

          ))}
          
          </ul>
          {badges && badges.slice(1, 2).map((badge) => (
              <a href="javascript:void(0);" data-toggle="modal" data-target="#exampleModalCenter14">View All</a>
          ))}
        </div>
      </div>
    </div>
  </section>

 <section className="dashgridpan">
  <div className="container">
    <div className="row">
      <div className="col-6 col-md-4 col-lg">
        <div className="indsh  cclb">

        <Link href="/user/task">
                <a className="">
                <img src="/images/tasks.svg" width="67"/>
                <p>Tasks</p>
                </a>
        </Link>

        </div>
      </div>

      {profile && profile.is_reps == 1 ? (
         
      <div className="col-6 col-md-4 col-lg">
        <div className="indsh">
        <Link href="/task/received">
            <a>
              <img src="/images/icon.svg" width="67"/>
              <p>Team Requests</p>
            </a>
          </Link>
        </div>
      </div>
      
      ) : 
      ''}

      <div className="col-6 col-md-4 col-lg">
        <div className="indsh">
        <Link href="/leaderboard">
          <a href="leaderboard.html">
            <img src="/images/leaderboard.svg" width="67"/>
            <p>Leaderboard</p>
          </a>
          </Link>
        </div>
      </div>
      <div className="col-6 col-md-4 col-lg">
        <div className="indsh cclb">
            <a target="_blank" href="https://forms.gle/vuXpwD1Hw9q8wY5C9">
              <img src="/images/campuscollabs.svg" width="67"/>
              <p>Campus  Collabs</p>
			  
            </a>
        </div>
      </div>
      <div className="col-6 col-md-4 col-lg">
        <div className="indsh tdbg">
        <Link href="/badges">
          <a>
            <img src="/images/badges.svg" width="67"/>
            <p>Tinder U Badges</p>
          </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

  <FooterDashboard />

  {/* Modal */}
  <div className="modal fade" id="exampleModalCenter14" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered badgesmodalsm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
         
          {badges && badges.map((badge) => (
                <>
                {badge.badge_type == "Rep Of The Month" ?
               
                <div className="col-6 col-md-6 col-lg-6 text-center">
                <img src="/images/badges/ROTM.png" className="earnbds" /> 
                <p>Rep Of The Month</p>
                </div>
               
                 : badge.badge_type == "Tweleb Material" ?
                 <div className="col-6 col-md-6 col-lg-6 text-center">
                 <img src="/images/badges/Tweleb.png" className="earnbds" /> 
                 <p>Tweleb Material</p>
                </div>
                 : badge.badge_type == "Creator OP" ?
                 <div className="col-6 col-md-6 col-lg-6 text-center">
                 <img src="/images/badges/Creator.png" className="earnbds" /> 
                 <p>Creator OP</p>
                 </div>
                 : badge.badge_type == "The Underdog" ?
                 <div className="col-6 col-md-6 col-lg-6 text-center">
                 <img src="/images/badges/Underdog.png" className="earnbds" /> 
                 <p>The Underdog</p>
                 </div>
                 : badge.badge_type == "Peak Creatiwitty" ?
                 <div className="col-6 col-md-6 col-lg-6 text-center">
                 <img src="/images/badges/Creatiwitty.png" className="earnbds" />
                 <p>Peak Creatiwitty</p>
                 </div> 
                 : badge.badge_type == "A1 Since Day 1" ?
                 <div className="col-6 col-md-6 col-lg-6 text-center">
                 <img src="/images/badges/A1_since_day1.png" className="earnbds" />
                 <p>A1 Since Day 1</p>
                 </div> 
                 : ''
                }

                </>               
            
          ))}

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

) : ""}

        </>
    );
};

export default Dashboard;