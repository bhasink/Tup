import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../context'
import axios from 'axios'
import FooterDashboard from '../../components/footer/footer-dashboard'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MyProfile = () => {
  const [state, setState] = useContext(UserContext)
  const [profile, setProfile] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (state == null) {
      router.push('/login')
    }

    if (state && state.data) {
      userProfile()
    }
  }, [state && state.data])

  const logout = async () => {
    window.localStorage.removeItem('auth')
    setState(null)
    router.push('/login')
  }

  const userProfile = async () => {
    try {
      const { data } = await axios.get('/user-profile')
      console.log(data)
      setProfile(data.authenticated_user)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {state != null ? (
        <div>
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
                <div className="col-md-12 col-lg-6 nomob-pd edipro">
                  <div class="pictxholder">
                    <div className="profthmbs">
                      {Object.keys(profile).length != 0 && (
                        <>
                          {profile && profile.profile_img == null ? (
                            <img src={`/images/user1.png`} className="usrths" />
                          ) : (
                            <img
                              src={`https://tinderu.youthbeat.in/uploads/profile_pic/${profile.profile_img}`}
                              className="usrths"
                            />
                          )}
                        </>
                      )}
                    </div>
                    <Link href="/user/edit-profile">
                      <a className="edipen">
                        <img src="/images/editpro.png" className="iceds" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 align-self-center">
                  <div className="profacssd">
                    <h3>{profile && profile.name}</h3>
                    <ul className="lts">
                      <li>
                        <img src="/images/Designation.svg" width="12" />

                        {profile && profile.is_reps == 1
                          ? 'Team Leader'
                          : 'Campus Rep'}
                      </li>
                      <li>
                        <img src="/images/Gender.svg" width="12" />
                        {profile && profile.gender}
                      </li>
                      <li>
                        <img src="/images/location.svg" width="12" />
                        {profile && profile.city}
                      </li>
                    </ul>
                    <p>{profile && profile.bio}</p>
                    <ul className="drk">
                      <li>
                        <a href="#">
                          <img src="/images/tinder-profile.svg" width="10" />
                          {profile && profile.facebook_link != null
                            ? profile.facebook_link
                            : 'Not updated'}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/instagram.svg" width="10" />
                          {profile && profile.ig_link != null
                            ? profile.ig_link
                            : 'Not updated'}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/twitter.svg" width="10" />
                          {profile && profile.twitter_link != null
                            ? profile.twitter_link
                            : 'Not updated'}
                        </a>
                      </li>
                    </ul>

                    <ul className="loglns">
					{ /* <li>
                        <a href="#">
                          <img src="/images/legal.svg" width="15" /> Legal
                        </a>
                      </li>
                      <li>
                        <a href="#">
                        <img src="/images/swipenow.svg" width="15" />
                          Swipe Now
                        </a>
					</li> */ }
                      <li>
                        <a onClick={logout} href="#">
                          <img src="/images/logout.svg" width="15" /> Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FooterDashboard />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default MyProfile