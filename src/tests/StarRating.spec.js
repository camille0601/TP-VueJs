import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StarRating from '../../components/form/StarRating.vue'

describe('StarRating', () => {
  it('emits update:modelValue on click', async () => {
    const wrapper = mount(StarRating, { props: { modelValue: 3, max: 5 } })
    const buttons = wrapper.findAll('button.star')
    await buttons[4].trigger('click')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBe(5)
  })
})
