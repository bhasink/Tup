import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../../context'
import axios from 'axios'
import FooterDashboard from '../../../components/footer/footer-dashboard'
import { useRouter } from 'next/router'
import moment from 'moment'
import { Modal, notification } from 'antd'

const TaskId = () => {
  const [state, setState] = useContext(UserContext)
  const [task_req, setTaskReq] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisibleReject, setIsModalVisibleReject] = useState(false)
  const [comment, setComment] = useState([])
  const [points, setPoints] = useState([])
  const [req_id, setReqID] = useState('')
  const [index, setIndex] = useState('')
  const router = useRouter()
  const _id = router.query._id

  useEffect(() => {
    if (state == null) {
      router.push('/login')
    }

    if (_id) taskReq()
  }, [_id])

  const taskReq = async () => {
    try {
      const { data } = await axios.get(`/get-task-request/${_id}`)
      setTaskReq(data.task_req)
    } catch (err) {
      console.log(err)
    }
  }

  const reject_task = (req_id, i) => {
    if (typeof comment[i] === 'undefined') {
      openNotificationWithIcon('error', 'Please enter the comment!')
      return false
    }

    if (typeof points[i] === 'undefined') {
      openNotificationWithIcon('error', 'Please enter the points!')
      return false
    }

    if (comment[i] == '') {
      openNotificationWithIcon('error', 'Please enter the comment!')
      return false
    }

    if (points[i] == '') {
      openNotificationWithIcon('error', 'Please enter the points!')
      return false
    }

    setIsModalVisibleReject(true)
    setReqID(req_id)
    setIndex(i)
  }

  const approve_task = (req_id, i) => {

    const re = /^[0-9\b]+$/;

    if (typeof points[i] === 'undefined') {
      openNotificationWithIcon('error', 'Please enter the points!')
      return false
    }

    if (points[i] == '') {
      openNotificationWithIcon('error', 'Please enter the points!')
      return false
    }


    if (!re.test(points[i])) {
        openNotificationWithIcon('error', 'Please enter number only!')
        return false
    }
    

    setIsModalVisible(true)
    setReqID(req_id)
    setIndex(i)
  }

  const handleOk = async () => {
    setIsModalVisible(false)
    try {
      const data = await axios.post(`/task-req-accept/${req_id}`, {
        comment: comment[index],
        points: points[index],
      })

      setPoints([])
      setComment([])
      openNotificationWithIcon('success', 'Task accepted successfully!')
      taskReq()
    } catch (err) {
      console.log(err)
    }
  }

  const handleOkReject = async () => {
    setIsModalVisibleReject(false)
    try {
      const data = await axios.post(`/task-req-reject/${req_id}`, {
        comment: comment[index],
        points: 0,
      })

      console.log(data)
      setPoints([])
      setComment([])
      openNotificationWithIcon('error', 'Task rejected successfully!')
      taskReq()
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const updatePoints = (point, i) => {
    const newPoints = [...points]
    newPoints[i] = point
    setPoints(newPoints)
  }

  const updateComments = (comm, i) => {
    const newComment = [...comment]
    newComment[i] = comm
    setComment(newComment)
  }

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: type.charAt(0).toUpperCase() + type.slice(1) + '!',
      description: msg,
      duration: 5,
      placement: 'bottomRight',
      bottom: 65,
    })
  }

  return (
    <>
      <section className="userinfowel myteamheads  d-flex align-items-center">
        <div className="container">
          <div className="singuptxthds rightsplsx">
            <img src="/images/tinderulogowht.png" />
          </div>
        </div>
      </section>

      <section className="reviewuserdta">
        <div className="container">
          <div className="reviewdatapl">
            <div className="row">
              {Object.keys(task_req).length == 0 && (
                <div
                  style={{
                    width: '100%',
                    height: '50vh',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '16px' }}>No task request available!</p>
                </div>
              )}

              {task_req &&
                task_req.map((t_req, i) => (
                  <div key={t_req.id} className="col-lg-6">
                    <div className="dflsre">
                      {t_req.user[0].profile_img == null ? (
                        <img src="/images/user1.png" className="thmbur" />
                      ) : (
                        <img
                          src={`https://tinderu.youthbeat.in/uploads/profile_pic/${t_req.user[0].profile_img}`}
                          className="thmbur"
                        />
                      )}
                      <div className="usinfs">
                        <h3>{t_req.user[0].name}</h3>
                        <p className="statustskd">
                          <span>Submitted On:</span>{' '}
                          {moment(t_req.created_at).format('MMM, Do YY')}
                        </p>
                      </div>
                    </div>
                    <div className="activityinfos">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">File name</th>
                            {/* <th scope="col">File type</th> */}
                            <th scope="col">View/Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          {t_req.files &&
                            JSON.parse(t_req.files).map((file, index) => (
                              <>
                                <tr key={file.uid}>
                                  <td>
                                    <div className="profdata">
                                      <div className="prodls">
                                        <p>
                                          {index + 1}. {file.name}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  {/* <td>
                                    <div className="prodls">
                                      <p
                                        title={
                                          file.type.substring(0, 8) + '...'
                                        }
                                      >
                                        {file.type.substring(0, 8) + '...'}{' '}
                                      </p>
                                    </div>
                                  </td> */}
                                  <td>
                                    <div className="ptac">
                                      <a
                                        target="_blank"
                                        href={file.response.url}
                                        className="dwltype"
                                      >
                                        Download
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="commnsect">
                      <label>Add Comments</label>
                      <input
                        key={t_req.id}
                        value={comment[i]}
                        onChange={(e) => updateComments(e.target.value, i)}
                        type="text"
                        placeholder="Your comments"
                      />
                      <div className="pointsifld">
                        <input
                          key={t_req.id}
                          inputMode="numeric"
                          value={points[i]}
                          onChange={(e) => updatePoints(e.target.value, i)}
                          type="text"
                          className="form-control"
                          placeholder="Enter the points (0-50)"
                        />
                      </div>
                      <div className="responsctas">
                        <button
                          onClick={() => reject_task(t_req.id, i)}
                          className="canclrej"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => approve_task(t_req.id, i)}
                          className="gogreensap"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Modal
        color="green"
        title="Approve Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="usinfs">
          <p style={{ fontSize: '16px' }}>Are you sure?</p>
        </div>
      </Modal>

      <Modal
        color="red"
        title="Reject Task"
        visible={isModalVisibleReject}
        onOk={handleOkReject}
        onCancel={handleCancel}
      >
        <div className="usinfs">
          <p style={{ fontSize: '16px' }}>Are you sure?</p>
        </div>
      </Modal>

      <FooterDashboard />
    </>
  )
}

export default TaskId
