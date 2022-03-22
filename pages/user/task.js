import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context'
import axios from 'axios'
import FooterDashboard from '../../components/footer/footer-dashboard'
import Nav from '../../components/Nav'
import Link from 'next/link'
import Pusher from 'pusher-js'
import { Upload, message, notification } from 'antd'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'
import renderHTML from 'react-render-html'
import moment from 'moment'
const { Dragger } = Upload

const Task = () => {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useContext(UserContext)
  const [tasks, setTasks] = useState([])
  const [noTask, setNoTask] = useState('')
  const [fileList, setFileList] = useState({})
  const todayDate = moment().unix()
  const [fl,setFl] = useState([])
  const token = state && state.token ? state.token : ''
  const router = useRouter()

  useEffect(() => {
    if (state == null) {
      router.push('/login')
    }

    if (state && state.token) {
      getAllTasks()
    }
  }, [state && state.token])

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get('/get-task')
      setTasks(data.task)

      if (data.task.length == 0) {
        setNoTask('No task available!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  var pusher = new Pusher('728db8a0786698768f04', {
    encrypted: true,
    cluster: 'ap2',
  })

  const channel = pusher.subscribe('stataus-liked')

  channel.bind('App\\Events\\StatusLiked', function (data) {
    setTasks(data.user_task)
  })

  const props = {
    name: 'image',
    multiple: true,
    action: 'https://tinderu.youthbeat.in/api/upload-files',
    headers: {
      authorization: `Bearer ${token}`,
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const handleImageChange = (info,i) =>{
   
      const { status } = info.file
      if (status !== 'uploading') {
      }

      const newFl = [...fl];
      newFl[i] =  info.fileList;
      setFl(newFl);

      setFileList(info.fileList)
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
  }

  const handleSubmit = async (postId) => {
    setLoading(true)

    try {
      const { data } = await axios.post(`/save-task/${state.data.id}`, {
        fileList,
        post_id: postId,
      })

      notification['success']({
        message: 'Success!',
        description:
          'Thanks for submitting your task! We will review and share the result/feedback soon.',
        duration: 4,
        placement: 'bottomRight',
        bottom: 65,
      })

      setLoading(false)

      router.push('/user/completed-task')
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      {state != null ? (
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
                          <a className="active">Current Tasks</a>
                        </Link>
                      </li>

                      <li>
                        <Link href="/user/completed-task">
                          <a>Completed Tasks</a>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div style={{ textAlign: 'center' }}>{noTask}</div>

                  {tasks &&
                    tasks.map((task,i) => (
                      <div key={task.id} className="taskpanels">
                        {task.is_imp == 'badge' ? (
                          <div className="bonusbdge">
                            <p>Badge Task</p>
                          </div>
                        ) : task.is_imp == 'on' ? (
                          <div className="bonusbdge">
                            <p>Bonus Task</p>
                          </div>
                        ) : (
                          ''
                        )}

                        <div className="dtltskarea">
                          <div className="infnotif">
                            <p className="tskttls">{task.task_name}</p>

                            {moment(task.task_expiry).unix() < todayDate ? (
                              <>
                                <p className="ddlnrednor">
                                  You’ve missed the deadline. But you can still
                                  submit to fetch some points.
                                </p>
                              </>
                            ) : (
                              ''
                            )}

                            <p className="ddln">
                              Deadline:{' '}
                              {moment(task.task_expiry).format('MMM, Do YY')}
                            </p>
                            <p className="cominfonotf">
                              {renderHTML(task.task_desc)}
                            </p>
                          </div>

                          {task.is_imp == 'badge' ? (
                            <div className="badgrels pointcolm">
                              {task.badge_type == 'Rep Of The Month' ? (
                                <img
                                  src="/images/badges/ROTM.png"
                                  className="earnbds"
                                />
                              ) : task.badge_type == 'Tweleb Material' ? (
                                <img
                                  src="/images/badges/Tweleb.png"
                                  className="earnbds"
                                />
                              ) : task.badge_type == 'Creator OP' ? (
                                <img
                                  src="/images/badges/Creator.png"
                                  className="earnbds"
                                />
                              ) : task.badge_type == 'The Underdog' ? (
                                <img
                                  src="/images/badges/Underdog.png"
                                  className="earnbds"
                                />
                              ) : task.badge_type == 'Peak Creatiwitty' ? (
                                <img
                                  src="/images/badges/Creatiwitty.png"
                                  className="earnbds"
                                />
                              ) : task.badge_type == 'A1 Since Day 1' ? (
                                <img
                                  src="/images/badges/A1_since_day1.png"
                                  className="earnbds"
                                />
                              ) : (
                                ''
                              )}
                            </div>
                          ) : task.is_imp == 'on' ? (
                            <div className="badgrels bpointcol">
                              <p>{task.task_points} Points</p>
                            </div>
                          ) : (
                            <div className="badgrels pointcol">
                              <p>{task.task_points} Points</p>
                            </div>
                          )}
                        </div>
                        <div className="taskupldas">
                          <a
                            data-toggle="collapse"
                            href={`#collapseExample${task.id}`}
                            role="button"
                            aria-expanded="false"
                            aria-controls={`collapseExample${task.id}`}
                          >
                            Submit your task{' '}
                            <i className="fal fa-chevron-down" />
                          </a>
                          <div
                            className="collapse"
                            id={`collapseExample${task.id}`}
                          >
                            <p className="droptxtupl">Upload proof</p>

                            <Dragger onChange={(event) => handleImageChange(event,i)} {...props}>
                              <div class="bgups">
                                <img src="/images/uploadplace.png" />
                              </div>
                              <span className="choose-file-button">
                                Drag and drop, or
                              </span>{' '}
                              <span className="file-message">browse</span>
                            </Dragger>

                            <div className="form-group text-center kk mt-4">
                             
                            {fl && typeof fl[i] !== 'undefined' && fl[i].length !=0 ? (                              

                              <button
                                onClick={() => handleSubmit(task.id)}
                                type="submit"
                                className="themesub kbks"
                              >
                                {loading ? <LoadingOutlined /> : ''}
                                Submit
                              </button>

                            ) 
                            : 'Please upload the files!'}  

                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>

            <FooterDashboard />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default Task