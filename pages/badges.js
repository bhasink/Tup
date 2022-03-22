import { useContext,useState,useEffect } from "react";
import {UserContext} from "../context";
import FooterDashboard from "../components/footer/footer-dashboard";
import { useRouter } from "next/router";

const Badges = () => {

  const [state,setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {

    if(state == null){
      router.push("/login");
    }

  },[state && state.token]);
  
return(
<div>

  <section className="userinfowel badgeheds  d-flex align-items-center">
    <div className="container">
      <div className="singuptxthds rightsplsx">
        <img src="./images/tinderulogowht.png" />
      </div>
      <div className="profdtls">
        <div className="row">
          <div className="col-lg-12 text-center usdt mob-bt align-self-center uprcse">
            <h4>Tinder U Badges</h4>
            <p className="userrolls mx-auto col-lg-8 mt-3">Our way of giving a shoutout to the reps who slayed!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="taskars batchics">
    <div className="container">
      <div className="infotasks">
        <div className="taskpanels badgeinfos">
          <div className="dtltskarea">
            <div className="badgrels">
              <img src="./images/badges/ROTM.png" />
            </div>
            <div className="infnotif">
              <p className="tskttls">Rep Of The Month</p>
              <p className="cominfonotf">
                The one who understood ALL the assignments and got the top spot on the task-board. 
              </p>
            </div>
          </div>
        </div>
        <div className="taskpanels badgeinfos">
          <div className="dtltskarea">
            <div className="badgrels">
              <img src="./images/badges/Tweleb.png" />
            </div>
            <div className="infnotif">
              <p className="tskttls">Tweleb Material</p>
              <p className="cominfonotf">
                Well deserved to the rep whose tweet game speaks for itself and so do the RTs!
              </p>
            </div>
          </div>
        </div>
        <div className="taskpanels badgeinfos">
          <div className="dtltskarea">
            <div className="badgrels">
              <img src="./images/badges/Creator.png" />
            </div>
            <div className="infnotif">
              <p className="tskttls">Creator OP</p>
              <p className="cominfonotf">
               The rep who eats, sleeps and breathes #content!
              </p>
            </div>
          </div>
        </div>
        <div className="taskpanels badgeinfos">
          <div className="dtltskarea">
            <div className="badgrels">
              <img src="./images/badges/Underdog.png" />
            </div>
            <div className="infnotif">
              <p className="tskttls">The Underdog</p>
              <p className="cominfonotf">
              Kudos to the wild card of the rep universe who rises to glory when you least expect it.
              </p>
            </div>
          </div>
        </div>
		
		
		<div className="taskpanels badgeinfos">
          <div className="dtltskarea">
            <div className="badgrels">
              <img src="./images/badges/Creatiwitty.png" />
            </div>
            <div className="infnotif">
              <p className="tskttls">Peak Creatiwitty</p>
              <p className="cominfonotf">
               The chef whose ideas are the perfect mix of creativity and wit with a dash of sass!
              </p>
            </div>
          </div>
        </div>
		
		
		<div className="taskpanels badgeinfos">
          <div className="dtltskarea">
            <div className="badgrels">
              <img src="./images/badges/A1_since_day1.png" />
            </div>
            <div className="infnotif">
              <p className="tskttls">A1 Since Day 1</p>
              <p className="cominfonotf">
                Cheers to the rep whose consistency is the only constant we need, a.k.a Life of EVERY party.
              </p>
            </div>
          </div>
        </div>
		
      </div>
    </div>
  </section>

  <FooterDashboard />

</div>

  );
}

export default Badges;