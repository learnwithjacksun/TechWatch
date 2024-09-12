import { Link } from "react-router-dom"
import { leaderboard } from "../../../Constants/data"
import Heading from "../../Global/Heading"
import Layout from "../Layout"

const Leaderboard = () => {

    const sortedLeaderboard = leaderboard.sort((a, b) => b.counts - a.counts);

  return (
      <>
          <Layout>
              <div className="main my-8">
                  <Heading title="Leaderboard" subtitle="Show workings...no be cho cho cho 🙌" />

                  <div className="my-6 layout">
                      <ul className="flex flex-col gap-2">
                          {sortedLeaderboard.map((x, y) => (
                              <Link to="" key={y} className="flex items-center gap-4 border-line border hover:shadow-green-500/10 hover:shadow-xl duration-500 rounded-2xl bg-light p-2">
                                  <div className="h-12 w-12 overflow-hidden rounded-xl">
                                      <img src={x.image} alt="Avatar" className="w-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                      <h3 className="font-semibold font-sora text-sm">{x.name}</h3>
                                      <p className="text-xs font-semibold bg-secondary border-line border px-2 rounded-full text-sub inline-flex">{x.role}</p>
                                  </div>
                                  <div className="h-12 w-12 text-xl font-bold text-sub bg-secondary rounded-xl flex-center">
                                      <span>{x.counts}</span>
                                  </div>
                          </Link>
                          ))}
                      </ul>
                  </div>
              </div>


      </Layout>
      </>
  )
}

export default Leaderboard