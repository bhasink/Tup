import Link from "next/link";

const Home = () => {
  
  return (
    
  <div>

  <section className="tinderhmbanner  d-flex align-items-center ">
    <img src="/tinderkb/images/mainbanner.jpg" className="desktopqual" />
    <img src="/tinderkb/images/mainbannermobile.jpg" className="mobilequal" />
    <div className="col-lg-12 midcontents text-center d-flex  align-self-center flex-column">
      <img src="/tinderkb/images/tinderu-campus-rep_logo.svg" />
    </div>
  </section>
  { /*<section className="pinkstripsd">
    <div className="container text-center">
	 <h5 className="submds">Apply Now or Regret Forever. Applications close on 23rd September 2021!</h5> 
    </div>
  </section> */ }
  <section className="lvlupcollr lightgrys">
    <div className="container">
      <div className="mainheadstop">
        <h3 className="subhdblack">
          <img src="/tinderkb/images/tinderui.png" className="tuhds" /><br />
          Ready Set #LevelUp
        </h3>
        <p className="mx-auto col-md-10 p-0 simis mb-0" style={{}}>Lets start something epic and paint the town Tinder as you have made it to the coolest campus crew. We welcome all the social birds, the go-getters and super motivated beings, who will be representing the essence of our brand in and around their college. </p>
      </div>
      <div className="collrges">
        <img src="/tinderkb/images/imagecollarge.jpg" className="dektpshow" />
        <img src="/tinderkb/images/mobilecollarge.png" className="mobshow" />
      </div>
    </div>
  </section>
  <section className="meetourmnt grdpinbgsa darktct">
    <div className="container">
      <div className="mainheadstop">
        <h3 className="subhdblack">
          <img src="/tinderkb/images/tumnt.png" className="tumntors" /><br />
          Meet Your <span>Mentors<br /><img src="/tinderkb/images/drwalnd.png" /></span>
        </h3>
        <p className="taglnsd mx-auto ftimps">Get live sessions from the OGs who broke the internet</p>
      </div>
    </div>
    <div className="mentorsslidars">
      <div className="container">
        <div className="threegridscrls">
          <div className="row">
            <div className="col-lg-4 col-md-4 bdrplya">
              <a target="_blank" href="https://www.instagram.com/mojorojo/?hl=en"><img src="/tinderkb/images/postinsta/11.jpg" /></a>
            </div>
            <div className="col-lg-4 col-md-4 bdrplya">
              <a target="_blank" href="https://www.instagram.com/dollysingh/?hl=en"><img src="/tinderkb/images/postinsta/2.jpg" /></a>
            </div>
            <div className="col-lg-4 col-md-4 bdrplya">
              <a target="_blank" href="https://www.instagram.com/thevishnukaushal/?hl=en"><img src="/tinderkb/images/postinsta/3.jpg" /></a>
            </div>
          </div>
        </div>
        <div className="mobsldsshow">
          <div className="mntaresfl owl-carousel owl-theme ">
            <div className="item">
              <a target="_blank" href="https://www.instagram.com/mojorojo/?hl=en"><img src="/tinderkb/images/postinsta/11.jpg" /></a>
            </div>
            <div className="item">
              <a target="_blank" href="https://www.instagram.com/dollysingh/?hl=en"><img src="/tinderkb/images/postinsta/2.jpg" /></a>
            </div>
            <div className="item">
              <a target="_blank" href="https://www.instagram.com/thevishnukaushal/?hl=en"><img src="/tinderkb/images/postinsta/3.jpg" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="collargeares lightgrys">
    <div className="container">
      <div className="mainheadstop">
        <h3 className="subhdblack pnkhd">
          <img src="/tinderkb/images/staytze.png" className="slyngd" /><br />
          At Tinder U, we lived our<br />
          college life without going IRL
        </h3>
      </div>
      <div className="collargeswithtab">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="pills-freshaf" data-toggle="tab" href="#freshaf" role="tab" aria-controls="freshaf" aria-selected="true">
              <p>Fresh AF</p></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="pills-grad-tab" data-toggle="tab" href="#grad" role="tab" aria-controls="grad" aria-selected="false">
              <p>Grad</p></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="pills-stayathome-tab" data-toggle="tab" href="#stayathome" role="tab" aria-controls="stayathome" aria-selected="false">
              <p>Slay at home</p></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="pills-swipenight-tab" data-toggle="tab" href="#swipenight" role="tab" aria-controls="swipenight" aria-selected="false">
              <p>Swipe Night</p></a>
          </li>
        </ul>
      </div>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="freshaf" role="tabpanel" aria-labelledby="freshaf-tab">
          <div className="imgclgcent">
            <img src="/tinderkb/images/collrge/Fresh-Af-collage.jpg" />
          </div>
        </div>
        <div className="tab-pane fade" id="grad" role="tabpanel" aria-labelledby="grad-tab">
          <div className="imgclgcent">
            <img src="/tinderkb/images/collrge/Grad-collage.jpg" />
          </div>
        </div>
        <div className="tab-pane fade" id="stayathome" role="tabpanel" aria-labelledby="stayathome-tab">
          <div className="imgclgcent">
            <img src="/tinderkb/images/collrge/Slay-at-home-collage.jpg" />
          </div>
        </div>
        <div className="tab-pane fade" id="swipenight" role="tabpanel" aria-labelledby="swipenight-tab">
          <div className="imgclgcent">
            <img src="/tinderkb/images/collrge/Swipe-night-collage.jpg" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="tndighere grdpinbgsa darktct">
    <div className="container">
      <div className="mainheadstop">
        <h3 className="subhdblack">
          <img src="/tinderkb/images/tinderugig.png" className="tumntors tugiigs" /><br />
          <span>Here’s our lit IG feed <img src="/tinderkb/images/fireicons.png" className="emohsa" /></span>
        </h3>
      </div>
      <div className="igfeedous">
        <div className="row">
          <div className="col-6 col-lg-3">
            <img src="/tinderkb/images/igfeeds/1.jpg" />
          </div>
          <div className="col-6 col-lg-3">
            <img src="/tinderkb/images/igfeeds/2.jpg" />
          </div>
          <div className="col-6 col-lg-3">
            <img src="/tinderkb/images/igfeeds/3.jpg" />
          </div>
          <div className="col-6 col-lg-3">
            <img src="/tinderkb/images/igfeeds/4.jpg" />
          </div>
        </div>
      </div>
      <div className="followmids">
        <a target="_blank" href="https://www.instagram.com/tinderu_india/?hl=en" className="applycta transpabuts">Follow Us</a>
      </div>
    </div>
  </section>
  <footer className="sitefootes">
    <div className="blackpart">
      <div className="container">
        <ul className="navbar-nav" id="menu-center">
          
          <li className="nav-item active">
            <Link href="/" >
                <a><img src="/tinderkb/images/homeicon.svg" /></a>
            </Link>
			{ /* <p className="hvrbtn">Home</p> */ }

            </li>
            

            <li className="nav-item">
                <Link href="/ourvibe" >
                    <a><img src="/tinderkb/images/Flame.svg" /></a>
                </Link>
				{ /* <p className="hvrbtn">Our Vibe</p> */ }

            </li>


            <li className="nav-item">
            <Link href="/join-now">
                <a><img src="/tinderkb/images/person.svg" /></a>
            </Link>
			{ /* <p className="hvrbtn">Login</p> */ }
            </li>
            
        </ul>
      </div>
    </div>
  </footer>
</div>


    );
};

export default Home;