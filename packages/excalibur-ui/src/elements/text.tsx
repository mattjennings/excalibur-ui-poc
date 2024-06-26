import { createExElement } from '.'
import { GraphicElement, GraphicProps } from './graphic'

import {
  Color,
  SpriteFont,
  FontOptions,
  GraphicOptions,
  RasterOptions,
  Text,
  Font,
} from 'excalibur'

export default createExElement({
  init() {
    return new TextElement()
  },
  applyProp(instance, prop, value) {
    switch (prop) {
      default:
        // @ts-ignore
        instance[prop] = value
    }
  },
})

export interface TextProps<T extends TextElement = TextElement>
  extends Omit<GraphicProps<T>, 'graphic'> {
  text?: string
  color?: Color | string
  font?: Font | SpriteFont | (FontOptions & GraphicOptions & RasterOptions)
  maxWidth?: number
  width?: never
  height?: never
}

export class TextElement extends GraphicElement {
  constructor() {
    super()
    this.graphic = new Text({
      text: '',
    })
  }

  get graphic(): Text {
    return super.graphic as Text
  }

  set graphic(value: Text) {
    super.graphic = value
  }

  get color(): Color | undefined {
    return this.graphic?.color
  }

  set color(value: TextProps['color']) {
    if (value) {
      this.graphic.color =
        typeof value === 'string' ? Color.fromHex(value as string) : value
    }
  }

  get text(): string {
    return this.graphic.text
  }

  set text(value: TextProps['text']) {
    this.graphic.text = value ?? ''
  }

  get font() {
    return this.graphic.font
  }

  set font(value: TextProps['font']) {
    if (value instanceof Font || value instanceof SpriteFont) {
      this.graphic.font = value
    } else if (value) {
      this.graphic.font = new Font(value)

      if ('color' in value) {
        this.color = value.color
      }
    }
  }

  get maxWidth() {
    return this.graphic.maxWidth
  }

  set maxWidth(value: TextProps['maxWidth']) {
    this.graphic.maxWidth = value
  }
}
