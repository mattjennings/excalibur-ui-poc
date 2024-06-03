import {
  Engine,
  GraphicsComponent,
  TransformComponent,
  Vector,
} from 'excalibur'
import { JSXElement } from 'solid-js'
import { render } from './jsx-runtime'
import { ViewElement } from './elements'
import { BaseElement } from './base-element'

export class UI extends BaseElement {
  private ui: () => JSXElement

  constructor(ui: () => JSXElement) {
    super()
    this.ui = ui
    this.htmlElement.setAttribute('data-ex-ui', '')
    this.addComponent(this.transform)
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine)
    this.layout = {
      position: 'absolute',
      width: '100%',
      height: '100%',
    }
    render(this.ui as any, this)

    this.htmlContainer.on('resize', () => {
      this._styleDirty = true
    })
  }

  get children(): ViewElement[] {
    return super.children as ViewElement[]
  }

  syncLayout(): void {
    if (this.parent && this.scene) {
      const transform = this.parent.get(TransformComponent)
      const graphics = this.parent.get(GraphicsComponent)

      if (transform) {
        const screenPos = this.scene.engine.worldToScreenCoordinates(
          transform.pos,
        )
        const anchor = graphics?.anchor || Vector.Zero
        const width = graphics.current?.width || 0
        const height = graphics.current?.height || 0

        this.layout.left = `${screenPos.x - anchor.x * width}px`
        this.layout.top = `${screenPos.y - anchor.y * height}px`
        this.layout.width = `${width}px`
        this.layout.height = `${height}px`
      }
    }
  }
}