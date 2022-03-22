import { useState, useContext, useEffect } from 'react'
import FooterDashboard from '../../components/footer/footer-dashboard'
import { UserContext } from '../../context'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import { Upload, notification } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useRouter } from 'next/router'

const EditMyProfile = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [instaurl, setInstaurl] = useState('')
  const [twitterurl, setTwitterurl] = useState('')
  const [facebookurl, setFacebookurl] = useState('')
  const [password, setPassword] = useState('')
  const [profileimg, setProfileimg] = useState({})
  const [uploading, setUploading] = useState(false)
  const [profile, setProfile] = useState({})

  //state
  const [state, setState] = useContext(UserContext)
  //router
  const router = useRouter()

  useEffect(() => {
    if (state == null) {
      router.push('/login')
    }

    if (state && state.token) {
      userProfile()
    }
  }, [state && state.token])

  const handleImage = async (e) => {
    const file = e.file.originFileObj

    let formData = new FormData()
    formData.append('image', file)

    console.log(file)

    setUploading(true)

    try {
      const { data } = await axios.post('/upload-image', formData)

      console.log(data)

      setUploading(false)

      userProfile()

      let auth = JSON.parse(localStorage.getItem('auth'))
      auth.data = data.authenticated_user
      localStorage.setItem('auth', JSON.stringify(auth))
      setState(JSON.parse(window.localStorage.getItem('auth')))
    } catch (err) {
      console.log(err)
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.post(`/update-profile`, {
        name,
        email,
        password,
        city: location,
        phone_no: phone,
        bio,
        ig_link: instaurl,
        twitter_link: twitterurl,
        profile_img: profileimg,
        facebook_link: facebookurl,
      })

      let auth = JSON.parse(localStorage.getItem('auth'))
      auth.data = data.authenticated_user
      localStorage.setItem('auth', JSON.stringify(auth))
      setState(JSON.parse(window.localStorage.getItem('auth')))

      notification['success']({
        message: 'success!',
        description: 'Your profile has been updated successfully!',
        duration: 4,
        placement: 'bottomRight',
        bottom: 65,
      })

      setLoading(false)

      router.push('/user/dashboard')
    } catch (err) {
      setLoading(false)
    }
  }

  const userProfile = async () => {
    try {
      const { data } = await axios.get('/user-profile')
      console.log(data)
      setProfile(data.authenticated_user)
      setName(data.authenticated_user.name)
      setEmail(data.authenticated_user.email)
      setPhone(data.authenticated_user.phone_no)
      setLocation(data.authenticated_user.city)
      setBio(data.authenticated_user.bio)
      setInstaurl(data.authenticated_user.ig_link)
      setTwitterurl(data.authenticated_user.twitter_link)
      setFacebookurl(data.authenticated_user.facebook_link)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {state != null ? (
        <div>
          <section className="userinfowel profileeditfs">
            <div className="container">
              <div className="profdtls ">
                <div className="singuptxthds rightsplsx">
                  <img src="/images/tinderulogowht.png" />
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group profilepcs  corwninf text-center pt-5">
                    <div className="uploadths">
                      {Object.keys(profile).length != 0 && (
                        <>
                          {profile && profile.profile_img == null ? (
                            <img src={`/images/user1.png`} id="output" />
                          ) : (
                            <img
                              src={`https://tinderu.youthbeat.in/uploads/profile_pic/${profile.profile_img}`}
                              id="output"
                            />
                          )}

                          <ImgCrop
                            rotate
                            shape="round"
                            quality={1}
                            className="uploaics"
                          >
                            <Upload
                              showUploadList={false}
                              showUploadList={false}
                              maxCount={1}
                              onChange={handleImage}
                            >
                              {uploading ? (
                                <LoadingOutlined className="cmics" />
                              ) : (
                                <img
                                  src="/images/camicon.png"
                                  className="cmics"
                                />
                              )}
                            </Upload>
                          </ImgCrop>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="editfil">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Name<span className="er">*</span>
                      </label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Email<span className="er">*</span>
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Phone<span className="er">*</span>
                      </label>
                      <input
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        type="text"
                        className="form-control"
                        placeholder="Enter Number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Location</label>
                      <input
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        type="text"
                        className="form-control"
                        placeholder="Enter Location"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Bio</label>
                      <textarea
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        type="text"
                        className="form-control"
                        placeholder="Enter Bio Description"
                      />
                    </div>
                    <div className="form-group extur">
                      <label htmlFor="exampleFormControlInput1">
                        External links
                      </label>
                      <input
                        onChange={(e) => setInstaurl(e.target.value)}
                        value={instaurl}
                        type="text"
                        className="form-control"
                        placeholder="Instagram URL"
                      />
                      <input
                        onChange={(e) => setTwitterurl(e.target.value)}
                        value={twitterurl}
                        type="text"
                        className="form-control"
                        placeholder="Twitter URL"
                      />
                      <input
                        onChange={(e) => setFacebookurl(e.target.value)}
                        value={facebookurl}
                        type="text"
                        className="form-control"
                        placeholder="Tinder URL"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Change password
                      </label>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="*********"
                      />
                    </div>
                    <div className="form-group text-center kk">
                      <button type="submit" className="themesub kbk">
                        {loading ? <LoadingOutlined /> : ''}
                        Save Changes
                      </button>
                    </div>

                    <br />
                    <br />
                  </div>
                </form>
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

export default EditMyProfile