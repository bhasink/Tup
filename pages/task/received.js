import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context'
import axios from 'axios'
import FooterDashboard from '../../components/footer/footer-dashboard'
import Nav from '../../components/Nav'
import Link from 'next/link'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { useRouter } from "next/router";

const Received = () => {
  const [state, setState] = useContext(UserContext)
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const todayDate = moment().unix()
  const router = useRouter();

  useEffect(() => {

    if(state == null){
      router.push("/login");
    }

    if (state && state.token) {
      getAllTasks()
    }
  }, [state])

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get('/task-request')
      setTasks(data.tasks)
      setUsers(data.users)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Nav />

      <section className="taskars">
        <div className="container">
          <div className="infotasks">
            <div className="lnkstsks recrevds">
              <ul>
                <li>
                  <Link href="received">
                    <a className="active">Received</a>
                  </Link>
                </li>
                <li>
                  <Link href="reviewed">
                    <a>Reviewed</a>
                  </Link>
                </li>
              </ul>
            </div>

            {tasks &&
              tasks.map((task) => (
                <div className="taskpanels">
                  <div className="dtltskarea">
                    <div className="infnotif">
                      <p className="tskttls">{task.task_name}</p>
                      <p className="ddln">
                        Deadline:{' '}
                        {moment(task.task_expiry).format('MMM, Do YY')}
                      </p>
                      <p className="cominfonotf">
                        {renderHTML(task.task_desc)}
                      </p>
                      <div className="infprogtsk usesbs">
                        <p className="statustskd">
                          <span>Submitted by:</span>
                        </p>
                        <div className="userstacksin">
                          <ul>
                            {Object.keys(task.users_task).length == 0
                              ? 'No one!'
                              : ''}

                            {task &&
                              task.users_task.map((user) => (
                                <>
                                  {user.user[0].profile_img == null ? (
                                    <li>
                                      <Link
                                        href={`/user/my-team/${user.user[0].id}`}
                                      >
                                        <img
                                          style={{
                                            borderRadius: '50%',
                                            width: '35px',
                                            height: '35px',
                                          }}
                                          src="/images/user1.png"
                                        />
                                      </Link>
                                    </li>
                                  ) : (
                                    <li>
                                      <Link
                                        href={`/user/my-team/${user.user[0].id}`}
                                      >
                                        <img
                                          style={{
                                            borderRadius: '50%',
                                            width: '35px',
                                            height: '35px',
                                          }}
                                          src={`https://tinderu.youthbeat.in/uploads/profile_pic/${user.user[0].profile_img}`}
                                        />
                                      </Link>
                                    </li>
                                  )}
                                </>
                              ))}
                          </ul>
                          {/* <a href="#">+4</a> */}
                        </div>
                      </div>
                      <div className="infprogtsk usesbs missddls">
                        <p className="statustskd">
                          <span>Missed the deadline:</span>
                        </p>
                        <div className="userstacksin">
                          <ul>
                            {task &&
                            moment(task.task_expiry).unix() < todayDate &&
                            Object.keys(task.users_task).length == 0 ? (
                              <>
                                {users &&
                                  users.map((user) => (
                                    <>
                                      {user.profile_img == null ? (
                                        <li>
                                          <Link
                                            href={`/user/my-team/${user.id}`}
                                          >
                                            <img
                                              style={{
                                                borderRadius: '50%',
                                                width: '35px',
                                                height: '35px',
                                              }}
                                              src="/images/user1.png"
                                            />
                                          </Link>
                                        </li>
                                      ) : (
                                        <li>
                                          <Link
                                            href={`/user/my-team/${user.id}`}
                                          >
                                            <img
                                              style={{
                                                borderRadius: '50%',
                                                width: '35px',
                                                height: '35px',
                                              }}
                                              src={`https://tinderu.youthbeat.in/uploads/profile_pic/${user.profile_img}`}
                                            />
                                          </Link>
                                        </li>
                                      )}
                                    </>
                                  ))}
                              </>
                            ) : (
                              <>
                                {task &&
                                moment(task.task_expiry).unix() < todayDate ? (
                                  <>
                                    {users
                                      .filter(
                                        (item1) =>
                                          !task.users_task.some(
                                            (item2) =>
                                              item2.user[0].id === item1.id,
                                          ),
                                      )
                                      .map((user) => (
                                        <>
                                          {user.profile_img == null ? (
                                            <li>
                                              <Link
                                                href={`/user/my-team/${user.id}`}
                                              >
                                                <img
                                                  style={{
                                                    borderRadius: '50%',
                                                    width: '35px',
                                                    height: '35px',
                                                  }}
                                                  src="/images/user1.png"
                                                />
                                              </Link>
                                            </li>
                                          ) : (
                                            <li>
                                              <Link
                                                href={`/user/my-team/${user.id}`}
                                              >
                                                <img
                                                  style={{
                                                    borderRadius: '50%',
                                                    width: '35px',
                                                    height: '35px',
                                                  }}
                                                  src={`https://tinderu.youthbeat.in/uploads/profile_pic/${user.profile_img}`}
                                                />
                                              </Link>
                                            </li>
                                          )}
                                        </>
                                      ))}
                                  </>
                                ) : (
                                  'No one!'
                                )}
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="taskupldas goldcs">
                    <Link href={`/task/received/${task.id}`}>
                      <a
                        data-toggle="collapse"
                        class="themesub"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Review the tasks
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <FooterDashboard />
    </>
  )
}

export default Received