import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import DnaDashboardBox from '@/components/DnaDashboardBox.vue'

describe('NumberBox', () => {
  it('renders correctly with provided props', () => {
    const wrapper = mount(DnaDashboardBox, {
      props: {
        label: 'Label',
        number: 123
      }
    })
    expect(wrapper.html()).toBeTruthy
  })

  it('renders correctly without currency sign', () => {
    const wrapper = mount(DnaDashboardBox, {
      props: {
        label: 'Label',
        number: 123
      }
    })
    expect(wrapper.text()).toContain('123 Label')
  })

  it('renders correctly with currency sign', () => {
    const wrapper = mount(DnaDashboardBox, {
      props: {
        currencySign: '$',
        label: 'Label',
        number: 123
      }
    })
    expect(wrapper.text()).toContain('123$ Label')
  })
})
