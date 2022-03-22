import Link from "next/link";
import { useRouter } from "next/router";

// import Pusher from 'pusher-js';
// import { NotificationOutlined } from '@ant-design/icons';
// import { Badge } from 'antd';
// import { useState } from "react";

const FooterDashboard = () => {
  
  const router = useRouter();

  // const [count,setCount] = useState("");

  // var pusher = new Pusher('728db8a0786698768f04', {
  //   encrypted: true,
  //   cluster: 'ap2'
  // });


  // const channel = pusher.subscribe('stataus-liked');  

  // channel.bind('App\\Events\\StatusLiked', function(data) {
  //   setCount(data.username);
  //   console.log(data);
  //   });

    return(
        
    <footer className="sitefootes">
    <div className="blackpart">
      <div className="container">
      <ul className="navbar-nav" id="menu-center">
        <li className={router.pathname == "/task/received/[_id]" || router.pathname == "/task/reviewed" || router.pathname == "/task/received" || router.pathname == "/badges" || router.pathname == "/leaderboard" || router.pathname == "/user/dashboard" || router.pathname == "/user/task" || router.pathname == "/user/completed-task" ? "nav-item active" : "nav-item"} >
            <Link href="/user/dashboard" >
                
                <a><img src="/tinderkb/images/homeicon.svg" width="25"/></a>
                
            </Link>
			{/* <p className="hvrbtn">Home</p> */}
            </li>
            <li className={router.pathname == "/user/my-team" || router.pathname == "/user/my-team/[_id]" ? "nav-item gropsc active" : "nav-item  gropsc"}>
                <Link href="/user/my-team" >
                <a className=""><img src="/tinderkb/images/myteam.svg" width="25"/></a>
                </Link>
				{/* <p className="hvrbtn">My Team</p> */}
            </li>
            <li className={router.pathname == "/user/my-profile" || router.pathname == "/user/edit-profile" ? "nav-item active" : "nav-item"}>
              <Link href="/user/my-profile" >
                <a href="/join-now"><img src="/tinderkb/images/person.svg" width="25"/></a>
              </Link>
			  { /*  <p className="hvrbtn noanims">My Profile</p> */ }
            </li>

            {/* <li className="nav-item ">
            <Link href="/user/my-profile" >
                <a href="/join-now"><img src="/tinderkb/images/notification.svg" width="25"/></a>
              </Link>
            </li> */}
          </ul>
      </div>
    </div>
  </footer>

    );

};

export default FooterDashboard;