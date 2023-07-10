interface ClickDirectiveBinding {
  _click_outside?: Event
  value?: (element: HTMLElement) => void
  [key: string]: any
}

declare global {
  interface HTMLElement {
    _click_outside?: EventListenerOrEventListenerObject
  }
}

interface ClickDirective {
  mounted: (element: HTMLElement, binding: ClickDirectiveBinding) => void
  beforeUnmount: (element: HTMLElement) => void
}

export const vClickOutside: ClickDirective = {
  mounted(element: HTMLElement, binding: ClickDirectiveBinding): void {
    const eventHandler: EventListenerOrEventListenerObject = (
      e: Event,
    ): void => {
      // 将 _click_outside 函数参数类型改为 Event
      const evt = e as MouseEvent // 根据实际需要进行类型断言
      if (element.contains(evt.target as Node)) {
        element.classList.add('active')
        return
      }
      if (binding.value && typeof binding.value === 'function') {
        binding.value(element)
      }
    }
    element._click_outside = eventHandler
    document.addEventListener('click', eventHandler) // 此处直接传入 eventHandler 即可，无需转换类型
  },
  beforeUnmount(element: HTMLElement): void {
    document.removeEventListener(
      'click',
      element._click_outside as EventListenerOrEventListenerObject,
    )
    delete element._click_outside
  },
}

export const onClickOutside = (element: HTMLElement): void => {
  element.classList.contains('active') && element.classList.remove('active')
}
