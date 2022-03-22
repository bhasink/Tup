import { useContext,useState,useEffect } from "react";
import {UserContext} from "../context";
import axios from "axios";
import FooterDashboard from "../components/footer/footer-dashboard";
import { useRouter } from "next/router";

const Leaderboard = () =>{

    const [state,setState] = useContext(UserContext);
    const [leaderBoardUser,setleaderBoardUser] = useState([]);
    const [leaderBoardFirstUser,setLeaderBoardFirstUser] = useState([]);
    const [city,setCity] = useState(null);

    const router = useRouter();

    useEffect(() => {

        if(state == null){
          router.push("/login");
        }

        if(state && state.token){
          leaderboard();
        }
      },[state && state.token]);

    const leaderboard_user = async (event) => {
      
      setCity(event.target.value);

      try{
        const {data} = await axios.get(`/get-leaderboard/${event.target.value}`);
        setleaderBoardUser(data.get_leaderboard_user);
        setLeaderBoardFirstUser(data.get_leaderboard_user[0]);
      }
        catch(err){
            console.log(err);
        }
    };

    const leaderboard = async () => {
        try{
          const {data} = await axios.get('/get-leaderboard/kb');
          setleaderBoardUser(data.get_leaderboard_user);
          setLeaderBoardFirstUser(data.get_leaderboard_user[0]);
        }
        catch(err){
            console.log(err);
        }
    };


    return(
        
<>

{ state != null ? (

<div>

  <section className="userinfowel leadonlyinfos">
    <div className="container">
      <div className="profdtls ">
        <div className="singuptxthds rightsplsx">
          <img src="./images/tinderulogowht.png" />
        </div>
        <div className="row">
          <div className="col-lg-12 text-center usdt mob-bt uprcse">
            <h4>Leaderboard</h4>
            <p className="userrolls">{city == null ? "All India" : city == "kb" ? "All India" : city}</p>
          </div>
          <div className="col-8 col-lg-6 usdt align-self-center">
            <h4>{leaderBoardFirstUser.name}</h4>
            <p className="userrolls">{leaderBoardFirstUser.points !=null ? leaderBoardFirstUser.points : 0} Points</p>
          </div>
          <div className="col-4 col-lg-6 profilepcs  corwninf align-self-center pt-0">
            <img src="./images/kingcrown.png" className="plccrns" />

            {leaderBoardFirstUser.profile_img == null ? (
                        <img src={`/images/user1.png`} />
                      ) : (
                        <img src={`https://tinderu.youthbeat.in/uploads/profile_pic/${leaderBoardFirstUser.profile_img}`} />
                      )}
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="leadboardars">
    <div className="container">
      <div className="searchlisd">
        <form>
          <div className="form-group">				

            <select onChange={leaderboard_user}  className="form-control selectcity" name="city" id="city">
              <option value="">--Select City--</option>
              <option value="kb">All India</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
              <option value="Dehradun">Dehradun</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Manipal">Manipal</option>
              <option value="Jaipur">Jaipur</option>
            </select>
          </div>
        </form>
      </div>
      <div className="resultdtas">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Rep</th>
              <th scope="col">Points</th>
              <th scope="col">Badges</th>
            </tr>
          </thead>
          <tbody>

          {leaderBoardUser && leaderBoardUser.map((leaderBoardUsers,key) => (

            <tr>
              <td scope="row">
                  {key ==0 ? (
                <img src="./images/goldfirst.png" width="20"/>
                  ) : key ==1 ? (
                <img src="./images/silversecon.png" width="20"/>
                   ) : key ==2 ? (
                <img src="./images/brozesecon.png" width="20"/>
                    ) : key+1 }
              </td>
              <td>
                <div className="profdata">
                  <div className="thmdpr">
                      {leaderBoardUsers.profile_img == null ? (
                        <img src={`/images/user1.png`} width="32"/>
                      ) : (
                        <img src={`https://tinderu.youthbeat.in/uploads/profile_pic/${leaderBoardUsers.profile_img}`} width="32"/>
                      )}
                  </div>
                  <div className="prodls">
                    <p>{leaderBoardUsers.name}</p>
                    <p className="placedsd">{leaderBoardUsers.city}</p>
                  </div>
                </div>
              </td>
              <td>{leaderBoardUsers.points !=null ? leaderBoardUsers.points : 0}</td>
              <td>{leaderBoardUsers.badges.length}</td>
            </tr>

          ))}
         
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <FooterDashboard />

  </div>
   
) : ""}

</>

    );
};

export default Leaderboard;