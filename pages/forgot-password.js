import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import {notification} from "antd";

const ForgotPassword = () =>{

    const [phone_no,setPhoneNo] = useState("");
    const [otp,setOTP] = useState("");
    const [mobd,setMOBD] = useState("block");
    const [mobdc,setMOBDC] = useState("none");
    const [otpd,setOTPD] = useState("none");
    const [code,setCode] = useState("");
    const [password,setPassword] = useState("");
    const [confirm_password,setConfirmPassword] = useState("");

    
    const [state, setState] = useContext(UserContext);
  
    const router = useRouter();

    useEffect(() => {

      if (window.localStorage.getItem("auth") !== null) {
        router.push("/user/dashboard");
      }

    }, []);

    

    const handleOTPSubmit = async(e) =>{
        e.preventDefault();
        
        if (otp == "") {
            openNotificationWithIcon('error','Please enter the OTP!');
            return false;
        }

        if (otp != code) {
            openNotificationWithIcon('error','Wrong OTP!');
            return false;
        }else{
            setOTPD("none");
            setMOBDC('block');
        }
    }

    
    const handleOTPCSubmit = async(e) =>{
        e.preventDefault();
        
        if (password == "") {
            openNotificationWithIcon('error','Please enter the password!');
            return false;
        }

        if (password.length < 6) {
            openNotificationWithIcon('error','Minimum password length must be six character!');
            return false;
        }

        if (confirm_password == "") {
            openNotificationWithIcon('error','Please enter the confirm password!');
            return false;
        }


        if (password != confirm_password) {
            openNotificationWithIcon('error',"Password and confirm password aren't matching!");
            return false;
        }

        try{
            const data = await axios.post(`/change-password`,{
                "phone_no":phone_no,
                "password":password,
            });

            if (data.data.status != "success") {
                openNotificationWithIcon('error',"Error!");
                return false;
            }else{

                openNotificationWithIconn('success',"Password has been changed successfully!");

                router.push("/login");

            }
    

        }
        catch(err){
            console.log(err);
            openNotificationWithIcon('error','Invalid request! Please try again.');
          }
        
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        if (phone_no == "") {
            openNotificationWithIcon('error','Please enter the mobile no!');
            return false;
        }


        if (phone_no.length < 10 || phone_no.length > 10) {
            openNotificationWithIcon('error','Mobile no length must be 10 digits!');
            return false;
        }

        try{
            const data = await axios.post(`/forgot-password`,{
                "phone_no":phone_no,
            });

            if (data.data.check_user_count == "0") {
                openNotificationWithIcon('error',"Account with "+phone_no+" doesn't exist!");
                return false;
            }else{

                setOTPD("block");
                setMOBD("none");
                setCode(data.data.remcode);

            }
    

            // window.localStorage.setItem("auth", JSON.stringify(data.data));
            
            // setState({
            //   auth: data.data,
            // });

            // router.push("/user/dashboard");

        }
        catch(err){
            console.log(err);
            openNotificationWithIcon('error','Invalid request! Please try again.');
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
	
    const openNotificationWithIconn = (type,msg) => {
        notification[type]({
          message: 'Success!',
          description:msg,
          duration: 12,
          placement: 'bottomRight',
          bottom: 65,
        });
      }

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
              <span>
                Forgot Password?
                  <img src="/tinderkb/images/signlongcomtxt.png" className="lvlups" /></span>
              </h3>
            </div>
            <form style={{"display":mobd}} onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                    value={phone_no}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    id="phone_no" 
                    type="text" 
                    className="form-control" 
                    placeholder="Mobile No*" 
                    name="phone_no" 
                />
              </div>
              
          
              <div className="submitctacenter text-center">
                <button type="submit" className="trasluccta">Get OTP</button>
              </div>

            </form>

            <form style={{"display":otpd}} onSubmit={handleOTPSubmit}>
              <div className="form-group">
                <input 
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    id="OTP" 
                    type="text" 
                    className="form-control" 
                    placeholder="OTP*" 
                    name="otp" 
                />
              </div>
          
              <div className="submitctacenter text-center">
                <button type="submit" className="trasluccta">Submit</button>
              </div>

            </form>

            <form style={{"display":mobdc}} onSubmit={handleOTPCSubmit}>
              <div className="form-group">
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" 
                    type="text" 
                    className="form-control" 
                    placeholder="Password*" 
                    name="password" 
                />
              </div>

              <div className="form-group">
                <input 
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirm_password" 
                    type="text" 
                    className="form-control" 
                    placeholder="Confirm Password*" 
                    name="confirm_password" 
                />
              </div>
              
          
              <div className="submitctacenter text-center">
                <button type="submit" className="trasluccta">Submit</button>
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

export default ForgotPassword;