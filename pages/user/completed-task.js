import { useContext,useState,useEffect } from "react";
import  {UserContext} from "../../context";
import axios from "axios";
import FooterDashboard from "../../components/footer/footer-dashboard";
import Nav from "../../components/Nav";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

const CompletedTask = () => {

    const [state,setState] = useContext(UserContext);
    const [tasks,setTasks] = useState([]);
    const router = useRouter();


    useEffect(() =>{

        if(state == null){
          router.push("/login");
        }

        if(state && state.token){
          getAllTasks();
        }
    },[state]);


    const getAllTasks = async() =>{
        try{
            const {data} = await axios.get("/check-task");
            setTasks(data.task);
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    };


    return (

        <>

{ state != null ? (

<div>
        
    <div>
 
    <Nav />

  <section className="taskars">
    <div className="container">
      <div className="infotasks">
        <div className="lnkstsks">
          <ul>

            <li>
                <Link href="/user/task">
                    <a>Current Tasks</a>
                </Link>
            </li>

            <li>
                <Link href="/user/completed-task">
                    <a className="active">Completed Tasks</a> 
                </Link>
            </li>
            
          </ul>
        </div>


        {tasks && tasks.map((task) => (

            

        <div className="taskpanels nobonus">
           
          <div className="dtltskarea">
            <div className="infnotif">
              <div className="poontsearns">
                <p>
                    {task.task_status == 2 ? (
                        <i className="fal fa-minus" />
                        ): 
                        (
                        <p>{task.points}</p>
                    )}                
                </p>
              </div>
              <p className="tskdates">Date: {moment(task.created_at).format("MMM, Do YY") }</p>
              <p className="tskttls comtasknot">{task.task_name}</p>
              <div className="infprogtsk">
                <p className="statustskd">
                  <span>Status:</span> 
                {task.task_status == 2 ? (
                    <span className="inrevs"> In Review <img src="/images/inrev.png" /></span>
                    ): task.task_status == 3 ?
                    (
                        <span className="inrevs rjcno"> Rejected <img src="/images/crossrej.png" /></span>
                    ) :
                    (
                    <span className="inrevs okgo"> Approved <img src="/images/checkok.png" /></span>
                )}
                </p>

                {task.is_imp == "badge" && (
                    <div className="resltears">
                        <span>Badge:</span>
                        
                        {task.badge_type == "Rep Of The Month" ?
                 <img src="/images/badges/ROTM.png" className="earnbds" /> : task.badge_type == "Tweleb Material" ?
                 <img src="/images/badges/Tweleb.png" className="earnbds" /> : task.badge_type == "Creator OP" ?
                 <img src="/images/badges/Creator.png" className="earnbds" /> : task.badge_type == "The Underdog" ?
                 <img src="/images/badges/Underdog.png" className="earnbds" /> : task.badge_type == "Peak Creatiwitty" ?
                 <img src="/images/badges/Creatiwitty.png" className="earnbds" /> : task.badge_type == "A1 Since Day 1" ?
                 <img src="/images/badges/A1_since_day1.png" className="earnbds" /> : ''
                }    
                     
                    </div>
                )}
               
              </div>
              {task.task_status == 3 && (
                <div className="resltears mt-3">
                   <p><span>Comments: </span>{task.comments}</p>
                </div>
              )}
             
            </div>
          </div>
        </div>
        
        ))} 
        

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

export default CompletedTask;