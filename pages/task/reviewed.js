import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context'
import axios from 'axios'
import FooterDashboard from '../../components/footer/footer-dashboard'
import Nav from '../../components/Nav'
import Link from 'next/link'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { useRouter } from "next/router";

const Reviewed = () => {
  const [state, setState] = useContext(UserContext)
  const [tasks, setTasks] = useState([])
  const [revData, setRevData] = useState([])
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
      setTasks(data.tasks)
    } catch (err) {
      console.log(err)
    }
  }

  const rev_data = (tsk) => {
    setRevData(tsk)
  }

  return (
    <>
    
      <Nav />

      <div>
        <section className="taskars">
          <div className="container">
            <div className="infotasks">
              <div className="lnkstsks recrevds">
                <ul>
                  <li>
                    <Link href="received">
                      <a>Received</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="reviewed">
                      <a className="active">Reviewed</a>
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
                          Created at:{' '}
                          {moment(task.created_at).format('MMM, Do YY')}
                        </p>
                        <p className="cominfonotf">
                          {renderHTML(task.task_desc)}
                        </p>
                        <div className="resultachd">
                          <p
                            onClick={() => rev_data(task)}
                            className="statustskd"
                            data-toggle="modal"
                            data-target="#exampleModalCenter19"
                          >
                            <span>Approved:</span>{' '}
                            <span className="inrevs okgo">
                              {task.accepted_count.length}
                            </span>
                          </p>
                          <p
                            onClick={() => rev_data(task)}
                            className="statustskd"
                            data-toggle="modal"
                            data-target="#exampleModalCenter19"
                          >
                            <span>Rejected:</span>{' '}
                            <span className="inrevs rejrd">
                              {task.rejected_count.length}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <div
          className="modal fade"
          id="exampleModalCenter19"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered reviewtabels"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="reviewdtanaly">
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Rep</th>
                        <th scope="col">Review</th>
                        <th scope="col">Points/Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revData && revData.users_task == 0 && (
                        <p style={{ color: 'red' }}>No Request found!</p>
                      )}

                      {Object.keys(revData).length != 0 &&
                        revData.users_task.map((u_task) => (
                          <tr>
                            <td>
                              <div className="profdata">
                                <div className="thmdpr">
                                  {u_task.user[0].profile_img == null ? (
                                    <Link
                                      href={`/user/my-team/${u_task.user[0].id}`}
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
                                  ) : (
                                    <Link
                                      href={`/user/my-team/${u_task.user[0].id}`}
                                    >
                                      <img
                                        style={{
                                          borderRadius: '50%',
                                          width: '35px',
                                          height: '35px',
                                        }}
                                        src={`https://tinderu.youthbeat.in/uploads/profile_pic/${u_task.user[0].profile_img}`}
                                      />
                                    </Link>
                                  )}
                                </div>
                                <div className="prodls">
                                  <p>{u_task.user[0].name}</p>
                                </div>
                              </div>
                              <div class="ptac">
                                <p class="">{u_task.comments} </p>
                              </div>
                            </td>
                            <td>
                              <p className="statustskd">
                                {u_task.task_status == 1 ? (
                                  <span className="inrevs okgo">Approved</span>
                                ) : (
                                  <span className="inrevs rjcno">Rejected</span>
                                )}
                              </p>
                            </td>
                            <td>
                              <div className="ptac">
                                <p className>
                                  {u_task.points == null ? 0 : u_task.points}
                                </p>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterDashboard />
    </>
  )
}

export default Reviewed
