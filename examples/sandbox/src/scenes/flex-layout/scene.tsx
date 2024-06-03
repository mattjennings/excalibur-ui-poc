import { UI, useValue } from 'excalibur-ui'
import { Engine } from 'excalibur'
import { For, createEffect } from 'solid-js'
import { images } from '../../resources'

export default class Level1 extends ex.Scene {
  time = 0

  onInitialize() {
    const width = useValue(() => {
      return 400 + Math.sin(this.time) * 300
      // if (Math.sin(this.time) > 0.5) {
      //   return 400
      // }
      // return 200
    })

    this.add(
      new UI(() => (
        <ex-view
          layout={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '20px',
            height: '100%',
            width: width() + 'px',
          }}
        >
          <ex-rectangle
            color="#ff000044"
            layout={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
          <For each={Array.from({ length: 35 })}>
            {() => <ex-graphic graphic={images.sword.toSprite()} />}
          </For>
        </ex-view>
      )),
    )
  }

  onPreUpdate(engine: Engine<any>, delta: number): void {
    this.time += delta / 1000
  }
}
