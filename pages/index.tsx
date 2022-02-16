import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { TimePicker } from 'antd';
import moment, { Moment } from 'moment'


const Home: NextPage = () => {

  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState<any>()
  const [paceMin, setPaceMin] = useState(0)
  const [paceS, setPaceS] = useState(0)

  const onTimeChange = (time: any) => {
    setTime(time)
    calculatePace(time, distance)
  }

  const onDistanceChange = (distance: number) => {
    setDistance(distance)
    calculatePace(time, distance)
  }

  const calculatePace = (time: Moment, distance: number) => {
    let now = moment().startOf('day')
    let duration
    if (time){
      duration = time.diff(now, 'seconds')
      let skm = duration / distance
      const minkm = Math.floor(skm/60)
      const s = Math.floor(skm % 60)
      console.log(minkm + s);
      
      setPaceMin(minkm)
      setPaceS(s)

    }
  }

  return (
    <div className="min-h-screen bg-orange-500 flex flex-col justify-center">
      <h1 className="text-4xl text-orange-900">
        How fast are you?
      </h1>
      <div className="py-10 mx-20 flex flex-col items-center justify-center gap-6">

        <div className="w-full flex flex-col items-center">
          <label className="text-lg mb-2" htmlFor="distance">How far did you run? (km)</label>
          <input name="distance" type="number" className="w-1/2 h-10 rounded-md px-10 text-lg" onChange={(e) => { onDistanceChange(+e.target.value) }} />
        </div>

        <div className="w-full flex flex-col items-center">
          <label className="text-lg mb-2" htmlFor="time">How long did you take?</label>
          <TimePicker value={time} onChange={onTimeChange} showNow={false} size="large" />
        </div>

        <div className="flex flex-row flex-wrap">
          <div className="text-lg">
          Pace(min / km):
            {
              distance > 0 && time &&
              time ? " " + paceMin + "min " + paceS + "s" : ""
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
