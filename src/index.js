import React from 'react'
import ReactDOM from 'react-dom'
import { useSpring, a, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'
import Form from './Form'
const items = ['Learn about TFHE ','cancel']
const height = items.length * 60 + 80

function App() {
  const [{ y }, set] = useSpring(() => ({ y: height }))

  const open = ({ canceled }) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    set({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff })
  }
  const close = (velocity = 0) => {
    set({ y: height, immediate: false, config: { ...config.stiff, velocity } })
  }

  const bind = useDrag(
    ({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) cancel()

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) {
        my > height * 0.5 || vy > 0.5 ? close(vy) : open({ canceled })
      }
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else set({ y: my, immediate: true })
    },
    { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  )

  const display = y.to((py) => (py < height ? 'block' : 'none'))
  return (
    <>
      <a.div className="bg" onClick={() => close()}>
      <Form />
      </a.div>
      <div className="action-btn" onClick={open} />
      <a.div className="sheet" {...bind()} style={{ display, bottom: `calc(-100vh + ${height - 150}px)`, y }}>
        {/* {items.map((entry, i) => (
          <div key={entry} onClick={() => (i < items.length - 1 ? alert('clicked on ' + entry) : close())} children={entry} />
          
        ))} */}
          {items.map((entry, i) => (
             <div key={entry} onClick={() => 
              (
                i === 0 ?(
                 window.location.href = 'https://tfhe.github.io/tfhe/'
                ):close()
              )
            } 
            children={entry} 
          />
          ))}
      </a.div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
